import { Link } from "wouter";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Scale className="h-6 w-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-primary-foreground">
                NyaySetu
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              India's most trusted and technologically advanced legal platform. 
              Bridging the gap between citizens and justice through technology.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Services</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/ai-chat" className="hover:text-white transition-colors">AI Legal Assistant</Link></li>
              <li><Link href="/lawyers" className="hover:text-white transition-colors">Find a Lawyer</Link></li>
              <li><Link href="/documents" className="hover:text-white transition-colors">Legal Documents</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">Case Tracker</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Resources</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/rights" className="hover:text-white transition-colors">Know Your Rights</Link></li>
              <li><Link href="/emergency" className="hover:text-white transition-colors">Emergency Helpline</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Legal Glossary</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Court Locations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>Support: support@nyaysetu.gov.in</li>
              <li>Grievance: grievance@nyaysetu.gov.in</li>
              <li>Toll Free: 1800-11-XXXX</li>
              <li className="pt-2 text-xs text-primary-foreground/50">
                Operates under the advisory of the Ministry of Law and Justice.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} NyaySetu. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/60">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
