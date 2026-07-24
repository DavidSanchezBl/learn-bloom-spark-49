import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, Badge } from "./ui";

const categories = [
  { name: "Programación", count: 480, image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Diseño", count: 320, image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Marketing", count: 250, image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Datos & IA", count: 150, image: "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

export function Explore() {
  return (
    <Section id="explorar">
      <SectionHeading
        eyebrow="Explora"
        title="Categorías populares"
        subtitle="Descubre cursos por área de interés y encuentra tu próximo aprendizaje."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(c => (
          <a
            key={c.name}
            href="#cursos"
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={c.image}
              alt={c.name}
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <Badge variant="warm" className="bg-white/20 text-white">{c.count} cursos</Badge>
              <p className="mt-2 flex items-center gap-1 text-lg font-semibold">
                {c.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
