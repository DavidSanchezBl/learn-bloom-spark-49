import { ShoppingBag, Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui";
import { useCart } from "../cart";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cursos", href: "#cursos" },
  { label: "Precios", href: "#precios" },
  { label: "Para instructores", href: "#instructores" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-2 font-bold text-primary">
          <GraduationCap className="h-7 w-7" />
          <span className="text-lg">EduPrix</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">Iniciar sesión</Button>
          <Button size="sm" className="hidden sm:inline-flex">Registrarse</Button>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Iniciar sesión</Button>
              <Button size="sm" className="flex-1">Registrarse</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
