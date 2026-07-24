import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Explore } from "./components/Explore";
import { CoursesPage } from "./components/CoursesPage";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { ForInstructors } from "./components/ForInstructors";
import { Alliances } from "./components/Alliances";
import { Blog } from "./components/Blog";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { InstructorModal } from "./components/InstructorModal";
import { CourseCard } from "./components/CourseCard";
import { CartProvider, useCart } from "./cart";
import { courses, instructors, type Course, type Instructor } from "./data";

function PageInner() {
  const { add } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeInstructor, setActiveInstructor] = useState<Instructor | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const handleEnroll = (course: Course) => add(course);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero onExplore={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })} />
        <Stats />
        <Alliances />
        <About />
        <HowItWorks />
        <Explore />
        <section id="cursos" className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Catálogo</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Cursos destacados
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
                onInstructor={(id) => {
                  const inst = instructors.find(i => i.id === id);
                  if (inst) setActiveInstructor(inst);
                }}
                onDetails={() => setActiveCourse(course)}
              />
            ))}
          </div>
        </section>
        <Pricing />
        <Testimonials />
        <ForInstructors />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <InstructorModal instructor={activeInstructor} onClose={() => setActiveInstructor(null)} />
      <InstructorModal
        instructor={activeCourse ? instructors.find(i => i.id === activeCourse.instructorId) ?? null : null}
        onClose={() => setActiveCourse(null)}
      />
    </div>
  );
}

export default function Page() {
  return (
    <CartProvider>
      <PageInner />
    </CartProvider>
  );
}
