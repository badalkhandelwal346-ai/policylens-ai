# PolicyLens AI

### AI-powered government policy intelligence for small businesses, farmers, and startups.

PolicyLens AI is a policy-intelligence prototype designed to simplify complex government policies, compliance requirements, deadlines, and alerts.

The platform combines a personalized business profile, policy dashboard, centralized policy data, alerts, upcoming deadlines, and an AI assistant powered by Google Gemini.

> **Note:** PolicyLens AI is a hackathon/demo prototype. The policy and alert records are centralized demo data and are not a live government-policy feed.

---

## 🚀 Features

- **Personalized Business Profile**  
  Enter business name, business type, industry, state, language, business size, and notification preferences.

- **Policy Dashboard**  
  View urgent policies, recommended policies, recent policy information, and relevant policy details.

- **AI Policy Assistant**  
  Ask policy-related questions and receive responses powered by Google Gemini using PolicyLens context.

- **Alerts & Deadlines**  
  Track important policy alerts and upcoming deadlines.

- **Policy Search & Navigation**  
  Explore policies and quickly find relevant information through the dashboard.

- **Browser Persistence**  
  Business profile information is stored using browser `localStorage`.

- **English & Hindi Preferences**  
  The prototype supports English and Hindi language preferences.

---

## 🧠 How It Works

```text
User
 │
 ▼
Business Profile
 │
 ▼
Browser localStorage
 │
 ▼
PolicyLens Dashboard
 ├── Policies
 ├── Alerts
 └── Upcoming Deadlines
 │
 ▼
AI Assistant
 │
 ▼
Next.js /api/chat
 │
 ▼
Google Gemini
