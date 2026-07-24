import { stats } from "../data";
import { Section } from "./ui";

export function Stats() {
  return (
    <Section className="py-16">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-3xl font-bold text-primary sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
