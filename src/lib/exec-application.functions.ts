import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { EMPTY_DRAFT, type ApplicationDraft } from "./exec-application";

function sanitize(input: unknown): ApplicationDraft {
  const raw = (input ?? {}) as Record<string, unknown>;
  const clean = (key: keyof ApplicationDraft, max: number) => {
    const value = typeof raw[key] === "string" ? (raw[key] as string) : "";
    return value.slice(0, max);
  };
  return {
    full_name: clean("full_name", 120),
    contact_email: clean("contact_email", 255),
    phone_number: clean("phone_number", 40),
    role: clean("role", 60),
    q1: clean("q1", 4000),
    q2: clean("q2", 4000),
    q3: clean("q3", 4000),
    q4: clean("q4", 4000),
    role_answer: clean("role_answer", 4000),
  };
}

export const getMyApplication = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("executive_applications")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();

    if (error) throw new Error(error.message);

    return {
      draft: data ? ({ ...EMPTY_DRAFT, ...data } as ApplicationDraft) : EMPTY_DRAFT,
      submitted: data?.submitted ?? false,
      submittedAt: data?.submitted_at ?? null,
      updatedAt: data?.updated_at ?? null,
    };
  });

export const saveMyApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { draft: ApplicationDraft; submit?: boolean }) => ({
    draft: sanitize(input?.draft),
    submit: input?.submit === true,
  }))
  .handler(async ({ data, context }) => {
    const row = {
      user_id: context.userId,
      ...data.draft,
      ...(data.submit ? { submitted: true, submitted_at: new Date().toISOString() } : {}),
    };

    const { data: saved, error } = await context.supabase
      .from("executive_applications")
      .upsert(row, { onConflict: "user_id" })
      .select("submitted, submitted_at, updated_at")
      .single();

    if (error) throw new Error(error.message);

    return {
      submitted: saved.submitted,
      submittedAt: saved.submitted_at,
      updatedAt: saved.updated_at,
    };
  });
