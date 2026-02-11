import { ReactNode } from 'react';
import PublicNav from './PublicNav';
import { Heart } from 'lucide-react';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'government-school');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/school-logo.dim_512x512.png"
              alt="School Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Government School</span>
              <span className="text-xs text-muted-foreground">Excellence in Education</span>
            </div>
          </div>
          <PublicNav />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/30 py-8 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/assets/generated/school-logo.dim_512x512.png"
                  alt="School Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-semibold text-foreground">Government School</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Committed to providing quality education and nurturing future leaders.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/admissions" className="hover:text-foreground transition-colors">
                    Admissions
                  </a>
                </li>
                <li>
                  <a href="/academics" className="hover:text-foreground transition-colors">
                    Academics
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                123 Education Street
                <br />
                City, State 12345
                <br />
                Phone: (555) 123-4567
                <br />
                Email: info@govschool.edu
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Government School. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
