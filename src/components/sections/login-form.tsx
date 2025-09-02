"use client";

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2, Github } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type Role = 'enterprise' | 'employee';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginForm() {
  const [role, setRole] = useState<Role>('enterprise');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    console.log({ ...values, role });
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting you to your dashboard.',
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    reset();
  };

  return (
    <div className="mx-auto w-full max-w-lg bg-[#FAFAFA] p-6 md:p-8">
      <div className="bg-transparent">
        <h1 className="text-center text-2xl font-bold text-[#111827]">
          Login to Your Account
        </h1>
        <p className="mt-1 text-center text-sm text-[#6B7280]">
          Welcome back! Please enter your details.
        </p>

        <div className="my-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => handleRoleChange('enterprise')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
              role === 'enterprise'
                ? 'bg-[#2563EB] text-white shadow'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            Enterprise
          </button>
          <button
            onClick={() => handleRoleChange('employee')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
              role === 'employee'
                ? 'bg-[#16A34A] text-white shadow'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            Employee
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={
                          role === 'enterprise' ? 'Company Email' : 'Email'
                        }
                        {...field}
                        className="pl-9"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...field}
                        className="pl-9 pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="!mt-6 h-11 w-full bg-[#2563EB] text-base font-bold hover:bg-[#1D4ED8] disabled:opacity-50"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : role === 'enterprise' ? (
                'Login as Enterprise'
              ) : (
                'Login as Employee'
              )}
            </Button>
          </form>
        </Form>
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-xs font-semibold text-gray-400">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <Image
              src="/google-logo.svg"
              width={20}
              height={20}
              alt="Google"
              className="mr-2"
            />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800 hover:text-white">
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-[#2563EB] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
