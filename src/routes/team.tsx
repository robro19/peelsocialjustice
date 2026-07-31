import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";

const DESC =
  "Meet the executive team behind Peel Social Justice — youth leaders driving discussion, advocacy, and community action across Peel Region.";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Meet the Team — Peel Social Justice" },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Team,
});

interface TeamMember {
  name: string;
  role: string;
  img?: string;
  initials: string;
  instagram?: string;
  linkedin?: string;
}

const presidents: TeamMember[] = [
  {
    name: "Rohan Paladgu",
    role: "Founder & Co-President",
    img: "/rohan-paladgu.jpeg",
    initials: "RP",
    instagram: "https://instagram.com/rohnvvv",
    linkedin: "https://www.linkedin.com/in/rohan-paladgu-2773592a6",
  },
  {
    name: "Arhum Saleem",
    role: "Co-President",
    initials: "AS",
  },
];

const vicePresidents: TeamMember[] = [
  {
    name: "Kirat Chopra",
    role: "Vice President",
    initials: "KC",
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-center">
      {member.img ? (
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={member.img}
            alt={`${member.name}, ${member.role}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/15">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
            {member.initials}
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-secondary">{member.role}</p>
        {(member.instagram || member.linkedin) && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on Instagram`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Team() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our team"
        title="Meet the youth leading Peel Social Justice."
        lead="Our executive team is made up of students committed to building a space where young people can discuss local issues and take action together."
      />

      <section className="container-page py-20 md:py-28">
        <div className="space-y-16">
          <div>
            <h2 className="text-center text-2xl font-semibold">Presidents</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {presidents.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-center text-2xl font-semibold">Vice Presidents</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {vicePresidents.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-muted/50 p-8 text-center md:p-12">
          <h2 className="text-2xl md:text-3xl">Want to join the team?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            We're always looking for motivated youth who want to make a difference in Peel Region.
            Executive applications open throughout the year.
          </p>
          <a
            href="https://linktr.ee/peelsocialjustice"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-primary-hover mt-6 inline-flex"
          >
            Apply through Linktree
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
