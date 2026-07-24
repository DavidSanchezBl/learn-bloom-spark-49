import { Check, Crown } from "lucide-react";
import { Button, Section, SectionHeading } from "./ui";
import { pricingPlans } from "../data";
import { formatPrice } from "../data";

export function Pricing() {
  return (
    <Section id="precios" className="bg-brand-soft/40">
      <SectionHeading
        center
        eyebrow="Precios"
        title="Elige el plan que se adapta a ti"
        subtitle="Empieza gratis y mejora cuando estés listo. Sin contratos ni costos ocultos."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map(plan => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
              plan.featured ? "border-primary shadow-lg ring-1 ring-primary/20" : "border-border"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Crown className="h-3 w-3" /> Más popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">{formatPrice(plan.price)}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={plan.featured ? "primary" : "outline"}
              className="mt-8 w-full"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
