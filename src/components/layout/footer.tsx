import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Logo />
            <p className="text-sm max-w-xs">
              Reliable distributed job processing for modern applications.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <nav className="flex flex-row gap-4 sm:gap-6">
              <Link href="#" className="text-sm hover:text-foreground transition-colors">Home</Link>
              <Link href="#dashboard" className="text-sm hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="#docs" className="text-sm hover:text-foreground transition-colors">Docs</Link>
              <Link href="#" className="text-sm hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="flex gap-4">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 hover:text-foreground transition-colors" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm">
          <p>© 2025 JobQueueX Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
