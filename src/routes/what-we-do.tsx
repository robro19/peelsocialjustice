import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { BookOpen, Mic, HandHeart, Megaphone, Handshake, Coins, Scale } from "lucide-react";

const DESC =
  "How Peel Social Justice takes action — education, public speaking, volunteering, awareness campaigns, partnerships, fundraising, and local advocacy.";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "What We Do — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "What We Do — Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: WhatWeDo,
});

const items = [
  { icon: BookOpen, title: "Education & discussion", body: "Meetings dedicated to unpacking social justice issues affecting Peel Region and beyond." },
  { icon: Mic, title: "Public speaking & leadership", body: "A safe space to practice speaking, run meetings, and lead campaigns." },
  { icon: HandHeart, title: "Volunteer opportunities", body: "Food drives, donation sorting, event setup, and community volunteering." },
  { icon: Megaphone, title: "Awareness campaigns", body: "Social media, in-school, and community campaigns on equity and inclusion." },
  { icon: Handshake, title: "Community partnerships", body: "Working with Mississauga BIAs, nonprofits, and community leaders." },
  { icon: Coins, title: "Fundraising & donation drives", body: "Raising money and goods to support local causes across Peel." },
  { icon: Scale, title: "Local advocacy projects", body: "Long-form projects on issues like food insecurity, equity, and youth engagement." },
];

function WhatWeDo() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="What we do"
        title="Discussion, service, and advocacy"
        lead="We combine honest conversation with real action. Every project we take on comes from something a member cared enough to raise in a meeting."
      />
      <section className="container-page py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
