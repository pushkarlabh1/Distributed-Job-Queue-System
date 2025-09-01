import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LoginForm from '@/components/sections/login-form';
import SignupMarketing from '@/components/sections/signup-marketing';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#4169E1]/[0.07] md:bg-[#FFFFFF]">
      <Header />
      <main className="flex flex-1 items-center justify-center pt-16">
        <div className="w-full max-w-6xl p-4 md:py-20">
          <div className="overflow-hidden rounded-[2rem] shadow-lg lg:grid lg:grid-cols-2">
            <div className="lg:col-span-1">
              <SignupMarketing />
            </div>
            <div className="lg:col-span-1">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
