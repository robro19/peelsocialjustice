import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { DEADLINE } from "@/lib/exec-application";


const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdSl-quHpD9QOpmtAIIMWwICu3IavrAHJFJqdZxldwMG5YIeg/viewform?embedded=true";
const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdSl-quHpD9QOpmtAIIMWwICu3IavrAHJFJqdZxldwMG5YIeg/viewform";
const LINKTREE_URL = "https://linktr.ee/peelsocialjustice";
const description =
  "Apply to join Peel Social Justice. Fill out our club application form to get involved in discussions, volunteering, and advocacy across Peel Region.";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Peel Social Justice" },
      { name: "description", content: description },
      { property: "og:title", content: "Get Involved — Peel Social Justice" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GetInvolved,
});

function GetInvolved() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get Involved"
        title="Join Peel Social Justice"
        lead="Fill out the club application below to become part of a youth-led community tackling local issues through discussion, volunteering, and advocacy."
      />
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto mb-12 max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <span className="eyebrow">Executive Team</span>
          <h2 className="mt-3 text-2xl md:text-3xl">Applying for an executive role?</h2>
          <p className="mt-3 text-muted-foreground">
            Executive applications run through our own portal, where your answers save automatically in
            your browser so you can finish later. Applications close {DEADLINE}.
          </p>
          <Link
            to="/executive-application"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open the executive application portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto max-w-3xl">

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <iframe
              src={FORM_URL}
              title="Peel Social Justice club application form"
              className="h-[1400px] w-full"
              loading="lazy"
            >
              Loading application form…
            </iframe>
          </div>
          <div className="mt-8 flex flex-col items-start gap-3 text-sm text-muted-foreground">
            <p>
              Having trouble with the embedded form?{" "}
              <a
                href={FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Open it in a new tab <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </p>
            <p>
              You can also find all our links, events, and socials on our{" "}
              <a
                href={LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Linktree
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
