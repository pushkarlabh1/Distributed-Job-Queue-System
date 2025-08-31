import { BarChart, Clock, RefreshCw, Zap } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Scalable Performance',
    description: 'Handle millions of jobs with our high-throughput, low-latency infrastructure.',
    color: 'primary',
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-[#16a34a]" />,
    title: 'Automatic Retries',
    description: 'Configure automatic retries with exponential backoff for failed tasks to ensure reliability.',
    color: 'green',
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Scheduled Jobs',
    description: 'Schedule jobs to run at specific times or intervals with cron-like expressions.',
    color: 'primary',
  },
  {
    icon: <BarChart className="h-10 w-10 text-[#16a34a]" />,
    title: 'Real-time Dashboard',
    description: 'Monitor job statuses, worker health, and queue metrics from a single, intuitive interface.',
    color: 'green',
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full bg-[#4169E1]/[0.07] pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="max-w-[700px] text-[#4169E1] font-bold md:text-xl">
            Everything you need for efficient job queue management.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-[30px] border bg-background p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div
                className={`mb-4 rounded-full p-4 ${
                  feature.color === 'primary' ? 'bg-primary/10' : 'bg-[#16a34a]/10'
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
