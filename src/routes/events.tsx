import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import canadaDay from "@/assets/canada-day.jpg";
import volunteer from "@/assets/volunteer.jpg";
import discussion from "@/assets/discussion.jpg";

const DESC =
  "Upcoming and past events from Peel Social Justice — donation drives, community partnerships, awareness events, and volunteer opportunities across Peel Region.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Events — Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Events,
});

const upcoming = [
  { date: "TBA", title: "Fall Kickoff Meeting", body: "Meet the exec team, hear this year's plans, and share the issues you care about." },
  { date: "TBA", title: "Food Insecurity Awareness Week", body: "A week of school and community programming plus a donation drive." },
  { date: "TBA", title: "Community Partner Volunteer Day", body: "Volunteer alongside a Mississauga nonprofit — hours provided." },
];

const past = [
  {
    img: canadaDay,
    title: "Streetsville BIA Canada Day — World Map",
    body:
      "We ran the World Map sticker station and had meaningful conversations with the public about social justice, inclusion, and community in Mississauga.",
  },
  {
    img: volunteer,
    title: "Community Donation Drive",
    body: "Sorted and packed donations with volunteers across the region to support families in Peel.",
  },
  {
    img: discussion,
    title: "Open Discussion Circle",
    body: "A member-led conversation on the issues most affecting youth in Peel today.",
  },
];

function Events() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Events"
        title="Where we meet, gather, and take action."
        lead="From donation drives to community partnerships and awareness campaigns — here's what's coming up and what we've already done together."
      />

      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl">Upcoming</h2>
          <span className="text-sm text-muted-foreground">More announced soon</span>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {upcoming.map((e) => (
            <div key={e.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-secondary">
                {e.date}
              </div>
              <h3 className="mt-3 text-xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <h2 className="text-3xl md:text-4xl">Recent</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {past.map((e) => (
            <article key={e.title} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
