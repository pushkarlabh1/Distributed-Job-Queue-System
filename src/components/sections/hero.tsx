import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TypingEffect from '@/components/typing-effect';

export default function Hero() {
  const typingTexts = [
    'Register now as a < />',
    'Start your journey as a < />',
    'Unlock opportunities as a < />',
  ];

  return (
    <section className="w-full bg-background pt-24 md:pt-32 lg:pt-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Distributed Job Queue System — <span className="text-primary">Manage Tasks at Scale</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Reliable, scalable, and enterprise-ready job processing for modern applications.
            </p>
            <div>
              <TypingEffect texts={typingTexts} />
              <div className="flex flex-row gap-2 sm:gap-4">
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-xs text-primary-foreground hover:bg-primary/90 hover:font-semibold md:flex-none md:text-sm"
                >
                  Recruiter
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-[#16a34a] text-xs text-white hover:bg-[#16a34a]/90 hover:font-semibold md:flex-none md:text-sm"
                >
                  Employee
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="#" className="font-medium text-primary underline-offset-4 hover:underline">
                Login here
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/img.jpeg"
              alt="System architecture diagram"
              width={800}
              height={600}
              className="rounded-xl object-cover"
              data-ai-hint="system diagram"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
