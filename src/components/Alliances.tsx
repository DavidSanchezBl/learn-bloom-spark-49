import { alliances } from "../data";
import { Section } from "./ui";

export function Alliances() {
  return (
    <Section className="py-12">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Empresas que confían en nosotros
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {alliances.map(name => (
          <span key={name} className="text-xl font-bold text-muted-foreground/70 hover:text-foreground transition-colors">
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}
