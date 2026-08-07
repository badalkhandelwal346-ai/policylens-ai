import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import policies from "@/data/policies.json";
import alertsData from "@/data/alerts.json";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-3.6-flash";

function buildPolicyLensContext() {
  const policySummaries = [
    ...policies.urgentPolicies.map((policy) => ({
      id: policy.id,
      title: policy.title,
      description: policy.description,
      status: policy.status,
      category: policy.category,
      source: policy.source,
      eligibility: policy.eligibility,
      benefits: policy.benefits,
      deadline: policy.deadline,
      readTime: policy.readTime,
      badge: policy.badge,
    })),
    ...policies.recommendedPolicies.map((policy) => ({
      id: policy.id,
      title: policy.title,
      description: policy.description,
      status: policy.status,
      category: policy.category,
      source: policy.source,
      eligibility: policy.eligibility,
      benefits: policy.benefits,
      deadline: policy.deadline,
      readTime: policy.readTime,
      badge: policy.badge,
      showExplore: policy.showExplore,
    })),
  ];

  const alerts = alertsData.alerts.map((alert) => ({
    id: alert.id,
    title: alert.title,
    priority: alert.priority,
    deadline: alert.deadline,
    category: alert.category,
    aiConfidence: alert.aiConfidence,
  }));

  const upcomingDeadlines = alertsData.upcomingDeadlines.map((deadline) => ({
    month: deadline.month,
    day: deadline.day,
    title: deadline.title,
    subtitle: deadline.subtitle,
  }));

  return `PolicyLens data:

Policies:
${JSON.stringify(policySummaries, null, 2)}

Alerts:
${JSON.stringify(alerts, null, 2)}

Upcoming deadlines:
${JSON.stringify(upcomingDeadlines, null, 2)}
`;
}

const SYSTEM_INSTRUCTION = `You are the PolicyLens AI assistant.
Use the supplied PolicyLens data when the question relates to it.
Do not invent policy names, deadlines, benefits, or eligibility requirements.
If the supplied data does not contain the answer, clearly say that the available PolicyLens data does not provide enough information.
Give simple, understandable answers.
Do not claim to have accessed live government websites unless the application actually does so.`;

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const message =
    typeof body === "object" && body !== null && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [
        {
          role: "MODEL",
          parts: [
            {
              text: `${SYSTEM_INSTRUCTION}

${buildPolicyLensContext()}`,
            },
          ],
        },
        {
          role: "USER",
          parts: [{ text: message.trim() }],
        },
      ],
      config: {
        maxOutputTokens: 512,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "Gemini did not return a reply." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const err = error as
      | { status?: number; error?: unknown; message?: string }
      | undefined;

    const apiError = typeof err === "object" && err !== null ? err.error : undefined;
    const statusCode =
      typeof err?.status === "number"
        ? err.status
        : typeof apiError === "object" && apiError !== null && "code" in apiError && typeof (apiError as any).code === "number"
        ? (apiError as any).code
        : undefined;
    const apiStatus =
      typeof apiError === "object" && apiError !== null && "status" in apiError && typeof (apiError as any).status === "string"
        ? (apiError as any).status
        : undefined;

    if (statusCode === 429 || apiStatus === "RESOURCE_EXHAUSTED") {
      return NextResponse.json(
        {
          error:
            "AI assistant is temporarily unavailable because the AI service quota has been reached. Please try again later.",
        },
        { status: 429 },
      );
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Gemini request failed: ${message}` },
      { status: 500 },
    );
  }
}
