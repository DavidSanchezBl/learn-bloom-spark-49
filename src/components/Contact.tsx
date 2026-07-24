import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button, Section, SectionHeading } from "./ui";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contacto">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contacto"
            title="¿Tienes preguntas? Escríbenos"
            subtitle="Nuestro equipo te responderá en menos de 24 horas."
          />
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Correo</p>
                <p className="text-sm text-muted-foreground">hola@eduprix.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Teléfono</p>
                <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Oficina</p>
                <p className="text-sm text-muted-foreground">Ciudad de México, México</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
                <Send className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">¡Mensaje enviado!</h3>
              <p className="mt-1 text-sm text-muted-foreground">Te contactaremos muy pronto.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre</label>
                <input
                  required
                  className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Correo</label>
                <input
                  required
                  type="email"
                  className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4" /> Enviar mensaje
              </Button>
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}
