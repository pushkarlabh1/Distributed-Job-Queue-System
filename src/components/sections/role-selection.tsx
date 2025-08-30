import { Building2, Laptop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoleSelection() {
  return (
    <section id="roles" className="w-full bg-muted py-8 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose Your Role
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Select the role that best fits your needs
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2">
          {/* Recruiter Card */}
          <Card className="flex flex-col rounded-[30px] transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Recruiter</CardTitle>
              <CardDescription className="text-center">
                Submit jobs, set priorities, and monitor execution with comprehensive management tools.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                className="w-full text-xl font-semibold bg-primary text-white 
                           transition-all duration-200 
                           hover:bg-primary/90 hover:scale-105 hover:font-extrabold"
              >
                Register as Recruiter
              </Button>
            </CardFooter>
          </Card>

          {/* Employee Card */}
          <Card className="flex flex-col rounded-[30px] transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="items-center">
              <div className="mb-4 rounded-full bg-[#16a34a]/10 p-4">
                <Laptop className="h-8 w-8 text-[#16a34a]" />
              </div>
              <CardTitle>Employee</CardTitle>
              <CardDescription className="text-center">
                Process tasks efficiently with real-time updates and streamlined workflow management.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                className="w-full text-xl font-semibold bg-[#16a34a] text-white 
                           transition-all duration-200 
                           hover:bg-[#16a34a]/90 hover:scale-105 hover:font-extrabold"
              >
                Register as Employee
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
