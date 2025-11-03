
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { Loader2, LogOut, User, LayoutDashboard, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/logo';

interface UserProfile {
  role: 'enterprise' | 'employee';
  name: string;
  company_name: string;
}

function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear any user-related data from localStorage if needed
      localStorage.removeItem('role');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-gray-50">
      <div className="flex h-16 items-center justify-center border-b">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-2 p-4">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
      </nav>
      <div className="mt-auto p-4">
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-gray-600">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}


function EnterpriseDashboard({ profile }: { profile: UserProfile }) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
    Hello {profile.name}
</h1>
<p className="mt-2 text-lg text-gray-600">
    Company: <span className="font-semibold">{profile.company_name}</span>
</p>
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-xl font-semibold">Enterprise Dashboard</h2>
                <p className="mt-2 text-gray-600">
                    Manage your jobs, view analytics, and oversee your employees.
                </p>
            </div>
        </div>
    );
}

function EmployeeDashboard({ profile }: { profile: UserProfile }) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Welcome to {profile.company_name}
            </h1>

            {/* ✅ Insert this line to show employee name */}
            <p className="mt-2 text-lg text-gray-600">
                Employee: {profile.name}
            </p>

            <p className="mt-2 text-lg text-gray-600">
                Employee Dashboard
            </p>
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-xl font-semibold">Your Tasks</h2>
                <p className="mt-2 text-gray-600">
                    View your assigned jobs and update their status.
                </p>
            </div>
        </div>
    );
}



export default function DashboardPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // User is signed in, get the token and fetch profile
          const idToken = await user.getIdToken();
          
          // Fetch user details from your MySQL backend
          const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
  {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "x-user-uid": user.uid
    },
  }
);
         
          if (!response.ok) {
            throw new Error(`Failed to fetch user details: ${response.statusText}`);
          }
          
          const profile: UserProfile = await response.json();
          setUserProfile(profile);

        } catch (err: any) {
          console.error(err);
          setError('Could not load user profile. Please try again later.');
        } finally {
            setLoading(false);
        }
      } else {
        // User is signed out, redirect to login
        router.push('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="w-full max-w-5xl">
            {error && <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">{error}</div>}
            {userProfile && (
                userProfile.role === 'enterprise' 
                    ? <EnterpriseDashboard profile={userProfile} />
                    : <EmployeeDashboard profile={userProfile} />
            )}
        </div>
      </main>
    </div>
  );
}
