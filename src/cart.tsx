import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Course } from "./data";

export type CartItem = Course & { qty: number };

type CartCtx = {
  items: CartItem[];
  open: boolean;
  add: (course: Course) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (course: Course) => {
    setItems(prev => {
      if (prev.some(i => i.id === course.id)) return prev;
      return [...prev, { ...course, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const clear = () => setItems([]);

  const count = items.length;
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  return (
    <Ctx.Provider value={{ items, open, add, remove, clear, setOpen, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
