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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAuth, type CustomCourse } from "@/lib/auth";
import { COURSES, formatL, type Course } from "@/lib/courses";
import { Plus, Trash2, Sparkles, BookOpen, GraduationCap, UserCircle2, Check, Clock, CalendarClock, Users, Star, PlayCircle, FileText, LogOut } from "lucide-react";

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
            <TabsTrigger value="profile"><UserCircle2 className="mr-2 h-4 w-4" />Mi perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="mt-6"><ExploreTab /></TabsContent>
          <TabsContent value="learning" className="mt-6"><LearningTab /></TabsContent>
          {isInstructor && <TabsContent value="teach" className="mt-6"><TeachTab /></TabsContent>}
          <TabsContent value="profile" className="mt-6"><ProfileTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ExploreTab() {
  const { enrolledIds } = useAuth();
  const [selected, setSelected] = useState<Course | null>(null);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map(c => {
          const enrolled = enrolledIds.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c)}
              className="group text-left"
            >
              <Card className="h-full overflow-hidden transition group-hover:shadow-md group-hover:-translate-y-0.5">
                <div className="grid h-28 place-items-center" style={{ background: "var(--brand-soft)", color: "var(--primary)" }}>
                  <GraduationCap className="h-8 w-8" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{c.category} · {c.level}</p>
                    {c.rating && (
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Star className="h-3 w-3 fill-current" />{c.rating}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-semibold">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Por {c.instructor}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{c.hours} h</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="h-3 w-3" />
                      {c.flexible ? "Horarios flexibles" : c.schedule}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatL(c.price)}</span>
                    <span className="text-xs font-medium text-primary">
                      {enrolled ? "Inscrito ✓" : "Ver detalles →"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
      <CourseDialog course={selected} open={!!selected} onOpenChange={o => !o && setSelected(null)} mode="preview" />
    </>
  );
}

function LearningTab() {
  const { enrolledIds } = useAuth();
  const [selected, setSelected] = useState<Course | null>(null);
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
    <>
      <div className="grid gap-4">
        {mine.map(c => (
          <Card key={c.id}>
            <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg text-primary" style={{ background: "var(--brand-soft)" }}>
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{c.category} · {c.flexible ? "Horarios flexibles" : c.schedule}</p>
                <p className="truncate font-semibold">{c.title}</p>
                <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${25 + (c.id * 7) % 60}%` }} />
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setSelected(c)}>Continuar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <CourseDialog course={selected} open={!!selected} onOpenChange={o => !o && setSelected(null)} mode="enrolled" />
    </>
  );
}

function CourseDialog({
  course, open, onOpenChange, mode,
}: {
  course: Course | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  mode: "preview" | "enrolled";
}) {
  const { enrolledIds, enroll, unenroll } = useAuth();
  const [confirmLeave, setConfirmLeave] = useState(false);
  if (!course) return null;
  const isEnrolled = enrolledIds.includes(course.id);
  const showEnrolledView = mode === "enrolled" || isEnrolled;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              {course.flexible && <Badge className="bg-amber-500 text-white hover:bg-amber-500">Horarios flexibles</Badge>}
              {course.tag && <Badge>{course.tag}</Badge>}
            </div>
            <DialogTitle className="mt-2 text-2xl">{course.title}</DialogTitle>
            <DialogDescription>Por {course.instructor} · {course.instructorBio}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm sm:grid-cols-4">
            <InfoCell icon={<Clock className="h-4 w-4" />} label="Duración" value={`${course.hours} h`} />
            <InfoCell icon={<CalendarClock className="h-4 w-4" />} label="Horario" value={course.flexible ? "Flexible" : course.schedule} />
            <InfoCell icon={<Users className="h-4 w-4" />} label="Estudiantes" value={`${course.students}`} />
            <InfoCell icon={<Star className="h-4 w-4" />} label="Rating" value={`${course.rating ?? "—"}`} />
          </div>

          {!showEnrolledView ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.longDescription}</p>
              <div>
                <h4 className="text-sm font-semibold">Lo que aprenderás</h4>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {course.learnings.map(l => (
                    <li key={l} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Requisitos</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {course.requirements.map(r => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <DialogFooter className="gap-2 sm:justify-between">
                <span className="text-2xl font-bold text-primary">{formatL(course.price)}</span>
                <Button
                  onClick={() => { enroll(course.id); onOpenChange(false); }}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "Ya inscrito" : "Inscribirme ahora"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <Tabs defaultValue="content" className="mt-2">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="content"><PlayCircle className="mr-1.5 h-4 w-4" />Contenido</TabsTrigger>
                <TabsTrigger value="videos"><PlayCircle className="mr-1.5 h-4 w-4" />Videos</TabsTrigger>
                <TabsTrigger value="tasks"><FileText className="mr-1.5 h-4 w-4" />Tareas</TabsTrigger>
                <TabsTrigger value="about">Info</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-4 space-y-2">
                {course.lessons.map((l, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.duration}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Ver</Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="videos" className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.lessons.map((l, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border">
                    <div className="grid aspect-video place-items-center bg-muted text-primary">
                      <PlayCircle className="h-10 w-10" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.duration}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="mt-4 space-y-3">
                {course.tasks.map((t, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{t.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">Entrega en {t.dueInDays}d</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">Entregar tarea</Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="about" className="mt-4 space-y-3 text-sm">
                <p className="text-muted-foreground">{course.longDescription}</p>
                <div>
                  <h4 className="font-semibold">Instructor</h4>
                  <p className="text-muted-foreground">{course.instructor} — {course.instructorBio}</p>
                </div>
              </TabsContent>

              <DialogFooter className="mt-4">
                <Button variant="destructive" onClick={() => setConfirmLeave(true)}>
                  <LogOut className="mr-2 h-4 w-4" />Darme de baja del curso
                </Button>
              </DialogFooter>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmLeave} onOpenChange={setConfirmLeave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de darte de baja del curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Perderás el acceso a los contenidos, videos y tareas de <strong>{course.title}</strong>. Puedes volver a inscribirte cuando quieras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { unenroll(course.id); setConfirmLeave(false); onOpenChange(false); }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, darme de baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs text-muted-foreground">{icon}{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
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
              <Button size="sm" className="mt-3" onClick={upgradeToPro}>Activar Pro {formatL(250)}/mes</Button>
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
                <Label>Precio (Lempiras)</Label>
                <Input type="number" step="1" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="L. 250" />
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
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md text-primary" style={{ background: c.color }}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                    <p className="truncate font-medium">{c.title}</p>
                    <p className="text-sm font-semibold text-primary">{formatL(c.price)}</p>
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

function ProfileTab() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [age, setAge] = useState(String(user?.age ?? ""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const trimmed = fullName.trim();
    if (trimmed.length < 3 || trimmed.length > 60) {
      setError("El nombre debe tener entre 3 y 60 caracteres.");
      return;
    }
    const ageNum = parseInt(age, 10);
    if (Number.isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      setError("La edad debe estar entre 10 y 100 años.");
      return;
    }
    if (password.length > 0) {
      if (password.length < 6 || password.length > 40) {
        setError("La contraseña debe tener entre 6 y 40 caracteres.");
        return;
      }
      if (password !== confirm) {
        setError("Las contraseñas no coinciden.");
        return;
      }
    }
    const res = updateProfile({
      fullName: trimmed,
      age: ageNum,
      password: password || undefined,
    });
    if (!res.ok) {
      setError(res.error ?? "No se pudo actualizar el perfil.");
      return;
    }
    setPassword("");
    setConfirm("");
    setSaved(true);
  };

  const roleLabel =
    user.role === "instructor_pro" ? "Instructor Pro" : user.role === "instructor" ? "Instructor" : "Estudiante";

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <Card className="lg:w-72">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <div
            className="grid h-20 w-20 place-items-center rounded-full text-primary"
            style={{ background: "var(--brand-soft)" }}
          >
            <UserCircle2 className="h-10 w-10" />
          </div>
          <div>
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant="secondary">{roleLabel}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Editar mi perfil</h2>
          <p className="text-sm text-muted-foreground">Actualiza tu información personal cuando lo necesites.</p>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label>Correo electrónico</Label>
              <Input value={user.email} disabled />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Nombre completo</Label>
                <Input value={fullName} onChange={e => setFullName(e.target.value)} maxLength={60} />
              </div>
              <div className="space-y-1.5">
                <Label>Edad</Label>
                <Input type="number" min={10} max={100} value={age} onChange={e => setAge(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Nueva contraseña</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} maxLength={40} placeholder="Dejar vacío para no cambiar" />
              </div>
              <div className="space-y-1.5">
                <Label>Confirmar contraseña</Label>
                <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} maxLength={40} />
              </div>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            {saved && (
              <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                <Check className="h-4 w-4" /> Perfil actualizado correctamente.
              </p>
            )}
            <Button type="submit">Guardar cambios</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
