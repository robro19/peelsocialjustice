import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";

const DESC =
  "Meet the executive roles at Peel Social Justice: President, VP, Secretary, Treasurer, Communications, Volunteer Coordinator, Fundraising, Advocacy, and Events.";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Executive Team — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Executive Team" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Team,
});

const roles = [
  { title: "President", body: "Leads the club, sets vision, runs meetings, and represents Peel Social Justice externally.", filled: true },
  { title: "Vice President", body: "Supports the President, steps in during their absence, and helps with leadership and decision-making." },
  { title: "Secretary", body: "Manages meeting minutes, organizational records, correspondence, and communication logistics." },
  { title: "Treasurer", body: "Oversees finances, budgeting, and financial reporting for the club." },
  { title: "Communications Director", body: "Handles public relations, social media, and outreach to raise awareness." },
  { title: "Volunteer Coordinator", body: "Organizes volunteer efforts, recruitment, scheduling, and engagement." },
  { title: "Fundraising Chair", body: "Plans and executes fundraising campaigns and events to support our goals." },
  { title: "Advocacy Chair", body: "Leads community engagement, issue advocacy, and partnership-building." },
  { title: "Events Coordinator", body: "Organizes meetings, community gatherings, and special events." },
];

function Team() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Executive team"
        title="The people behind Peel Social Justice."
        lead="Our executive team keeps the club running — from planning meetings to leading campaigns. Applications for open roles are currently welcome."
      />
      <section className="container-page py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <div key={r.title} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl">{r.title}</h3>
                <span
                  className={
                    r.filled
                      ? "rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                      : "rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-secondary"
                  }
                >
                  {r.filled ? "Filled" : "Open"}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-primary p-8 text-primary-foreground md:p-12">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-display text-3xl md:text-4xl">Executive applications are open.</h3>
              <p className="mt-3 max-w-xl text-primary-foreground/80">
                If you want to help shape the club and lead real projects in Peel, apply for
                one of the open roles. We'll follow up with next steps.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground hover:brightness-110"
              >
                Apply to lead <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
