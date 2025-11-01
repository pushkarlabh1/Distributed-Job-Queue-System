
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    } else {
      // If no user, maybe they came here by mistake. Redirect to signup.
      router.push('/signup');
    }
  }, [router]);

  const handleContinue = async () => {
    setIsLoading(true);
    const user = auth.currentUser;

    if (!user) {
      toast({
        title: 'Error',
        description: 'You are not logged in. Please sign up or log in.',
        variant: 'destructive',
      });
      setIsLoading(false);
      router.push('/signup');
      return;
    }

    // Force a reload of the user's profile to get the latest email verification status
    await user.reload();
    const freshUser = auth.currentUser; // get the fresh user object

    if (freshUser?.emailVerified) {
      const role = localStorage.getItem('role');
      if (role === 'enterprise') {
        router.push('/copy-link');
      } else if (role === 'employee') {
        router.push('/dashboard');
      } else {
        // Fallback if role is not set
        router.push('/dashboard');
      }
    } else {
      toast({
        title: 'Email Not Verified',
        description: 'Please check your inbox and click the verification link first.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
        <p className="mt-4 text-gray-600">
          We've sent a verification link to{' '}
          <span className="font-semibold text-primary">{userEmail || 'your email'}</span>.
        </p>
        <p className="mt-2 text-gray-600">
          Please click the link in the email to continue.
        </p>
        <Button
          onClick={handleContinue}
          disabled={isLoading}
          className="mt-8 w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'I Verified My Email — Continue'
          )}
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Didn't receive an email? Check your spam folder or try signing up again.
        </p>
      </div>
    </div>
  );
}

    