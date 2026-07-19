export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  price: number;
  hours: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  description: string;
  color: string;
}

export const COURSES: Course[] = [
  { id: 1, title: "Introducción a Python", category: "Programación", instructor: "Ana Reyes", price: 12.99, hours: 14, level: "Principiante", description: "Domina los fundamentos de Python con proyectos reales.", color: "oklch(0.85 0.08 220)" },
  { id: 2, title: "Diseño UI/UX con Figma", category: "Diseño", instructor: "Carlos Mendoza", price: 15.5, hours: 18, level: "Intermedio", description: "Crea interfaces modernas y prototipos interactivos.", color: "oklch(0.86 0.09 320)" },
  { id: 3, title: "Marketing Digital 360°", category: "Negocios", instructor: "Lucía Paredes", price: 18.0, hours: 22, level: "Intermedio", description: "Estrategias de redes, SEO y publicidad paga.", color: "oklch(0.88 0.09 80)" },
  { id: 4, title: "Fotografía con Celular", category: "Arte", instructor: "Diego Fuentes", price: 9.99, hours: 8, level: "Principiante", description: "Toma fotos profesionales usando solo tu smartphone.", color: "oklch(0.86 0.08 40)" },
  { id: 5, title: "Inglés Conversacional B1", category: "Idiomas", instructor: "Maria López", price: 14.75, hours: 30, level: "Intermedio", description: "Fluidez real para conversaciones cotidianas.", color: "oklch(0.87 0.08 160)" },
  { id: 6, title: "Excel Avanzado y Dashboards", category: "Productividad", instructor: "Roberto Cáceres", price: 11.5, hours: 12, level: "Avanzado", description: "Fórmulas, tablas dinámicas y visualización de datos.", color: "oklch(0.87 0.08 140)" },
  { id: 7, title: "Guitarra desde Cero", category: "Música", instructor: "Sofía Ramírez", price: 10.99, hours: 20, level: "Principiante", description: "Aprende acordes y tus primeras canciones.", color: "oklch(0.87 0.09 20)" },
  { id: 8, title: "Cocina Saludable", category: "Estilo de Vida", instructor: "Chef Julio Mora", price: 8.99, hours: 10, level: "Principiante", description: "Recetas rápidas, nutritivas y económicas.", color: "oklch(0.88 0.08 110)" },
  { id: 9, title: "React y TypeScript Moderno", category: "Programación", instructor: "Andrés Núñez", price: 19.99, hours: 26, level: "Avanzado", description: "Construye apps SPA con hooks, routing y estado global.", color: "oklch(0.85 0.09 260)" },
  { id: 10, title: "Finanzas Personales Inteligentes", category: "Negocios", instructor: "Patricia Solís", price: 13.5, hours: 9, level: "Principiante", description: "Presupuesto, ahorro e inversión desde cero.", color: "oklch(0.88 0.08 200)" },
];
