import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import SignupForm from '@/components/sections/signup-form';
import SignupMarketing from '@/components/sections/signup-marketing';

export default function SignupPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#4169E1]/[0.07] md:bg-[#FAFAFA]">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="w-full max-w-6xl p-4 md:py-20">
          <div className="shadow-lg rounded-[2rem] overflow-hidden lg:grid lg:grid-cols-2">
            <div className="lg:col-span-1">
              <SignupMarketing />
            </div>
            <div className="lg:col-span-1">
              <SignupForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
