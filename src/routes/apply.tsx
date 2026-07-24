import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { useState } from "react";

const DESC =
  "Apply to join Peel Social Justice as a general member or executive. Youth-led, community-focused, and welcoming to new voices.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply / Join — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Apply / Join — Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Apply,
});

const openRoles = [
  "Vice President",
  "Secretary",
  "Treasurer",
  "Communications Director",
  "Volunteer Coordinator",
  "Fundraising Chair",
  "Advocacy Chair",
  "Events Coordinator",
];

function Apply() {
  const [type, setType] = useState<"member" | "exec">("member");
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Apply / Join"
        title="Come build with us."
        lead="Whether you want to attend meetings, volunteer, or take on a leadership role — start here. It only takes a few minutes."
      />
      <section className="container-page grid gap-10 py-20 md:grid-cols-12">
        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg">What to expect</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>· Regular meetings during the school year.</li>
              <li>· Volunteer hours through drives, events, and partnerships.</li>
              <li>· Public speaking, event planning, and advocacy practice.</li>
              <li>· A welcoming space to raise the issues you care about.</li>
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-primary p-6 text-primary-foreground">
            <h3 className="font-display text-lg">Open executive roles</h3>
            <ul className="mt-3 space-y-1 text-sm text-primary-foreground/85">
              {openRoles.map((r) => (
                <li key={r}>· {r}</li>
              ))}
            </ul>
          </div>
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-border bg-card p-6 md:col-span-8 md:p-8"
        >
          {sent ? (
            <div className="py-16 text-center">
              <h3 className="text-3xl">Application received.</h3>
              <p className="mt-3 text-muted-foreground">
                Thanks for applying to Peel Social Justice. We'll be in touch with next steps
                by email.
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 rounded-full border border-border bg-background p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setType("member")}
                  className={
                    "flex-1 rounded-full px-4 py-2 transition-colors " +
                    (type === "member" ? "bg-primary text-primary-foreground" : "text-muted-foreground")
                  }
                >
                  General member
                </button>
                <button
                  type="button"
                  onClick={() => setType("exec")}
                  className={
                    "flex-1 rounded-full px-4 py-2 transition-colors " +
                    (type === "exec" ? "bg-primary text-primary-foreground" : "text-muted-foreground")
                  }
                >
                  Executive
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="School / Grade or Year" name="school" />
                <Field label="Phone (optional)" name="phone" required={false} />
              </div>

              {type === "exec" && (
                <div className="mt-4">
                  <Label>Role you're applying for</Label>
                  <select
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select a role</option>
                    {openRoles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-4">
                <Label>
                  {type === "exec"
                    ? "Why this role, and what would you bring to it?"
                    : "Why do you want to join Peel Social Justice?"}
                </Label>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              {type === "exec" && (
                <div className="mt-4">
                  <Label>Relevant experience</Label>
                  <textarea
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              )}

              <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I agree with the mission and values of Peel Social Justice and can commit to
                  showing up for meetings and events.
                </span>
              </label>

              <button type="submit" className="btn-primary btn-primary-hover mt-6 w-full">
                Submit application
              </button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
