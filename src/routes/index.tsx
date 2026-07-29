import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Users, HandHeart, Megaphone, Handshake, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

const hero = "/food4kids.png";
const canadaDay = "/canada-day-volunteers.png";
const discussion = "/psj-logo.png";

const META_DESC =
  "Peel Social Justice is a youth-led club in Mississauga uniting Peel Region for change through discussion, advocacy, and community action.";
const OG_IMAGE = "https://peelsocialjustice.org/food4kids.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peel Social Justice — Empowering Youth. Inspiring Change." },
      { name: "description", content: META_DESC },
      { property: "og:title", content: "Peel Social Justice — Empowering Youth. Inspiring Change." },
      { property: "og:description", content: META_DESC },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: MessageCircle, title: "Discussion", body: "Open, honest conversations about issues shaping our community." },
  { icon: Megaphone, title: "Advocacy", body: "Speaking up on equity, inclusion, and local social justice issues." },
  { icon: HandHeart, title: "Volunteering", body: "Hands-on service with food drives, donation sorting, and events." },
  { icon: Users, title: "Leadership", body: "Public speaking, event planning, and civic engagement skills." },
  { icon: Handshake, title: "Partnerships", body: "Working with Mississauga organizations and community leaders." },
  { icon: Sparkles, title: "Awareness", body: "Campaigns that spotlight the realities of life in Peel Region." },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 pt-14 pb-16 md:grid-cols-12 md:gap-8 md:pt-20 md:pb-24">
          <div className="md:col-span-6 md:pt-6">
            <span className="eyebrow">Youth-led · Peel Region, ON</span>
            <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">
              Empowering youth.
              <br />
              <span className="text-primary">Inspiring change.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Peel Social Justice is a student-led club in Mississauga. We meet, discuss local
              issues, and take real action through advocacy, volunteering, and community
              partnerships.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/what-we-do" className="btn-primary btn-primary-hover">
                What we do <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/events" className="btn-ghost hover:bg-muted">
                See our events
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Based in</dt>
                <dd className="mt-1 font-display text-xl">Mississauga</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Focus</dt>
                <dd className="mt-1 font-display text-xl">Peel Region</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Led by</dt>
                <dd className="mt-1 font-display text-xl">Youth</dd>
              </div>
            </dl>
          </div>
          <div className="relative md:col-span-6">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <img
                src={hero}
                alt="Youth placing stickers on a world map at a community event"
                width={1600}
                height={1104}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden max-w-[260px] rounded-2xl border border-border bg-card p-4 shadow-lg md:block">
              <p className="text-xs uppercase tracking-widest text-secondary">Recent</p>
              <p className="mt-1 text-sm">
                Meaningful conversations at the Streetsville BIA Canada Day World Map.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="container-page py-14 md:py-20">
          <p className="max-w-4xl font-display text-3xl leading-tight md:text-5xl">
            We exist to empower young people to understand social issues, develop their voices,
            and take action through <span className="text-secondary">advocacy</span>,{" "}
            <span className="text-secondary">volunteering</span>, and{" "}
            <span className="text-secondary">community partnerships</span>.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">What we focus on</span>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">
              A space to learn, connect, and make a difference.
            </h2>
          </div>
          <Link to="/what-we-do" className="btn-ghost hover:bg-muted self-start md:self-auto">
            Explore our work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature: Canada Day */}
      <section className="container-page pb-20 md:pb-28">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={canadaDay}
              alt="Peel Social Justice at the Streetsville BIA Canada Day event"
              width={1408}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="eyebrow">Recent · Canada Day 2026</span>
            <h2 className="mt-3 text-3xl md:text-4xl">
              At the World Map with the Streetsville BIA.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We worked alongside the Streetsville BIA at their Canada Day event, helping run
              the World Map station where people placed stickers to show where they came from.
              While we were there, we had meaningful conversations with the public about social
              justice, inclusion, and community in Mississauga.
            </p>
            <div className="mt-6">
              <Link to="/events" className="btn-primary btn-primary-hover">
                See more events <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion */}
      <section className="container-page pb-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl border border-border bg-[#1e5a54] flex items-center justify-center aspect-[4/3]">
            <img
              src={discussion}
              alt="Peel Social Justice logo"
              loading="lazy"
              className="h-3/4 w-3/4 object-contain"
            />
          </div>
          <div>
            <span className="eyebrow">Our community</span>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Peel needs the next generation of voices.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We host open discussion circles, plan campaigns, and partner with local
              organizations to take real action in the community. Whether you want to lead
              projects or simply show up and talk about what matters, there is a place for
              you here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/what-we-do" className="btn-primary btn-primary-hover">
                Learn what we do <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
