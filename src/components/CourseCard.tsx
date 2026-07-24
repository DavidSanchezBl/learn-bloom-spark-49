import { Star, Clock, PlayCircle, Plus } from "lucide-react";
import { Badge } from "./ui";
import { formatPrice, type Course } from "../data";

const tagVariant: Record<string, "warm" | "amber" | "green"> = {
  "Nuevo": "green",
  "Destacado": "amber",
  "Bestseller": "warm",
};

export function CourseCard({
  course,
  onEnroll,
  onInstructor,
  onDetails,
}: {
  course: Course;
  onEnroll: (course: Course) => void;
  onInstructor: (id: string) => void;
  onDetails: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {course.tag && (
          <div className="absolute left-3 top-3">
            <Badge variant={tagVariant[course.tag] ?? "default"}>{course.tag}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-semibold text-foreground">{course.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

        <button
          onClick={() => onInstructor(course.instructorId)}
          className="mt-3 text-left text-sm font-medium text-primary hover:underline"
        >
          {course.instructor}
        </button>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {course.rating} ({course.reviews})
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5" /> {course.lessons} lecciones
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <span className="text-lg font-bold text-foreground">{formatPrice(course.price)}</span>
            {course.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => onEnroll(course)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Inscribirme
          </button>
        </div>

        <button
          onClick={onDetails}
          className="mt-2 text-center text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Ver detalles del instructor
        </button>
      </div>
    </article>
  );
}
