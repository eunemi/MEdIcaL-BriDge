export function StatsSection() {
  const stats = [
    { value: "50+", label: "JCI Accredited Hospitals" },
    { value: "500+", label: "Top Global Specialists" },
    { value: "10,000+", label: "Successful Treatments" },
    { value: "45+", label: "Countries Served" },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary-container via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-2 md:px-4 relative">
              {/* Only show border between columns on desktop, or specific mobile borders */}
              {i !== 0 && (
                <div className="hidden md:block absolute left-0 top-[10%] h-[80%] w-px bg-white/10" />
              )}
              {(i === 1 || i === 3) && (
                <div className="md:hidden absolute left-0 top-[10%] h-[80%] w-px bg-white/10" />
              )}
              <div className="font-heading text-4xl md:text-5xl font-bold text-secondary-container mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
