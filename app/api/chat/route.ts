import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-3.6-flash";

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
      contents: message.trim(),
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
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Gemini request failed: ${message}` },
      { status: 500 },
    );
  }
}
