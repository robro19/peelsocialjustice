import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import canadaDay from "@/assets/canada-day-volunteers.png.asset.json";

const DESC =
  "Peel Social Justice is a youth-led club in Mississauga exploring social justice issues and building leaders through discussion, advocacy, and community action.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "About Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About us"
        title="A youth-led club for real community change in Peel."
        lead="Peel Social Justice is a student-led initiative created so young people have a space to explore social justice issues, have meaningful discussions, and work on community projects that create real change."
      />
      <section className="container-page grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="text-3xl md:text-4xl">Our story</h2>
          <div className="mt-6 space-y-5 text-muted-foreground">
            <p>
              We started Peel Social Justice because we noticed that a lot of the biggest
              conversations happening in our community were happening without young people at
              the table. We wanted to change that.
            </p>
            <p>
              Today, we meet regularly during the school year to discuss local and global
              social justice issues, plan outreach, and organize community-focused
              initiatives. Every member gets a chance to lead, speak, and shape what we do
              next.
            </p>
            <p>
              This year, we're focused on awareness campaigns, partnerships with local
              organizations, and hands-on activities that help members build leadership,
              public speaking, and advocacy skills.
            </p>
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={canadaDay.url}
              alt="Peel Social Justice volunteers at the Streetsville BIA Canada Day event"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </aside>
      </section>

      <section className="border-y border-border bg-muted/50">
        <div className="container-page grid gap-10 py-20 md:grid-cols-3">
          {[
            { t: "Mission", b: "Empower youth to understand social issues, develop their voices, and take action." },
            { t: "Values", b: "Equity, inclusion, leadership, service, and honest conversation." },
            { t: "Community", b: "Rooted in Mississauga and the wider Peel Region — Brampton, Caledon, and beyond." },
          ].map((v) => (
            <div key={v.t}>
              <h3 className="text-2xl">{v.t}</h3>
              <p className="mt-3 text-muted-foreground">{v.b}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
