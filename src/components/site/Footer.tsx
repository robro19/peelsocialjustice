import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary" />
            Peel <span className="text-primary">Social Justice</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A youth-led club uniting Peel Region for change. We meet, discuss local issues,
            and take action through advocacy, volunteering, and community partnerships.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/what-we-do" className="hover:text-primary">What We Do</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/partners" className="hover:text-primary">Partners</Link></li>
            <li><Link to="/get-involved" className="hover:text-primary">Get Involved</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Connect
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:text-primary">
                <Instagram className="h-4 w-4" /> @peelsocialjustice
              </a>
            </li>
            <li>
              <a href="mailto:peelsocialjustice@gmail.com" className="inline-flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" /> peelsocialjustice@gmail.com
              </a>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Peel Social Justice. Mississauga, ON.</p>
          <p>Empowering youth. Inspiring change.</p>
        </div>
      </div>
    </footer>
  );
}
