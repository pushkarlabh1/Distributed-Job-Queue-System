import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-[#4169E1]/[0.07] text-muted-foreground">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm max-w-xs mt-2">
              Reliable distributed job processing for modern applications.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-6 w-6 hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm">
          <p>© 2025 JobQueueX Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
