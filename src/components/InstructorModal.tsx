import { useEffect } from "react";
import { X, Star, Users, BookOpen, Award } from "lucide-react";
import type { Instructor } from "../data";

export function InstructorModal({
  instructor,
  onClose,
}: {
  instructor: Instructor | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (instructor) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [instructor]);

  if (!instructor) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-background shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 hover:bg-secondary"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-28 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />
        <div className="px-6 pb-6">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="-mt-12 h-24 w-24 rounded-full border-4 border-background object-cover"
          />
          <h3 className="mt-4 text-xl font-bold text-foreground">{instructor.name}</h3>
          <p className="text-sm text-accent">{instructor.role}</p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-secondary/50 p-3 text-center">
              <Star className="mx-auto h-4 w-4 fill-amber-400 text-amber-400" />
              <p className="mt-1 text-sm font-bold text-foreground">{instructor.rating}</p>
              <p className="text-xs text-muted-foreground">Valoración</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-3 text-center">
              <Users className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-1 text-sm font-bold text-foreground">
                {instructor.students.toLocaleString("es-MX")}
              </p>
              <p className="text-xs text-muted-foreground">Estudiantes</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-3 text-center">
              <BookOpen className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-1 text-sm font-bold text-foreground">{instructor.courses}</p>
              <p className="text-xs text-muted-foreground">Cursos</p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Award className="h-4 w-4 text-accent" /> Sobre el instructor
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">{instructor.bio}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-6 h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Ver sus cursos
          </button>
        </div>
      </div>
    </div>
  );
}
