import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  WORD_LIMIT,
  countWords,
  type ApplicationDraft,
} from "@/lib/exec-application";
import { getMyApplication, saveMyApplication } from "@/lib/exec-application.functions";

const description =
  "Complete and save your Peel Social Justice executive member application. Progress is stored to your account so you can return any time before the deadline.";

export const Route = createFileRoute("/_authenticated/executive-application")({
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
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="container-page py-20">
        <h1 className="text-2xl">We couldn't load your application</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </section>
    </SiteLayout>
  ),
});

const GENERAL_KEYS = ["q1", "q2", "q3", "q4"] as const;

function ExecutiveApplication() {
  const navigate = useNavigate();
  const load = useServerFn(getMyApplication);
  const save = useServerFn(saveMyApplication);

  const [draft, setDraft] = useState<ApplicationDraft>(EMPTY_DRAFT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    let active = true;
    load()
      .then((res) => {
        if (!active) return;
        setDraft(res.draft);
        setSubmitted(res.submitted);
        setLastSaved(res.updatedAt);
      })
      .catch((err: unknown) =>
        setMessage(err instanceof Error ? err.message : "Could not load your application."),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [load]);

  const persist = useCallback(
    async (submit: boolean) => {
      setSaving(true);
      setMessage(null);
      try {
        const res = await save({ data: { draft, submit } });
        dirty.current = false;
        setSubmitted(res.submitted);
        setLastSaved(res.updatedAt);
        setMessage(submit ? "Application submitted. Thank you!" : "Progress saved.");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Could not save. Try again.");
      } finally {
        setSaving(false);
      }
    },
    [draft, save],
  );

  // Autosave a few seconds after the applicant stops typing.
  useEffect(() => {
    if (loading || !dirty.current) return;
    const timer = setTimeout(() => void persist(false), 2500);
    return () => clearTimeout(timer);
  }, [draft, loading, persist]);

  const update = (key: keyof ApplicationDraft, value: string) => {
    dirty.current = true;
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const roleQuestion = useMemo(
    () => (draft.role ? ROLE_QUESTIONS[draft.role] : null),
    [draft.role],
  );

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

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Executive Applications"
        title="Executive Member Application"
        lead={`Answer each question thoughtfully. Your progress saves automatically to your account, so you can return any time before the deadline on ${DEADLINE}.`}
      />

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              {loading
                ? "Loading your application…"
                : submitted
                  ? "Submitted — you can still update and resubmit before the deadline."
                  : lastSaved
                    ? `Last saved ${new Date(lastSaved).toLocaleString()}`
                    : "Nothing saved yet"}
            </span>
            <button onClick={signOut} className="text-muted-foreground hover:text-primary">
              Sign out
            </button>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : (
            <>
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
                <p className="mt-1 text-sm text-muted-foreground">
                  {WORD_LIMIT} words max each.
                </p>
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
                  <Button variant="outline" onClick={() => void persist(false)} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving…" : "Save progress"}
                  </Button>
                  <Button
                    onClick={() => void persist(true)}
                    disabled={saving || missing.length > 0}
                  >
                    {submitted ? "Resubmit application" : "Submit application"}
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Deadline: {DEADLINE}. Questions? Email peelsocialjustice@gmail.com.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
