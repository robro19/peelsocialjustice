import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Mail, Instagram, MapPin } from "lucide-react";
import { useState } from "react";

const DESC =
  "Get in touch with Peel Social Justice — partnerships, events, membership, and questions from students, families, and community organizations.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Contact Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Say hello — we read everything."
        lead="Reach out about partnerships, upcoming events, or joining the club. We'll get back to you as soon as we can."
      />
      <section className="container-page grid gap-12 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Get in touch</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <a href="mailto:hello@peelsocialjustice.org" className="hover:text-primary">
                hello@peelsocialjustice.org
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Instagram className="h-4 w-4" />
              </span>
              <a href="https://instagram.com" className="hover:text-primary">
                @peelsocialjustice
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <MapPin className="h-4 w-4" />
              </span>
              Mississauga, Peel Region, Ontario
            </li>
          </ul>
          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
            <p>
              Are you an organization in Peel? Reach out about partnerships, volunteer days,
              or guest speaking. We're always open to new collaborations.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-border bg-card p-6 md:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <h3 className="text-2xl">Thanks — we got it.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll be in touch soon. In the meantime, feel free to follow us on Instagram.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <button type="submit" className="btn-primary btn-primary-hover w-full">
                Send message
              </button>
            </div>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
