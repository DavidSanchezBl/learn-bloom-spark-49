export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  price: number; // en Lempiras (L.)
  hours: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  description: string;
  icon: string; // font-awesome-ish key mapped in UI
  tag?: string;
  rating?: number;
}

export const COURSES: Course[] = [
  { id: 1, title: "Inglés para call centers", category: "Idiomas", instructor: "María F.", price: 350, hours: 16, level: "Intermedio", description: "Domina el inglés conversacional con enfoque en atención al cliente.", icon: "headset", tag: "Más popular", rating: 4.9 },
  { id: 2, title: "Reparación de celulares", category: "Oficio técnico", instructor: "Carlos R.", price: 280, hours: 12, level: "Principiante", description: "Aprende a diagnosticar y reparar fallas comunes en smartphones.", icon: "tools", tag: "Oficio técnico", rating: 4.8 },
  { id: 3, title: "Matemáticas para ingeniería", category: "Nivelación", instructor: "Laura G.", price: 320, hours: 20, level: "Intermedio", description: "Refuerza tus bases matemáticas con ejercicios prácticos.", icon: "chart", tag: "Nivelación", rating: 4.7 },
  { id: 4, title: "Diseño gráfico con Canva", category: "Diseño", instructor: "Diego M.", price: 220, hours: 10, level: "Principiante", description: "Crea piezas visuales profesionales sin experiencia previa.", icon: "brush", rating: 4.8 },
  { id: 5, title: "Introducción a Python", category: "Programación", instructor: "Ana Reyes", price: 400, hours: 18, level: "Principiante", description: "Domina los fundamentos de Python con proyectos reales.", icon: "code", rating: 4.9 },
  { id: 6, title: "Excel avanzado y dashboards", category: "Productividad", instructor: "Roberto C.", price: 260, hours: 12, level: "Avanzado", description: "Fórmulas, tablas dinámicas y visualización de datos.", icon: "calculator", rating: 4.7 },
  { id: 7, title: "Marketing digital 360°", category: "Negocios", instructor: "Lucía Paredes", price: 480, hours: 22, level: "Intermedio", description: "Estrategias de redes, SEO y publicidad paga.", icon: "chart", rating: 4.6 },
  { id: 8, title: "Fotografía con celular", category: "Arte", instructor: "Diego Fuentes", price: 200, hours: 8, level: "Principiante", description: "Toma fotos profesionales usando solo tu smartphone.", icon: "brush", rating: 4.8 },
  { id: 9, title: "Guitarra desde cero", category: "Música", instructor: "Sofía Ramírez", price: 240, hours: 14, level: "Principiante", description: "Aprende acordes y tus primeras canciones.", icon: "brush", rating: 4.7 },
  { id: 10, title: "Finanzas personales", category: "Negocios", instructor: "Patricia Solís", price: 300, hours: 9, level: "Principiante", description: "Presupuesto, ahorro e inversión desde cero.", icon: "chart", rating: 4.9 },
];

export const PRO_PRICE_LEMPIRAS = 250;

export function formatL(v: number): string {
  return `L. ${v.toLocaleString("es-HN", { maximumFractionDigits: 0 })}`;
}
