import { useEffect, useState } from "react";
import { X, Check, CreditCard, Lock } from "lucide-react";
import { useCart } from "../cart";
import { formatPrice } from "../data";

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, clear } = useCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setDone(false);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clear();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-semibold text-foreground">Finalizar compra</h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">¡Pago completado!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ya tienes acceso a tus cursos. Te enviamos los detalles por correo.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Empezar a aprender
            </button>
          </div>
        ) : (
          <div className="px-6 py-5">
            <div className="mb-5 rounded-xl bg-secondary/50 p-4">
              <p className="text-sm font-medium text-foreground">Resumen del pedido</p>
              <div className="mt-3 space-y-2">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1 text-muted-foreground">{i.title}</span>
                    <span className="font-medium text-foreground">{formatPrice(i.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-bold text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre en la tarjeta</label>
                <input
                  required
                  placeholder="Como aparece en la tarjeta"
                  className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Número de tarjeta</label>
                <div className="relative mt-1.5">
                  <input
                    required
                    placeholder="1234 5678 9012 3456"
                    className="h-11 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Vencimiento</label>
                  <input
                    required
                    placeholder="MM/AA"
                    className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">CVV</label>
                  <input
                    required
                    placeholder="123"
                    className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Lock className="h-4 w-4" /> Pagar {formatPrice(total)}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Pago seguro encriptado. No guardamos tus datos de tarjeta.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
