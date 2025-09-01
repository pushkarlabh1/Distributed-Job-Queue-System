"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Briefcase,
  Building,
  ChevronDown,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Copy,
  Loader2,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
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

const companies = [
  { value: 'acme-corp', label: 'Acme Corp', employees: 35 },
  { value: 'abc-tech', label: 'ABC Tech', employees: 120 },
  { value: 'bravo-systems', label: 'Bravo Systems', employees: 78 },
];

const enterpriseSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

const employeeSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

function SignupFormComponent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role');

  const [role, setRole] = useState<Role>(
    initialRole === 'employee' ? 'employee' : 'enterprise'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState<'form' | 'success'>('form');
  const [inviteLink, setInviteLink] = useState('');
  const [openCompanyPopover, setOpenCompanyPopover] = useState(false);
  const [isRequestInviteOpen, setIsRequestInviteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(role === 'enterprise' ? enterpriseSchema : employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
      company: '',
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery === 'employee' || roleFromQuery === 'enterprise') {
      setRole(roleFromQuery);
    }
  }, [searchParams]);

  const onSubmit = (values: any) => {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      if (role === 'enterprise') {
        setInviteLink('https://jobqueuex.com/invite/aB3xZ9pQ');
        setFormStep('success');
      } else {
        toast({
          title: 'Welcome to your new team!',
          description: "You've successfully joined the company workspace.",
        });
        reset();
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    reset(); 
    setFormStep('form');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({ title: 'Invite link copied to clipboard!' });
  };
  
  if (formStep === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-8 text-center h-full">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Account Created!</h2>
        <p className="text-[#6B7280] mb-6">
          Share this invite link with your employees to get them started.
        </p>
        <div className="w-full p-3 border border-dashed rounded-lg flex items-center justify-between bg-[#F9FAFB]">
          <span className="text-sm text-gray-700 truncate">{inviteLink}</span>
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setFormStep('form')} className="mt-8 w-full bg-[#2563EB] hover:bg-[#1D4ED8]">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 md:p-8">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
            1
          </span>
          <span className="font-semibold text-[#2563EB]">Create Account</span>
        </div>
        <div className="h-px flex-1 bg-gray-200"></div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-bold">
            2
          </span>
          <span className="font-semibold">Verify Email</span>
        </div>
      </div>
      
      <div className="bg-white">
        <h1 className="text-2xl font-bold text-[#111827] text-center">
          Create Your Account
        </h1>
        <p className="mt-1 text-center text-sm text-[#6B7280]">
          Get started on JobQueueX as an
        </p>

        <div className="my-4 grid grid-cols-2 gap-2 rounded-lg bg-[#F9FAFB] p-1">
          <button
            onClick={() => handleRoleChange('enterprise')}
            className={cn(
              'rounded-md py-2 text-sm font-medium transition-colors',
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
              'rounded-md py-2 text-sm font-medium transition-colors',
              role === 'employee'
                ? 'bg-[#16A34A] text-white shadow'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            Employee
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {role === 'employee' && (
              <FormField
                control={control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Popover open={openCompanyPopover} onOpenChange={setOpenCompanyPopover}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? companies.find(
                                  (company) => company.value === field.value
                                )?.label
                              : 'Select company'}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search company..." />
                          <CommandList>
                            <CommandEmpty>
                              <div className="p-4 text-sm text-center">
                                <p>No company found.</p>
                                <Button
                                  variant="link"
                                  className="h-auto p-0 mt-1 text-primary"
                                  onClick={() => {
                                    setOpenCompanyPopover(false);
                                    setIsRequestInviteOpen(true);
                                  }}
                                >
                                  Request Invite
                                </Button>
                              </div>
                            </CommandEmpty>
                            <CommandGroup>
                              {companies.map((company) => (
                                <CommandItem
                                  value={company.label}
                                  key={company.value}
                                  onSelect={() => {
                                    form.setValue('company', company.value);
                                    setOpenCompanyPopover(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === company.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {company.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
               <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                     <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input placeholder="First Name" {...field} className="pl-9" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
             <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                   <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={role === 'enterprise' ? 'Company Email' : 'Email'}
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
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-1">
                   <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                     <FormLabel className="text-sm font-normal text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="font-medium text-[#2563EB] hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium text-[#2563EB] hover:underline">
                        Privacy Policy
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-11 bg-[#2563EB] text-base font-bold hover:bg-[#1D4ED8] disabled:opacity-50 !mt-5" disabled={!isValid || isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                role === 'enterprise' ? 'Create Account' : 'Join as Employee'
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

        <p className="mt-4 text-center text-sm text-[#6B7280]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#2563EB] hover:underline">
            Log In
          </Link>
        </p>
      </div>
      
       <Dialog open={isRequestInviteOpen} onOpenChange={setIsRequestInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request an Invite</DialogTitle>
            <DialogDescription>
              If your company isn't listed, you can request an invitation. We'll
              notify you once your company is on board.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Enter your company's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requesterEmail">Your Email</Label>
              <Input id="requesterEmail" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" placeholder="Anything else we should know?" />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsRequestInviteOpen(false);
                toast({
                  title: 'Request Sent!',
                  description: "We'll be in touch with you shortly.",
                });
              }}
              className="bg-[#2563EB] hover:bg-[#1D4ED8]"
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Wrap the component with Suspense for it to work with useSearchParams
export default function SignupForm() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SignupFormComponent />
    </React.Suspense>
  );
}
