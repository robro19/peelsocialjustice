export const EXEC_ROLES = [
  "Secretary",
  "Treasurer",
  "Outreach Director",
  "Fundraising Chair",
  "Advocacy Chair",
] as const;

export type ExecRole = (typeof EXEC_ROLES)[number];

export const ROLE_QUESTIONS: Record<string, string> = {
  Secretary:
    "How do you ensure accuracy and organization when managing important documents or information?",
  Treasurer:
    "Describe your experience managing money, budgets, or records, and how you would keep our finances transparent.",
  "Outreach Director":
    "Provide an example of a successful communication campaign or project you have created or managed.",
  "Fundraising Chair":
    "Describe a fundraising effort you led or contributed to and the impact it had on the organization's goals.",
  "Advocacy Chair":
    "What social justice issue in the Peel region are you most passionate about, and how would you advocate for change?",
};

export const GENERAL_QUESTIONS = [
  "What motivates you to strive for social justice, particularly in the Peel region?",
  "Describe a time you collaborated effectively with a team to achieve a common goal. What role did you play?",
  "How do you handle conflicts or disagreements within a group or organization?",
  "What skills or experiences do you bring that will help Peel Social Justice succeed?",
] as const;

export const WORD_LIMIT = 100;

export const DEADLINE = "August 26th at 11:59 PM";

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

export type ApplicationDraft = {
  full_name: string;
  contact_email: string;
  phone_number: string;
  role: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  role_answer: string;
};

export const EMPTY_DRAFT: ApplicationDraft = {
  full_name: "",
  contact_email: "",
  phone_number: "",
  role: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  role_answer: "",
};

export const STORAGE_KEY = "psj-exec-application-draft-v1";

export const SUBMISSION_EMAIL = "peelsocialjustice@gmail.com";

export function buildSubmissionEmail(draft: ApplicationDraft): string {
  const lines = [
    `Full name: ${draft.full_name}`,
    `Contact email: ${draft.contact_email}`,
    `Phone number: ${draft.phone_number}`,
    `Role applying for: ${draft.role}`,
    "",
    ...GENERAL_QUESTIONS.flatMap((question, i) => [
      `${i + 1}. ${question}`,
      [draft.q1, draft.q2, draft.q3, draft.q4][i] ?? "",
      "",
    ]),
    `Role-specific question: ${draft.role ? (ROLE_QUESTIONS[draft.role] ?? "") : ""}`,
    draft.role_answer,
  ];
  const subject = `Executive Application — ${draft.role || "Peel Social Justice"} — ${draft.full_name}`;
  return `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
