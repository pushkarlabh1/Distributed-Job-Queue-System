import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import RoleSelection from '@/components/sections/role-selection';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <RoleSelection />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
