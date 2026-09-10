import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";

const DESC =
  "Read the Peel Social Justice privacy policy to learn how we handle contact details, application responses, cookies, and analytics.";
const OG_IMAGE = "https://peelsocialjustice.org/psj-logo.png";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Peel Social Justice" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Privacy Policy — Peel Social Justice" },
      { property: "og:description", content: DESC },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Your privacy"
        title="Privacy Policy"
        lead="We keep our approach to privacy simple: collect only what we need, explain why we need it, and give you control over optional analytics."
      />
      <section className="container-page max-w-4xl py-16 md:py-24">
        <div className="space-y-10 text-muted-foreground">
          <div>
            <h2 className="text-2xl text-foreground">Information you provide</h2>
            <p className="mt-3">
              If you contact us by email, apply to join, or submit an application, we may receive
              your name, email address, phone number, and the information you choose to include.
              We use it only to respond, coordinate participation, and review applications.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Local storage and cookies</h2>
            <p className="mt-3">
              The site stores your cookie preference in your browser. This is not used to identify
              you or sell your information.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Optional analytics</h2>
            <p className="mt-3">
              If you accept analytics cookies, we may use Google Analytics through a measurement
              ID configured by the site owner to understand aggregate site usage. Analytics is
              not loaded when you decline. You can clear your browser's site storage to choose
              again.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Third-party services</h2>
            <p className="mt-3">
              Some links and forms lead to services operated by third parties, including Google
              Forms and Linktree. Their own privacy policies apply when you leave this website.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Questions or requests</h2>
            <p className="mt-3">
              To ask about your information or this policy, email{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:peelsocialjustice@gmail.com">
                peelsocialjustice@gmail.com
              </a>
              . Peel Social Justice is based in Mississauga, Ontario, Canada.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
