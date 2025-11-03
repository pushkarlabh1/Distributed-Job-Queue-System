"use client";

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
    <section className="w-full bg-[#4169E1]/[0.07] flex flex-col items-center justify-center pt-8 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28">
      <div className="container px-4 md:px-6 lg:px-28">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Distributed Job Queue System <br />
              <span className="text-primary">
                — Manage Tasks
                <br /> at Scale.
              </span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Reliable, scalable, and enterprise-ready job processing for modern applications.
            </p>

            <div className="mx-auto lg:mx-0">
              <TypingEffect texts={typingTexts} />

              {/* Buttons Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4 sm:mt-8">
                {/* Recruiter Button with Blue Border Animation */}
                <Link href="/signup?role=enterprise">
                  <div className="animated-border rounded-full">
                    <div className="inner rounded-full">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full relative z-10 border-0 text-2xl font-extrabold text-[#4169E1] hover:bg-[#4169E1] hover:text-white px-8 rounded-full"
                      >
                        Enterprise
                      </Button>
                    </div>
                  </div>
                </Link>

                {/* Employee Button with Green Border Animation */}
                <Link href="/signup?role=employee">
                  <div className="animated-border green rounded-full">
                    <div className="inner rounded-full">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full relative z-10 border-0 text-2xl font-bold text-[#16a34a] hover:bg-[#16a34a] hover:text-white px-8 rounded-full"
                      >
                        Employee
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mt-8">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Right Image Section */}
          <div className="flex items-start justify-center">
            <div className="animated-border animated-border-image">
              <div className="bg-white p-4 shadow-lg inner">
                <Image
                  src="/img.jpeg"
                  alt="System architecture diagram"
                  width={800}
                  height={600}
                  className=""
                  data-ai-hint="system diagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
