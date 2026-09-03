import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "psj-cookie-consent";
const CONSENT_EVENT = "psj-cookie-consent-change";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(CONSENT_KEY));
  }, []);

  function chooseConsent(value: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm text-muted-foreground">
          We use essential storage to remember your preferences and, with your permission,
          privacy-conscious analytics to understand how the site is used. Read our{" "}
          <Link to="/privacy-policy" className="text-primary underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => chooseConsent("rejected")}>
            Decline analytics
          </Button>
          <Button size="sm" onClick={() => chooseConsent("accepted")}>
            Accept analytics
          </Button>
        </div>
      </div>
    </aside>
  );
}
