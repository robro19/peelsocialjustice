import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";

const DESC =
  "Read the terms of use for the Peel Social Justice website, including external links, applications, content, and site availability.";
const OG_IMAGE = "https://peelsocialjustice.org/psj-logo.png";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Terms of Use — Peel Social Justice" },
      { property: "og:description", content: DESC },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Website information"
        title="Terms of Use"
        lead="By using this website, you agree to use it responsibly and understand how our public information and external services work."
      />
      <section className="container-page max-w-4xl py-16 md:py-24">
        <div className="space-y-10 text-muted-foreground">
          <div>
            <h2 className="text-2xl text-foreground">Using this website</h2>
            <p className="mt-3">
              You may use this site for lawful, personal, educational, and community purposes.
              Do not interfere with the site's operation, attempt unauthorized access, or submit
              content that is unlawful, harmful, or impersonates another person.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Applications and submissions</h2>
            <p className="mt-3">
              Application and contact submissions should contain accurate information. Sending an
              application does not guarantee membership, an executive role, or participation in a
              specific event. We may contact you using the details you provide.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Content and external links</h2>
            <p className="mt-3">
              Website text, branding, and original materials belong to Peel Social Justice or
              their respective owners. External links are provided for convenience; we do not
              control or guarantee third-party content, availability, or policies.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Availability and changes</h2>
            <p className="mt-3">
              We aim to keep information current, but event details and services can change. The
              website is provided as available, without a guarantee that every page or external
              service will always be uninterrupted or error-free.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:peelsocialjustice@gmail.com">
                peelsocialjustice@gmail.com
              </a>
              . These terms are governed by the laws applicable in Ontario, Canada.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
