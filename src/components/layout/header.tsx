"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#docs', label: 'Docs' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" className="text-[#2563EB] font-bold hover:bg-[#1D4ED8] hover:text-white" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            className={cn(
              "bg-[#2563EB] text-white font-bold hover:bg-[#1D4ED8]",
              pathname === '/signup' && "bg-[#1D4ED8]"
            )}
            asChild
           >
            <Link href="/signup">Register</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="text-sm font-medium">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4 border-t pt-6">
                   <Button variant="ghost" className="text-[#2563EB] font-bold hover:bg-[#1D4ED8] hover:text-white" asChild>
                     <Link href="/login">Login</Link>
                   </Button>
                  <Button 
                    className={cn(
                      "bg-[#2563EB] text-white font-bold hover:bg-[#1D4ED8]",
                      pathname === '/signup' && "bg-[#1D4ED8]"
                    )}
                    asChild
                  >
                    <Link href="/signup">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
