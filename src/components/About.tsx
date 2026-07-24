import { Target, Heart, Users } from "lucide-react";
import { Section, SectionHeading } from "./ui";

const pillars = [
  {
    icon: Target,
    title: "Aprendizaje práctico",
    text: "Cada curso incluye proyectos reales que puedes agregar a tu portafolio desde el primer día.",
  },
  {
    icon: Heart,
    title: "Accesible para todos",
    text: "Becas y planes gratuitos para que cualquier persona pueda aprender, sin importar su contexto.",
  },
  {
    icon: Users,
    title: "Comunidad activa",
    text: "Miles de estudiantes e instructores que se apoyan mutuamente en foros y sesiones en vivo.",
  },
];

export function About() {
  return (
    <Section id="acerca">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Acerca de EduPrix"
            title="Educación que transforma carreras"
            subtitle="Conectamos a estudiantes con instructores expertos para crear una experiencia de aprendizaje que genera resultados reales."
          />
          <div className="mt-8 space-y-6">
            {pillars.map(p => (
              <div key={p.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-muted-foreground">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <img
            src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=500"
            alt="Aprendizaje colaborativo"
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=500"
            alt="Clase online"
            className="mt-8 aspect-square w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
