import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

const LINKTREE_URL = "https://linktr.ee/peelsocialjustice";
const description =
  "Get involved with Peel Social Justice. Visit our Linktree for the latest applications, events, and ways to connect.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Get Involved — Peel Social Justice" },
      { name: "description", content: description },
      { property: "og:title", content: "Get Involved — Peel Social Justice" },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apply,
});

function Apply() {
  return (
    <SiteLayout>
      <section className="container-page py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get Involved</span>
          <h1 className="mt-4 text-5xl md:text-6xl">
            Everything lives on our <span className="text-primary">Linktree</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            For applications, upcoming events, socials, and ways to get involved with
            Peel Social Justice, head over to our Linktree.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary-hover text-base"
            >
              Visit our Linktree <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            linktr.ee/peelsocialjustice
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
