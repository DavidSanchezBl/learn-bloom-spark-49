import { GraduationCap, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const columns = [
  { title: "Plataforma", links: ["Cursos", "Precios", "Para instructores", "Blog"] },
  { title: "Empresa", links: ["Acerca de", "Carreras", "Contacto", "Prensa"] },
  { title: "Soporte", links: ["Centro de ayuda", "FAQ", "Términos", "Privacidad"] },
];

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#inicio" className="flex items-center gap-2 font-bold text-primary">
              <GraduationCap className="h-7 w-7" />
              <span className="text-lg">EduPrix</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Plataforma de aprendizaje online donde instructores comparten conocimiento y estudiantes
              transforman sus carreras.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 EduPrix. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
