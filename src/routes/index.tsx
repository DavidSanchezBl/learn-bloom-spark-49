import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COURSES } from "@/lib/courses";
import { BookOpen, Users, Award, Sparkles, CheckCircle2, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-soft/60 via-background to-accent/40" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Nueva plataforma educativa hondureña
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Aprende habilidades reales, <span className="text-primary">a tu ritmo</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Cursos económicos impartidos por instructores verificados. Programación, diseño, idiomas, música y mucho más.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register"><Button size="lg">Comenzar gratis</Button></Link>
                <a href="#cursos"><Button size="lg" variant="outline">Ver cursos</Button></a>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Acceso de por vida</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Precios módicos</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Instructores reales</div>
              </div>
            </div>
            <ScrollReveal>
              <div className="relative">
                <div className="grid gap-4 sm:grid-cols-2">
                  {COURSES.slice(0, 4).map((c, i) => (
                    <div key={c.id} className="rounded-2xl border bg-card p-4 shadow-sm" style={{ transform: `translateY(${i % 2 === 0 ? "-8px" : "8px"})` }}>
                      <div className="mb-3 h-20 rounded-lg" style={{ background: c.color }} />
                      <p className="text-xs text-muted-foreground">{c.category}</p>
                      <p className="text-sm font-semibold">{c.title}</p>
                      <p className="mt-2 text-sm font-medium text-primary">${c.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            { icon: BookOpen, label: "Cursos activos", value: "10+" },
            { icon: Users, label: "Estudiantes", value: "2.4k" },
            { icon: Award, label: "Instructores", value: "40+" },
            { icon: PlayCircle, label: "Horas de video", value: "180h" },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <s.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Cursos destacados</h2>
            <p className="mt-3 text-muted-foreground">Explora nuestro catálogo y comienza hoy mismo.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <ScrollReveal key={c.id} delay={(i % 3) * 100}>
              <Card className="h-full overflow-hidden transition hover:shadow-lg">
                <div className="h-32" style={{ background: c.color }} />
                <CardContent className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">{c.category} · {c.level}</p>
                  <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Por {c.instructor}</span>
                    <span className="text-lg font-bold text-primary">${c.price}</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Instructor Pro */}
      <section className="bg-gradient-to-br from-primary/10 via-brand-soft/40 to-accent/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" /> Instructor Pro
                </span>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">¿Eres maestro? Comparte tu conocimiento.</h2>
                <p className="mt-3 text-muted-foreground">
                  Regístrate como instructor y accede al plan Pro para crear cursos ilimitados, definir tus precios y diseñar tu espacio a tu manera.
                </p>
                <Link to="/register"><Button size="lg" className="mt-6">Ser instructor</Button></Link>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Plan Pro</p>
                <p className="mt-1 text-4xl font-bold">$9.99 <span className="text-base font-normal text-muted-foreground">/ mes</span></p>
                <ul className="mt-5 space-y-3 text-sm">
                  {["Cursos ilimitados", "Editor libre de tu espacio", "Define tu propio precio", "Estadísticas de estudiantes", "Insignia verificada"].map(f => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} El Saber HN — Aprende sin límites.
        </div>
      </footer>
    </div>
  );
}
