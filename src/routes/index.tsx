import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { COURSES, formatL, PRO_PRICE_LEMPIRAS } from "@/lib/courses";
import {
  Rocket, PlayCircle, UserPlus, Search, Handshake, CheckCircle2, GraduationCap,
  Headphones, Wrench, LineChart, Palette, Zap, Clock, Users, Tag, Star, Crown, Gift, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function iconFor(key: string) {
  const cls = "h-10 w-10";
  switch (key) {
    case "headset": return <Headphones className={cls} />;
    case "tools": return <Wrench className={cls} />;
    case "chart": return <LineChart className={cls} />;
    case "brush": return <Palette className={cls} />;
    default: return <GraduationCap className={cls} />;
  }
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24"
        style={{ background: "linear-gradient(165deg, #ffffff 0%, #e8edf5 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,132,110,0.10) 0%, transparent 70%)" }} />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Aprende con <span style={{ color: "var(--accent)" }}>expertos locales</span> que entienden tu realidad
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              El Saber HN conecta estudiantes con instructores verificados de Honduras. Clases virtuales o presenciales, pagos en lempiras y horarios flexibles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8">
                  <Rocket className="mr-2 h-4 w-4" /> Empieza ahora
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="rounded-full border-2 px-8">
                  <PlayCircle className="mr-2 h-4 w-4" /> Cómo funciona
                </Button>
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-10">
              {[
                { n: "2,093", l: "estudiantes activos" },
                { n: "+120", l: "instructores verificados" },
                { n: "4.9★", l: "calificación promedio" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-primary sm:text-3xl">{s.n}</p>
                  <p className="text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-2xl border bg-card p-7 shadow-xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-13 w-13 place-items-center rounded-full bg-secondary text-primary" style={{ height: 52, width: 52 }}>
                    <span className="text-lg font-bold">MF</span>
                  </div>
                  <div>
                    <p className="font-semibold">María Fernández</p>
                    <p className="text-xs text-muted-foreground">Instructora de inglés · 4.9★</p>
                  </div>
                </div>
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "var(--accent-warm)", color: "var(--accent)" }}>
                  En vivo · Hoy 7pm
                </span>
                <p className="mt-3 text-base font-semibold">Inglés conversacional para call centers</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 8 sesiones</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 14 alumnos</span>
                  <span className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> {formatL(350)}</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 hidden items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-md sm:flex">
                <Zap className="h-4 w-4" style={{ color: "var(--accent)" }} />
                <span className="text-sm font-medium">+20 cursos nuevos esta semana</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">¿Cómo funciona El Saber HN?</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tres pasos simples para empezar a aprender o enseñar</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: UserPlus, t: "1. Regístrate gratis", d: "Crea tu perfil como estudiante o instructor. Sin compromiso, solo unos minutos." },
              { icon: Search, t: "2. Encuentra o publica", d: "Busca cursos por categoría, o publica tu clase y recibe alumnos." },
              { icon: Handshake, t: "3. Aprende y enseña", d: "Clases en vivo, presenciales o grabadas. Paga en lempiras con total seguridad." },
            ].map((s, i) => (
              <ScrollReveal key={s.t} delay={i * 100}>
                <div className="rounded-2xl border border-transparent bg-muted/60 p-8 text-center transition hover:-translate-y-1.5 hover:border-border hover:shadow-md">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-primary">{s.t}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTORES */}
      <section id="instructores" className="py-20" style={{ background: "var(--brand-soft)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h3 className="text-3xl font-bold text-primary">Convierte tu conocimiento en ingresos</h3>
            <p className="mt-4 text-muted-foreground">
              El Saber HN te da la vitrina que necesitas. Sin inversión en infraestructura, solo tu talento y ganas de enseñar.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Perfil verificado con reseñas reales",
                "Pagos en lempiras, comisión solo del 20%",
                "Clases virtuales o presenciales, tú decides",
                "Estadísticas y herramientas para crecer",
              ].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent)" }} /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register">
              <Button size="lg" className="mt-8 rounded-full px-8">Registrarme como instructor</Button>
            </Link>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border bg-card p-9 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <span className="inline-block rounded-full px-4 py-1 text-[11px] font-bold tracking-wider text-white"
                style={{ background: "var(--accent)" }}>
                MÁS VISIBILIDAD
              </span>
              <h4 className="mt-3 text-2xl font-bold text-primary">Instructor Pro</h4>
              <p className="mt-2 text-3xl font-bold text-primary">
                {formatL(PRO_PRICE_LEMPIRAS)} <span className="text-base font-normal text-muted-foreground">/ mes</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Destaca entre los demás y accede a herramientas premium</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Prioridad en búsquedas", "Videos pregrabados ilimitados", "Estadísticas detalladas de alumnos", 'Insignia "Pro" en tu perfil', "Soporte prioritario"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent)" }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button className="mt-6 w-full rounded-full">
                  <Crown className="mr-2 h-4 w-4" /> Activar Pro
                </Button>
              </Link>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Gift className="h-3.5 w-3.5" /> Primeros 3 meses gratis
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" className="py-20" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Cursos destacados</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Lo que más están aprendiendo los estudiantes de El Saber HN</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c, i) => (
              <ScrollReveal key={c.id} delay={(i % 3) * 100}>
                <div className="group h-full overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
                  <div className="grid h-40 place-items-center text-primary" style={{ background: "var(--brand-soft)" }}>
                    {iconFor(c.icon)}
                  </div>
                  <div className="p-6">
                    {c.tag && (
                      <span className="inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold"
                        style={{ background: "var(--accent-warm)", color: "var(--accent)" }}>
                        {c.tag}
                      </span>
                    )}
                    <h4 className="mt-2 text-lg font-semibold text-primary">{c.title}</h4>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>Por {c.instructor}</span>
                      {c.rating && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-current" style={{ color: "#f5b342" }} /> {c.rating}
                        </span>
                      )}
                      <span className="font-bold text-primary">{formatL(c.price)}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center text-white" style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para empezar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Únete a El Saber HN hoy y forma parte de la comunidad educativa que está transformando Honduras.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="rounded-full bg-white px-8 text-primary hover:bg-white/90">
                  <UserPlus className="mr-2 h-4 w-4" /> Soy estudiante
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8 text-white hover:opacity-90"
                  style={{ background: "var(--accent)" }}>
                  <GraduationCap className="mr-2 h-4 w-4" /> Soy instructor
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} El Saber HN · Aprende sin límites.</span>
          <a href="#inicio" className="inline-flex items-center gap-1 text-primary hover:opacity-80">
            Volver arriba <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </footer>
    </div>
  );
}
