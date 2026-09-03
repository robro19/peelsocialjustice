import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pb-20 md:pb-0">{children}</main>
      <Link
        to="/get-involved"
        className="fixed inset-x-4 bottom-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 md:hidden"
      >
        Join Peel Social Justice <ArrowRight className="h-4 w-4" />
      </Link>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-border/60 bg-gradient-to-b from-muted/60 to-background">
      <div className="container-page py-16 md:py-24">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl">{title}</h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lead}</p>
        )}
      </div>
    </section>
  );
}
