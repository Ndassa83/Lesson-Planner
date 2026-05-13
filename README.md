# Lesson Plan Playground

An AI-powered lesson plan generator built with React, TypeScript, and Google Gemini. Teachers describe what they want to teach, and the app produces a fully structured, editable lesson plan that can be exported as a PDF.

---

## How It Works

The app is a three-step flow: **Generate → Edit → Export**.

### 1. Generate
The user fills out a short form:
- Lesson title
- Age range / grade level
- Subject details
- Assessment or assignment type
- Lesson length (in minutes)
- Any additional notes

On submit, the app constructs a detailed prompt and sends it to **Google Gemini 1.5 Flash** via the `@google/generative-ai` SDK. The model is instructed to return a strictly-typed JSON object — not prose — matching the following schema:

```ts
type LessonPlanType = {
  lessonTitle: string;
  summary: string;
  intro: string;
  objectives: string[];
  materialsNeeded: string[];
  instructionalSteps: string[];
  conclusion: string;
  assessmentMethods: string;
};
```

The prompt enforces formatting rules directly: instructional steps must include time estimates (e.g. `(20 min)`), objectives must not repeat the boilerplate "Students will be able to", and the response must be valid JSON with `responseMimeType: "application/json"`. This is prompt engineering treated as a first-class concern — the model's output is designed to be machine-readable and immediately renderable in the UI.

### 2. Edit
The generated lesson plan is dropped into a fully editable React view. Every field is a live text input. Dynamic list sections (objectives, materials, instructional steps) support adding and removing individual items inline. The teacher retains full editorial control over what the model produced.

### 3. Export
The finalized plan is rendered with `@react-pdf/renderer` into a formatted PDF document, previewed in-browser via a `PDFViewer` and downloaded on demand.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| UI components | MUI (Material UI) |
| AI / LLM | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| Routing | React Router v7 |
| PDF export | `@react-pdf/renderer` |

---

## LLM Integration Details

The core of the AI integration lives in [src/Components/StartPage.tsx](src/Components/StartPage.tsx):

- **Model**: `gemini-1.5-flash` — chosen for speed and cost-efficiency on a structured generation task
- **Output format**: `responseMimeType: "application/json"` forces the model into constrained JSON output mode, making the response directly parseable without post-processing heuristics
- **Prompt design**: The prompt explicitly defines the output schema, field-level formatting rules, and edge cases (e.g., assessmentMethods may be empty). This structured prompting approach minimizes the need for client-side parsing logic and makes the model's behavior predictable across varied inputs
- **State management**: The parsed JSON is lifted to top-level App state and propagated to the edit and export views via props, keeping the LLM call isolated to the generation step

---

## Setup

```bash
npm install
```

Create a `.env` file at the project root:

```
VITE_API_KEY=your_google_gemini_api_key
```

```bash
npm run dev
```
