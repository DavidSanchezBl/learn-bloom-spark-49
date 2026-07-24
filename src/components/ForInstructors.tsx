import { GraduationCap, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Button, Section } from "./ui";

const benefits = [
  { icon: TrendingUp, title: "Alcanza más estudiantes", text: "Publica cursos ilimitados sin restricciones y llega a miles de estudiantes." },
  { icon: GraduationCap, title: "Herramientas de enseñanza", text: "Editor de lecciones, foros por curso y clases en vivo integradas." },
  { icon: Users, title: "Comunidad de instructores", text: "Conecta con otros instructores y comparte estrategias de enseñanza." },
];

export function ForInstructors() {
  return (
    <Section id="instructores" className="bg-primary text-primary-foreground">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-warm">
            Para instructores
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Conviértete en instructor y comparte tu conocimiento
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">
            Únete a más de 320 instructores que ya están generando ingresos enseñando lo que aman.
            Sin límites de cursos, sin comisiones ocultas.
          </p>
          <div className="mt-8 flex gap-3">
            <Button variant="secondary" size="lg">
              Empezar a enseñar <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Saber más
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {benefits.map(b => (
            <div key={b.title} className="flex gap-4 rounded-2xl bg-white/10 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-white">
                <b.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
