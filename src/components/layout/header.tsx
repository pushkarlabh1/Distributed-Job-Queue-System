"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#docs', label: 'Docs' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
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
          <Button variant="ghost" className="text-[#4169E1] font-bold hover:bg-[#4169E1] hover:text-white hover:font-extrabold">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-[hsl(222,83%,58%)] to-[hsl(223,76%,49%)] text-white font-bold hover:font-extrabold">
            Register
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
                   <Button variant="ghost" className="text-[#4169E1] font-bold hover:bg-[#4169E1] hover:text-white hover:font-extrabold">
                    Login
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-[hsl(222,83%,58%)] to-[hsl(223,76%,49%)] text-white font-bold hover:font-extrabold">
                    Register
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
