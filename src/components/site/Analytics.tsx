import { useEffect, useState } from "react";

const CONSENT_KEY = "psj-cookie-consent";
const CONSENT_EVENT = "psj-cookie-consent-change";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());

    const onConsentChange = () => setConsented(hasAnalyticsConsent());
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  useEffect(() => {
    if (!consented || !/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID ?? "")) return;

    const existingScript = document.querySelector(
      `script[data-ga-measurement-id="${GA_MEASUREMENT_ID}"]`,
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.gaMeasurementId = GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }, [consented]);

  return null;
}
