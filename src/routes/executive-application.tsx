import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Mail, Save, Trash2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEADLINE,
  EMPTY_DRAFT,
  EXEC_ROLES,
  GENERAL_QUESTIONS,
  ROLE_QUESTIONS,
  STORAGE_KEY,
  WORD_LIMIT,
  buildSubmissionEmail,
  countWords,
  type ApplicationDraft,
} from "@/lib/exec-application";

const description =
  "Complete your Peel Social Justice executive member application. Your progress is saved in your browser so you can return any time before the deadline.";

export const Route = createFileRoute("/executive-application")({
  head: () => ({
    meta: [
      { title: "Executive Application Portal — Peel Social Justice" },
      { name: "description", content: description },
      { property: "og:title", content: "Executive Application Portal — Peel Social Justice" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExecutiveApplication,
});

const GENERAL_KEYS = ["q1", "q2", "q3", "q4"] as const;

function ExecutiveApplication() {
  const [draft, setDraft] = useState<ApplicationDraft>(EMPTY_DRAFT);
  const [hydrated, setHydrated] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const dirty = useRef(false);

  // Load any saved progress from this browser.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { draft?: ApplicationDraft; savedAt?: string };
        if (parsed.draft) setDraft({ ...EMPTY_DRAFT, ...parsed.draft });
        setLastSaved(parsed.savedAt ?? null);
      }
    } catch {
      // ignore unreadable storage
    }
    setHydrated(true);
  }, []);

  function save(showMessage = true) {
    const savedAt = new Date().toISOString();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, savedAt }));
      dirty.current = false;
      setLastSaved(savedAt);
      if (showMessage) setMessage("Progress saved in this browser.");
    } catch {
      if (showMessage) setMessage("Your browser blocked local storage, so progress can't be saved.");
    }
  }

  // Autosave shortly after typing stops.
  useEffect(() => {
    if (!hydrated || !dirty.current) return;
    const timer = setTimeout(() => save(false), 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, hydrated]);

  const update = (key: keyof ApplicationDraft, value: string) => {
    dirty.current = true;
    setMessage(null);
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const roleQuestion = draft.role ? ROLE_QUESTIONS[draft.role] : null;

  const missing = useMemo(() => {
    const gaps: string[] = [];
    if (!draft.full_name.trim()) gaps.push("full name");
    if (!draft.contact_email.trim()) gaps.push("contact email");
    if (!draft.role) gaps.push("role");
    GENERAL_KEYS.forEach((key, i) => {
      if (!draft[key].trim()) gaps.push(`general question ${i + 1}`);
    });
    if (!draft.role_answer.trim()) gaps.push("role-specific answer");
    return gaps;
  }, [draft]);

  function submit() {
    save(false);
    window.location.href = buildSubmissionEmail(draft);
    setMessage("Your email app should open with your completed application ready to send.");
  }

  function clearProgress() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft(EMPTY_DRAFT);
    setLastSaved(null);
    setMessage("Saved progress cleared.");
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Executive Applications"
        title="Executive Member Application"
        lead={`Answer each question thoughtfully. Your progress saves automatically in this browser, so you can return any time before the deadline on ${DEADLINE}.`}
      />

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              {lastSaved
                ? `Last saved ${new Date(lastSaved).toLocaleString()}`
                : "Nothing saved yet"}
            </span>
            <button
              onClick={clearProgress}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear saved progress
            </button>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-xl">Applicant information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  value={draft.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  maxLength={120}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={draft.contact_email}
                  onChange={(e) => update("contact_email", e.target.value)}
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone number</Label>
                <Input
                  id="phone_number"
                  value={draft.phone_number}
                  onChange={(e) => update("phone_number", e.target.value)}
                  maxLength={40}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-xl">Role you are applying for</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {EXEC_ROLES.map((role) => (
                <label
                  key={role}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                    draft.role === role
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={draft.role === role}
                    onChange={() => update("role", role)}
                    className="accent-primary"
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-xl">General questions</h2>
            <p className="mt-1 text-sm text-muted-foreground">{WORD_LIMIT} words max each.</p>
            <div className="mt-5 space-y-6">
              {GENERAL_QUESTIONS.map((question, i) => {
                const key = GENERAL_KEYS[i];
                const words = countWords(draft[key]);
                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>
                      {i + 1}. {question}
                    </Label>
                    <Textarea
                      id={key}
                      rows={5}
                      value={draft[key]}
                      onChange={(e) => update(key, e.target.value)}
                    />
                    <p
                      className={`text-xs ${
                        words > WORD_LIMIT ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {words}/{WORD_LIMIT} words
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-xl">Role-specific question</h2>
            {roleQuestion ? (
              <div className="mt-4 space-y-2">
                <Label htmlFor="role_answer">{roleQuestion}</Label>
                <Textarea
                  id="role_answer"
                  rows={5}
                  value={draft.role_answer}
                  onChange={(e) => update("role_answer", e.target.value)}
                />
                <p
                  className={`text-xs ${
                    countWords(draft.role_answer) > WORD_LIMIT
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {countWords(draft.role_answer)}/{WORD_LIMIT} words
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Choose a role above to see its question.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/30 p-6">
            {message && (
              <p className="mb-4 flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {message}
              </p>
            )}
            {missing.length > 0 && (
              <p className="mb-4 text-sm text-muted-foreground">
                Still to complete: {missing.join(", ")}.
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => save(true)}>
                <Save className="mr-2 h-4 w-4" /> Save progress
              </Button>
              <Button onClick={submit} disabled={missing.length > 0}>
                <Mail className="mr-2 h-4 w-4" /> Submit by email
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Deadline: {DEADLINE}. Progress is stored only in this browser, so finish on the same
              device. Submitting opens your email app with your answers addressed to
              peelsocialjustice@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
