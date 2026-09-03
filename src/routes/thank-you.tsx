import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

const DESC =
  "Thank you for connecting with Peel Social Justice. Find your next way to participate in youth-led community action across Peel Region.";
const OG_IMAGE = "https://peelsocialjustice.org/psj-logo.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Peel Social Justice" },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Thank You — Peel Social Justice" },
      { property: "og:description", content: DESC },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <SiteLayout>
      <section className="container-page flex min-h-[60vh] items-center justify-center py-20">
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" aria-hidden="true" />
          <span className="eyebrow mt-6">Message received</span>
          <h1 className="mt-4 text-5xl md:text-6xl">Thank you for reaching out.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We appreciate your interest in Peel Social Justice. Keep an eye on your inbox for a
            reply, and explore what is happening across our community in the meantime.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/events" className="btn-primary btn-primary-hover">
              See upcoming events <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="btn-ghost hover:bg-muted">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
