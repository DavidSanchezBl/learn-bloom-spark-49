import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "./ui";

export function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-brand-soft to-background">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="reveal reveal-in">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
            <Sparkles className="h-4 w-4" /> Nueva plataforma de aprendizaje
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Aprende habilidades <span className="text-accent">reales</span> con expertos de la industria
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Más de 1,200 cursos en programación, diseño y marketing. Avanza a tu ritmo y obtén
            certificados reconocidos por empresas líderes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={onExplore}>
              Explorar cursos <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Play className="h-4 w-4" /> Ver demo
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60",
                "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60",
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60",
                "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=60",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span>
              <strong className="text-foreground">85,000+</strong> estudiantes aprendiendo hoy
            </span>
          </div>
        </div>

        <div className="relative reveal reveal-in">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Estudiantes aprendiendo online"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-background p-4 shadow-lg sm:block">
            <p className="text-3xl font-bold text-primary">97%</p>
            <p className="text-sm text-muted-foreground">satisfacción</p>
          </div>
          <div className="absolute -right-4 top-8 hidden rounded-2xl border border-border bg-background p-4 shadow-lg sm:block">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium">Clases en vivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
