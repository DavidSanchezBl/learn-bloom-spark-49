import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth, type CustomCourse } from "@/lib/auth";
import { COURSES } from "@/lib/courses";
import { Plus, Trash2, Sparkles, BookOpen, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  const isInstructor = user.role === "instructor" || user.role === "instructor_pro";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">Hola, {user.fullName.split(" ")[0]} 👋</h1>
            <p className="text-sm text-muted-foreground">Continúa tu camino de aprendizaje.</p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {user.role === "instructor_pro" ? "Instructor Pro" : user.role === "instructor" ? "Instructor" : "Estudiante"}
          </Badge>
        </header>

        <Tabs defaultValue="explore" className="mt-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="explore"><BookOpen className="mr-2 h-4 w-4" />Explorar cursos</TabsTrigger>
            <TabsTrigger value="learning"><GraduationCap className="mr-2 h-4 w-4" />Mis aprendizajes</TabsTrigger>
            {isInstructor && <TabsTrigger value="teach"><Sparkles className="mr-2 h-4 w-4" />Mi espacio</TabsTrigger>}
          </TabsList>

          <TabsContent value="explore" className="mt-6"><ExploreTab /></TabsContent>
          <TabsContent value="learning" className="mt-6"><LearningTab /></TabsContent>
          {isInstructor && <TabsContent value="teach" className="mt-6"><TeachTab /></TabsContent>}
        </Tabs>
      </div>
    </div>
  );
}

function ExploreTab() {
  const { enroll, enrolledIds } = useAuth();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {COURSES.map(c => {
        const enrolled = enrolledIds.includes(c.id);
        return (
          <Card key={c.id} className="overflow-hidden transition hover:shadow-md">
            <div className="grid h-28 place-items-center" style={{ background: "var(--brand-soft)", color: "var(--primary)" }}>
              <GraduationCap className="h-8 w-8" />
            </div>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{c.category} · {c.level}</p>
              <h3 className="mt-1 font-semibold">{c.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{formatL(c.price)}</span>
                <Button size="sm" disabled={enrolled} onClick={() => enroll(c.id)}>
                  {enrolled ? "Inscrito ✓" : "Inscribirme"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function LearningTab() {
  const { enrolledIds } = useAuth();
  const mine = COURSES.filter(c => enrolledIds.includes(c.id));
  if (mine.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-medium">Aún no tienes cursos</p>
        <p className="text-sm text-muted-foreground">Explora el catálogo e inscríbete para verlos aquí.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4">
      {mine.map(c => (
        <Card key={c.id}>
          <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
            <div className="h-14 w-14 shrink-0 rounded-lg" style={{ background: c.color }} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{c.category}</p>
              <p className="truncate font-semibold">{c.title}</p>
              <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${25 + (c.id * 7) % 60}%` }} />
              </div>
            </div>
            <Button size="sm" variant="outline">Continuar</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeachTab() {
  const { user, upgradeToPro, customCourses, addCustomCourse, removeCustomCourse, updateCustomCourse } = useAuth();
  const isPro = user?.role === "instructor_pro";
  const [editing, setEditing] = useState<CustomCourse | null>(null);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", color: "oklch(0.86 0.09 220)" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    if (editing) {
      updateCustomCourse(editing.id, { ...form, price: parseFloat(form.price) });
      setEditing(null);
    } else {
      addCustomCourse({ ...form, price: parseFloat(form.price) });
    }
    setForm({ title: "", description: "", price: "", category: "", color: "oklch(0.86 0.09 220)" });
  };

  const startEdit = (c: CustomCourse) => {
    setEditing(c);
    setForm({ title: c.title, description: c.description, price: String(c.price), category: c.category, color: c.color });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">{editing ? "Editar curso" : "Crear nuevo curso"}</h2>
          {!isPro && (
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm font-medium">Desbloquea Instructor Pro</p>
              <p className="mt-1 text-xs text-muted-foreground">Diseña tu espacio libremente y publica cursos ilimitados.</p>
              <Button size="sm" className="mt-3" onClick={upgradeToPro}>Activar Pro $9.99/mes</Button>
            </div>
          )}
          <form onSubmit={submit} className={`mt-4 space-y-3 ${!isPro ? "opacity-60 pointer-events-none" : ""}`}>
            <div className="space-y-1.5">
              <Label>Título</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={70} />
            </div>
            <div className="space-y-1.5">
              <Label>Categoría</Label>
              <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} maxLength={40} placeholder="Ej. Diseño" />
            </div>
            <div className="space-y-1.5">
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} maxLength={200} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Precio (USD)</Label>
                <Input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Color</Label>
                <div className="flex gap-1.5">
                  {["oklch(0.86 0.09 220)", "oklch(0.86 0.09 320)", "oklch(0.88 0.09 80)", "oklch(0.87 0.08 160)", "oklch(0.87 0.09 20)"].map(c => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                      className={`h-9 w-9 rounded-md border-2 ${form.color === c ? "border-primary" : "border-transparent"}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />{editing ? "Guardar cambios" : "Publicar curso"}
            </Button>
            {editing && <Button type="button" variant="ghost" className="w-full" onClick={() => { setEditing(null); setForm({ title: "", description: "", price: "", category: "", color: "oklch(0.86 0.09 220)" }); }}>Cancelar</Button>}
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Mis cursos publicados ({customCourses.length})</h2>
        {customCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            Aún no has publicado cursos.
          </div>
        ) : (
          <div className="grid gap-3">
            {customCourses.map(c => (
              <Card key={c.id}>
                <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4">
                  <div className="h-12 w-12 shrink-0 rounded-md" style={{ background: c.color }} />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                    <p className="truncate font-medium">{c.title}</p>
                    <p className="text-sm font-semibold text-primary">${c.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => startEdit(c)}>Editar</Button>
                    <Button size="icon" variant="ghost" onClick={() => removeCustomCourse(c.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
