
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/firebase/firebase';

export default function CopyLinkPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [inviteLink, setInviteLink] = useState('https://distributed-job-queue-system.vercel.app/signup?role=employee');

  useEffect(() => {
    // Ensure user is authenticated and is an enterprise user
    const user = auth.currentUser;
    const role = localStorage.getItem('role');

    if (!user || role !== 'enterprise') {
      router.push('/login');
      return;
    }
  }, [router]);

  const copyToClipboard = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({ title: 'Invite link copied to clipboard!' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 text-center shadow-md">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">Your Account is Ready!</h1>
        <p className="mt-4 text-gray-600">
          Share this invite link with your employees to allow them to join your company workspace on JobQueueX.
        </p>
        
        <div className="mt-6 w-full p-3 border border-dashed rounded-lg flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-700 truncate">{inviteLink}</span>
          <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy invite link">
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={() => router.push('/dashboard')} className="mt-8 w-full bg-primary text-white hover:bg-primary/90">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
