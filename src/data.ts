export type Instructor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  tag?: "Nuevo" | "Destacado" | "Bestseller";
  description: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const instructors: Instructor[] = [
  {
    id: "i1",
    name: "María González",
    role: "Desarrolladora Full Stack",
    bio: "Ingeniera de software con más de 10 años de experiencia construyendo aplicaciones web a gran escala. Apasionada por enseñar código limpio y accesible.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 4.9,
    students: 12480,
    courses: 8,
  },
  {
    id: "i2",
    name: "Carlos Méndez",
    role: "Diseñador UX/UI",
    bio: "Diseñador de producto especializado en interfaces accesibles. Ha trabajado con startups y empresas Fortune 500 liderando equipos de diseño.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 4.8,
    students: 8930,
    courses: 6,
  },
  {
    id: "i3",
    name: "Lucía Ramírez",
    role: "Especialista en Marketing Digital",
    bio: "Consultora de marketing con experiencia en campañas para más de 50 marcas. Enfocada en estrategia de contenido y crecimiento orgánico.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 4.7,
    students: 15600,
    courses: 12,
  },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "Desarrollo Web Full Stack con React",
    instructor: "María González",
    instructorId: "i1",
    category: "Programación",
    level: "Intermedio",
    price: 199,
    originalPrice: 349,
    rating: 4.9,
    reviews: 1240,
    students: 8420,
    duration: "32 h",
    lessons: 48,
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Bestseller",
    description: "Aprende a construir aplicaciones modernas de principio a fin con React, Node y bases de datos SQL.",
  },
  {
    id: "c2",
    title: "Diseño de Interfaces Accesibles",
    instructor: "Carlos Méndez",
    instructorId: "i2",
    category: "Diseño",
    level: "Principiante",
    price: 149,
    originalPrice: 249,
    rating: 4.8,
    reviews: 860,
    students: 5210,
    duration: "18 h",
    lessons: 32,
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Nuevo",
    description: "Crea productos digitales que todos pueden usar. WCAG, componentes y patrones de accesibilidad.",
  },
  {
    id: "c3",
    title: "Marketing de Contenido para Crecer",
    instructor: "Lucía Ramírez",
    instructorId: "i3",
    category: "Marketing",
    level: "Intermedio",
    price: 179,
    rating: 4.7,
    reviews: 640,
    students: 7100,
    duration: "24 h",
    lessons: 36,
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Destacado",
    description: "Estrategia de contenido, SEO y redes sociales para atraer y convertir a tu audiencia ideal.",
  },
  {
    id: "c4",
    title: "JavaScript Moderno: ES6 y más allá",
    instructor: "María González",
    instructorId: "i1",
    category: "Programación",
    level: "Principiante",
    price: 129,
    originalPrice: 199,
    rating: 4.8,
    reviews: 980,
    students: 11200,
    duration: "20 h",
    lessons: 30,
    image: "https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Domina JavaScript moderno: async/await, módulos, tooling y buenas prácticas de código.",
  },
  {
    id: "c5",
    title: "Figma para Equipos de Producto",
    instructor: "Carlos Méndez",
    instructorId: "i2",
    category: "Diseño",
    level: "Avanzado",
    price: 219,
    rating: 4.9,
    reviews: 420,
    students: 3180,
    duration: "16 h",
    lessons: 28,
    image: "https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Destacado",
    description: "Sistemas de diseño, auto-layout, prototipado avanzado y colaboración en tiempo real.",
  },
  {
    id: "c6",
    title: "Email Marketing que Convierte",
    instructor: "Lucía Ramírez",
    instructorId: "i3",
    category: "Marketing",
    level: "Avanzado",
    price: 159,
    originalPrice: 259,
    rating: 4.6,
    reviews: 380,
    students: 4200,
    duration: "12 h",
    lessons: 22,
    image: "https://images.pexels.com/photos/270700/pexels-photo-270700.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Nuevo",
    description: "Automatización, segmentación y copywriting para campañas de email con resultados medibles.",
  },
];

export const pricingPlans: Plan[] = [
  {
    id: "free",
    name: "Estudiante",
    price: 0,
    period: "para siempre",
    description: "Explora la plataforma y accede a contenido gratuito.",
    features: [
      "Acceso a cursos gratuitos",
      "Foros de la comunidad",
      "Certificados de finalización",
      "Soporte por correo",
    ],
    cta: "Empezar gratis",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "/mes",
    description: "Acceso completo a todos los cursos y funciones premium.",
    features: [
      "Catálogo completo de cursos",
      "Certificados verificados",
      "Descargas offline",
      "Soporte prioritario",
      "Mentorías grupales",
    ],
    cta: "Probar 7 días gratis",
    featured: true,
  },
  {
    id: "teams",
    name: "Equipos",
    price: 49,
    period: "/mes",
    description: "Para empresas que quieren capacitar a su equipo.",
    features: [
      "Todo lo de Pro",
      "Hasta 20 miembros",
      "Panel de administración",
      "Reportes de progreso",
      "Soporte dedicado",
    ],
    cta: "Hablar con ventas",
  },
];

export const stats = [
  { label: "Estudiantes activos", value: "85K+" },
  { label: "Cursos disponibles", value: "1,200+" },
  { label: "Instructores expertos", value: "320+" },
  { label: "Tasa de satisfacción", value: "97%" },
];

export const alliances = [
  "Google",
  "Microsoft",
  "Amazon",
  "Spotify",
  "Airbnb",
  "Stripe",
  "Notion",
  "Figma",
];

export const testimonials = [
  {
    name: "Ana Torres",
    role: "Frontend Developer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120",
    text: "Cambié de carrera gracias a los cursos de EduPrix. En seis meses pasé de cero a mi primer trabajo como desarrolladora.",
    rating: 5,
  },
  {
    name: "Diego Herrera",
    role: "Product Designer",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=120",
    text: "La calidad de los instructores es excelente. Aprendí patrones de diseño que aplico cada día en mi trabajo.",
    rating: 5,
  },
  {
    name: "Sofía Castro",
    role: "Marketing Lead",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120",
    text: "Los cursos de marketing me dieron herramientas prácticas. Triplicamos el tráfico orgánico en tres meses.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "¿Necesito conocimientos previos para empezar?",
    a: "No. Tenemos cursos desde nivel principiante que no requieren experiencia. Cada curso indica su nivel recomendado.",
  },
  {
    q: "¿Puedo acceder a los cursos en cualquier momento?",
    a: "Sí. Todos los cursos están disponibles 24/7. Con el plan Pro también puedes descargar contenido para verlo sin conexión.",
  },
  {
    q: "¿Los certificados son válidos?",
    a: "Nuestros certificados son verificados y reconocidos por empresas asociadas. Puedes compartirlos en LinkedIn y tu CV.",
  },
  {
    q: "¿Cómo funciona la garantía de devolución?",
    a: "Tienes 30 días para solicitar un reembolso completo si el curso no cumple tus expectativas, sin preguntas.",
  },
];

export const blogPosts = [
  {
    id: "b1",
    title: "5 tendencias de desarrollo web en 2026",
    excerpt: "Las tecnologías que dominarán el desarrollo frontend y backend este año.",
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "15 Jul 2026",
    category: "Programación",
  },
  {
    id: "b2",
    title: "Cómo diseñar productos accesibles desde el inicio",
    excerpt: "Guía práctica para integrar accesibilidad en tu proceso de diseño.",
    image: "https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "10 Jul 2026",
    category: "Diseño",
  },
  {
    id: "b3",
    title: "SEO para contenido: la guía completa",
    excerpt: "Aprende a posicionar tu contenido en buscadores con estrategia.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "3 Jul 2026",
    category: "Marketing",
  },
];

export const formatPrice = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
