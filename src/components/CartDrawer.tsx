import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "../cart";
import { formatPrice } from "../data";

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { items, open, setOpen, remove, total, count } = useCart();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Tu carrito ({count})</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 font-medium text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">Agrega cursos para inscribirte.</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Explorar cursos
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-3 rounded-xl border border-border p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.instructor}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">{formatPrice(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Ir a pagar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
