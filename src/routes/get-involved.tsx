import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";

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
      { property: "og:image", content: "https://peelsocialjustice.org/psj-logo.png" },
      { name: "twitter:image", content: "https://peelsocialjustice.org/psj-logo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GetInvolved,
});

function GetInvolved() {
  const [formLoaded, setFormLoaded] = useState(false);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get Involved"
        title="Join Peel Social Justice"
        lead="Fill out the club application below to become part of a youth-led community tackling local issues through discussion, volunteering, and advocacy."
      />
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl">

          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            {!formLoaded && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 z-10 flex min-h-[420px] items-center justify-center gap-3 bg-card text-sm text-muted-foreground"
              >
                <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                Loading application form…
              </div>
            )}
            <iframe
              src={FORM_URL}
              title="Peel Social Justice club application form"
              className={`h-[1400px] w-full transition-opacity ${formLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              onLoad={() => setFormLoaded(true)}
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
