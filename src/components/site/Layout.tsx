import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>{children}</main>
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
