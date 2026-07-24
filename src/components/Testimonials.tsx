import { Star, Quote } from "lucide-react";
import { Section, SectionHeading } from "./ui";
import { testimonials } from "../data";

export function Testimonials() {
  return (
    <Section id="testimonios">
      <SectionHeading
        center
        eyebrow="Testimonios"
        title="Historias de estudiantes que cambiaron su carrera"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map(t => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
            <Quote className="h-8 w-8 text-accent/30" />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">"{t.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
