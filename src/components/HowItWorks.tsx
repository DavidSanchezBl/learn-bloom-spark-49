import { Search, PlayCircle, Award } from "lucide-react";
import { Section, SectionHeading } from "./ui";

const steps = [
  {
    icon: Search,
    title: "1. Encuentra tu curso",
    text: "Explora más de 1,200 cursos filtrando por categoría, nivel o instructor.",
  },
  {
    icon: PlayCircle,
    title: "2. Aprende a tu ritmo",
    text: "Mira las lecciones cuando quieras, desde cualquier dispositivo, sin horarios fijos.",
  },
  {
    icon: Award,
    title: "3. Certifícate",
    text: "Completa el curso y obtén un certificado verificado para compartir en tu CV.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-brand-soft/40">
      <SectionHeading
        center
        eyebrow="Cómo funciona"
        title="Empieza a aprender en 3 pasos"
        subtitle="No necesitas experiencia previa. Solo elige un curso y comienza hoy mismo."
      />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map(s => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
