import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { courses } from "../data";
import { CourseCard } from "./CourseCard";
import { Section, SectionHeading } from "./ui";
import type { Course, Instructor } from "../data";

const categories = ["Todos", "Programación", "Diseño", "Marketing"];
const levels = ["Todos los niveles", "Principiante", "Intermedio", "Avanzado"];

export function CoursesPage({
  onEnroll,
  onInstructor,
  onDetails,
}: {
  onEnroll: (c: Course) => void;
  onInstructor: (id: string) => void;
  onDetails: (c: Course) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [level, setLevel] = useState("Todos los niveles");

  const filtered = courses.filter(c => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Todos" || c.category === category;
    const matchesLevel = level === "Todos los niveles" || c.level === level;
    return matchesQuery && matchesCategory && matchesLevel;
  });

  return (
    <Section id="cursos">
      <SectionHeading
        eyebrow="Catálogo"
        title="Todos los cursos"
        subtitle="Filtra por categoría y nivel para encontrar el curso ideal para ti."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar cursos..."
            className="h-11 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="h-11 rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="h-11 rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={onEnroll}
            onInstructor={onInstructor}
            onDetails={() => onDetails(course)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          <SlidersHorizontal className="mx-auto mb-2 h-8 w-8 opacity-50" />
          No encontramos cursos con esos filtros. Prueba con otros criterios.
        </p>
      )}
    </Section>
  );
}
