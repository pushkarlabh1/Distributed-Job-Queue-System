import Image from 'next/image';

export default function SignupMarketing() {
  return (
    <div className="hidden lg:flex flex-col justify-start bg-[#E0E7FF] p-12 h-full pt-24">
      <div className="flex justify-center mb-8">
        <div className="rounded-xl bg-white p-2 shadow-lg">
          <Image
            src="/img.png"
            alt="JobQueueX Illustration"
            width={300}
            height={300}
            className="rounded-lg object-cover"
            data-ai-hint="abstract technology illustration"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center text-[#111827] mb-3">
        Get Your Jobs Distributed Now
      </h2>
      <p className="text-center text-[#6B7280] mb-10 max-w-sm mx-auto">
        Scale your Company with our powerful distributed job queue system
      </p>

      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <p className="text-4xl font-bold text-[#2563EB]">99.9%</p>
          <p className="text-sm text-[#6B7280]">Uptime</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-[#2563EB]">10K+</p>
          <p className="text-sm text-[#6B7280]">Jobs Distributed</p>
        </div>
      </div>
    </div>
  );
}
