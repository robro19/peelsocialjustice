import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Mail } from "lucide-react";

const DESC =
  "Peel Social Justice partners with Mississauga BIAs, nonprofits, and community leaders on food insecurity, equity, and youth engagement.";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Community Partners" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Partners,
});

const partners = [
  { name: "Ward Councillor Brad Butt", body: "Helped connect us with the Streetsville BIA and has been a supportive local voice for our work in Mississauga." },
  { name: "Streetsville BIA", body: "Worked at their Canada Day event running the World Map station and community conversations." },
  { name: "Food4Kids Mississauga", body: "Sorted and packed donations together to help feed kids and families across Peel." },
  { name: "Local food banks", body: "Donation drives and volunteer sorting days supporting families in Peel." },
  { name: "Mississauga schools", body: "In-school awareness campaigns, discussion circles, and recruitment." },
  { name: "Community leaders", body: "Guest speakers, mentors, and advisors on issues affecting Peel Region." },
];

function Partners() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Collaborations"
        title="We build with our community, not just for it."
        lead="We work with local Mississauga organizations and community leaders on food insecurity, youth engagement, equity, and social justice."
      />
      <section className="container-page py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/10 p-8 md:p-12">
          <span className="eyebrow">Partner with us</span>
          <h2 className="mt-3 text-3xl md:text-4xl">Are you an organization in Peel?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We'd love to hear from nonprofits, BIAs, schools, and community groups looking to
            work with motivated youth. From joint events to volunteer support, we're open to
            collaborating on projects that make a real difference.
          </p>
          <a
            href="mailto:peelsocialjustice@gmail.com"
            className="btn-primary btn-primary-hover mt-6"
          >
            <Mail className="h-4 w-4" /> peelsocialjustice@gmail.com
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
