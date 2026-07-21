import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { formatL, DEFAULT_CATEGORIES, type Course, type CourseLesson, type CourseTask } from "@/lib/courses";
import { Plus, Trash2, Sparkles, BookOpen, GraduationCap, UserCircle2, Check, Clock, CalendarClock, Users, Star, PlayCircle, FileText, LogOut, Search, MessageSquare, Radio, Video, Pencil, Send, X } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user } = useAuth();
  const { upsertProfile } = useStore();
  useEffect(() => {
    if (user) upsertProfile({ email: user.email, fullName: user.fullName, age: user.age, role: user.role });
  }, [user, upsertProfile]);

  if (!user) return <Navigate to="/login" />;
  const isInstructor = user.role === "instructor" || user.role === "instructor_pro";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
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
  const { user } = useAuth();
  const store = useStore();
  const [selected, setSelected] = useState<Course | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const all = store.allCourses();
  const categories = useMemo(() => {
    const s = new Set<string>([...DEFAULT_CATEGORIES, ...all.map(c => c.category)]);
    return Array.from(s).filter(Boolean);
  }, [all]);

  const filtered = all.filter(c => {
    const okCat = cat === "all" || c.category === cat;
    const okQ = !q || c.title.toLowerCase().includes(q.toLowerCase()) || c.instructor.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar curso o instructor…" className="pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="sm:w-56"><SelectValue placeholder="Categoría" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No encontramos cursos con esos filtros.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => {
            const enrolled = user ? store.isEnrolled(c.id, user.email) : false;
            const { avg, count } = store.averageRating(c.id);
            return (
              <button key={c.id} type="button" onClick={() => setSelected(c)} className="group text-left">
                <Card className="h-full overflow-hidden transition group-hover:shadow-md group-hover:-translate-y-0.5">
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{c.category} · {c.level}</p>
                      {(avg > 0 || c.rating) && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                          <Star className="h-3 w-3 fill-current" />{avg > 0 ? avg.toFixed(1) : c.rating}
                          {count > 0 && <span className="text-muted-foreground">({count})</span>}
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
      )}
      <CourseDialog course={selected} open={!!selected} onOpenChange={o => !o && setSelected(null)} />
    </>
  );
}

function LearningTab() {
  const { user } = useAuth();
  const store = useStore();
  const [selected, setSelected] = useState<Course | null>(null);
  if (!user) return null;
  const mine = store.allCourses().filter(c => store.isEnrolled(c.id, user.email));
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
              <div className="h-14 w-14 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{c.category} · {c.flexible ? "Horarios flexibles" : c.schedule}</p>
                <p className="truncate font-semibold">{c.title}</p>
                {store.live[c.id]?.active && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-600">
                    <Radio className="h-3 w-3 animate-pulse" /> Clase en vivo ahora
                  </span>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={() => setSelected(c)}>Continuar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <CourseDialog course={selected} open={!!selected} onOpenChange={o => !o && setSelected(null)} />
    </>
  );
}

function CourseDialog({ course, open, onOpenChange }: { course: Course | null; open: boolean; onOpenChange: (o: boolean) => void; }) {
  const { user } = useAuth();
  const store = useStore();
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [commentText, setCommentText] = useState("");
  if (!course || !user) return null;

  const isEnrolled = store.isEnrolled(course.id, user.email);
  const enrolledList = store.enrollments[course.id] ?? [];
  const isOwner = course.instructorEmail === user.email;
  const comments = store.comments[course.id] ?? [];
  const live = store.live[course.id];
  const { avg, count } = store.averageRating(course.id);
  const myRating = store.ratings[course.id]?.[user.email] ?? 0;

  const showEnrolledView = isEnrolled || isOwner;

  const submitComment = () => {
    const t = commentText.trim();
    if (!t) return;
    store.addComment({ courseId: course.id, email: user.email, name: user.fullName, text: t });
    setCommentText("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <div className="-m-6 mb-0 h-40 rounded-t-lg bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }} />
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              {course.flexible && <Badge className="bg-amber-500 text-white hover:bg-amber-500">Horarios flexibles</Badge>}
              {course.tag && <Badge>{course.tag}</Badge>}
              {live?.active && <Badge className="bg-red-600 text-white hover:bg-red-600"><Radio className="mr-1 h-3 w-3" />En vivo</Badge>}
            </div>
            <DialogTitle className="mt-2 text-2xl">{course.title}</DialogTitle>
            <DialogDescription>Por {course.instructor} · {course.instructorBio}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm sm:grid-cols-4">
            <InfoCell icon={<Clock className="h-4 w-4" />} label="Duración" value={`${course.hours} h`} />
            <InfoCell icon={<CalendarClock className="h-4 w-4" />} label="Horario" value={course.flexible ? "Flexible" : course.schedule} />
            <InfoCell icon={<Users className="h-4 w-4" />} label="Estudiantes" value={`${enrolledList.length || course.students}`} />
            <InfoCell icon={<Star className="h-4 w-4" />} label="Rating" value={count > 0 ? `${avg.toFixed(1)} (${count})` : `${course.rating ?? "—"}`} />
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
                <Button onClick={() => { store.enroll(course.id, user.email); }}>
                  Inscribirme ahora
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <Tabs defaultValue="content" className="mt-2">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="content"><PlayCircle className="mr-1.5 h-4 w-4" />Contenido</TabsTrigger>
                <TabsTrigger value="videos"><Video className="mr-1.5 h-4 w-4" />Videos</TabsTrigger>
                <TabsTrigger value="tasks"><FileText className="mr-1.5 h-4 w-4" />Tareas</TabsTrigger>
                <TabsTrigger value="live"><Radio className="mr-1.5 h-4 w-4" />Clase en vivo</TabsTrigger>
                <TabsTrigger value="comments"><MessageSquare className="mr-1.5 h-4 w-4" />Foro</TabsTrigger>
                <TabsTrigger value="rate"><Star className="mr-1.5 h-4 w-4" />Valoración</TabsTrigger>
                {isOwner && <TabsTrigger value="students"><Users className="mr-1.5 h-4 w-4" />Estudiantes</TabsTrigger>}
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

              <TabsContent value="live" className="mt-4">
                <LivePanel course={course} isOwner={isOwner} />
              </TabsContent>

              <TabsContent value="comments" className="mt-4 space-y-3">
                <div className="rounded-lg border p-3">
                  <Textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Escribe un comentario o pregunta…"
                    rows={2}
                    maxLength={500}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={submitComment}><Send className="mr-1.5 h-3.5 w-3.5" />Publicar</Button>
                  </div>
                </div>
                {comments.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">Sé el primero en comentar.</p>
                )}
                {comments.slice().reverse().map(c => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">{c.name} {c.email === course.instructorEmail && <Badge variant="secondary" className="ml-1">Instructor</Badge>}</p>
                        <p className="text-xs text-muted-foreground">{new Date(c.at).toLocaleString("es-HN")}</p>
                      </div>
                      {(isOwner || c.email === user.email) && (
                        <Button size="icon" variant="ghost" onClick={() => store.removeComment(course.id, c.id)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="mt-2 text-sm">{c.text}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="rate" className="mt-4">
                <RatingPanel courseId={course.id} isOwner={isOwner} myRating={myRating} avg={avg} count={count} />
              </TabsContent>

              {isOwner && (
                <TabsContent value="students" className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{enrolledList.length} estudiante(s) inscritos</p>
                  {enrolledList.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay estudiantes inscritos.</p>}
                  {enrolledList.map(email => {
                    const p = store.profiles[email];
                    return (
                      <div key={email} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-muted"><UserCircle2 className="h-6 w-6" /></div>
                          <div>
                            <p className="text-sm font-medium">{p?.fullName ?? email}</p>
                            <p className="text-xs text-muted-foreground">{email}{p?.age ? ` · ${p.age} años` : ""}</p>
                          </div>
                        </div>
                        <RemoveStudentButton courseId={course.id} email={email} name={p?.fullName ?? email} />
                      </div>
                    );
                  })}
                </TabsContent>
              )}

              <TabsContent value="about" className="mt-4 space-y-3 text-sm">
                <p className="text-muted-foreground">{course.longDescription}</p>
                <div>
                  <h4 className="font-semibold">Instructor</h4>
                  <p className="text-muted-foreground">{course.instructor} — {course.instructorBio}</p>
                </div>
              </TabsContent>

              {isEnrolled && !isOwner && (
                <DialogFooter className="mt-4">
                  <Button variant="destructive" onClick={() => setConfirmLeave(true)}>
                    <LogOut className="mr-2 h-4 w-4" />Darme de baja del curso
                  </Button>
                </DialogFooter>
              )}
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmLeave} onOpenChange={setConfirmLeave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de darte de baja del curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Perderás el acceso a los contenidos, videos y tareas de <strong>{course.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { store.unenroll(course.id, user.email); setConfirmLeave(false); onOpenChange(false); }}
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

function RemoveStudentButton({ courseId, email, name }: { courseId: string; email: string; name: string }) {
  const store = useStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Dar de baja</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Dar de baja a {name}?</AlertDialogTitle>
            <AlertDialogDescription>El estudiante perderá acceso al curso.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { store.unenroll(courseId, email); setOpen(false); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sí, dar de baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function LivePanel({ course, isOwner }: { course: Course; isOwner: boolean }) {
  const store = useStore();
  const live = store.live[course.id] ?? { active: false };
  const [topic, setTopic] = useState(live.topic ?? "");
  const [url, setUrl] = useState(live.url ?? "");

  if (isOwner) {
    return (
      <div className="space-y-3 rounded-lg border p-4">
        <p className="text-sm font-semibold">Iniciar tu clase en vivo</p>
        <div className="space-y-1.5"><Label>Tema de hoy</Label>
          <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ej. Rasgueos básicos" />
        </div>
        <div className="space-y-1.5"><Label>Enlace de la sesión (Zoom, Meet, etc.)</Label>
          <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://…" />
        </div>
        <div className="flex gap-2">
          {!live.active ? (
            <Button onClick={() => store.setLive(course.id, { active: true, topic, url, startedAt: Date.now() })}>
              <Radio className="mr-2 h-4 w-4" />Iniciar clase
            </Button>
          ) : (
            <Button variant="destructive" onClick={() => store.setLive(course.id, { ...live, active: false })}>
              Finalizar clase
            </Button>
          )}
        </div>
        {live.active && <p className="text-sm text-green-700">✓ Clase activa. Los estudiantes ya la ven.</p>}
      </div>
    );
  }
  if (!live.active) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <Radio className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No hay clase en vivo por ahora. Te avisaremos cuando el instructor la inicie.</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4">
      <div className="flex items-center gap-2 text-red-700"><Radio className="h-4 w-4 animate-pulse" /><span className="text-sm font-semibold">EN VIVO</span></div>
      <p className="mt-2 font-semibold">{live.topic || "Clase en curso"}</p>
      {live.url && (
        <a href={live.url} target="_blank" rel="noreferrer">
          <Button className="mt-3"><Video className="mr-2 h-4 w-4" />Unirme a la clase</Button>
        </a>
      )}
    </div>
  );
}

function RatingPanel({ courseId, isOwner, myRating, avg, count }: { courseId: string; isOwner: boolean; myRating: number; avg: number; count: number }) {
  const { user } = useAuth();
  const store = useStore();
  const [hover, setHover] = useState(0);
  if (!user) return null;
  const rows = Object.entries(store.ratings[courseId] ?? {});

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 text-center">
        <p className="text-4xl font-bold">{count > 0 ? avg.toFixed(1) : "—"}</p>
        <p className="text-xs text-muted-foreground">{count} valoración(es)</p>
      </div>
      {!isOwner && (
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium">Tu valoración</p>
          <div className="mt-2 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                onClick={() => store.setRating(courseId, user.email, n)}>
                <Star className={`h-8 w-8 ${n <= (hover || myRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          {myRating > 0 && <p className="mt-2 text-xs text-muted-foreground">Diste {myRating} de 5</p>}
        </div>
      )}
      {isOwner && (
        <div>
          <p className="mb-2 text-sm font-semibold">Quiénes han valorado</p>
          {rows.length === 0 && <p className="text-sm text-muted-foreground">Aún nadie valoró el curso.</p>}
          <div className="space-y-2">
            {rows.map(([email, score]) => {
              const p = store.profiles[email];
              return (
                <div key={email} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{p?.fullName ?? email}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: score }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
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

// ----------------- Teach Tab -----------------

const BLANK_COURSE = (): Omit<Course, "id"> => ({
  title: "", category: "Otro", instructor: "", instructorBio: "",
  price: 250, hours: 8, level: "Principiante",
  description: "", longDescription: "",
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=70",
  rating: undefined, students: 0,
  schedule: "Horarios flexibles", flexible: true, language: "Español",
  requirements: [], learnings: [],
  lessons: [], tasks: [],
});

function TeachTab() {
  const { user, upgradeToPro } = useAuth();
  const store = useStore();
  const [editing, setEditing] = useState<Course | null>(null);
  if (!user) return null;
  const isPro = user.role === "instructor_pro";
  const mine = store.customCourses.filter(c => c.instructorEmail === user.email);

  const startNew = () => {
    const c: Course = {
      ...BLANK_COURSE(),
      id: crypto.randomUUID(),
      instructor: user.fullName,
      instructorEmail: user.email,
      instructorBio: "Instructor de El Saber HN",
    };
    setEditing(c);
  };

  return (
    <div className="space-y-6">
      {!isPro && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm font-medium">Desbloquea Instructor Pro</p>
          <p className="mt-1 text-xs text-muted-foreground">Publica cursos ilimitados con imágenes personalizadas.</p>
          <Button size="sm" className="mt-3" onClick={upgradeToPro}>Activar Pro {formatL(250)}/mes</Button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mis cursos publicados ({mine.length})</h2>
        <Button onClick={startNew} disabled={!isPro}><Plus className="mr-2 h-4 w-4" />Nuevo curso</Button>
      </div>

      {mine.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Aún no has publicado cursos.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {mine.map(c => {
            const students = store.enrollments[c.id]?.length ?? 0;
            const { avg, count } = store.averageRating(c.id);
            return (
              <Card key={c.id}>
                <div className="h-28 rounded-t-lg bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{c.category}</p>
                  <p className="truncate font-semibold">{c.title}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{students}</span>
                    <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />{count > 0 ? avg.toFixed(1) : "—"} ({count})</span>
                    <span className="font-semibold text-primary">{formatL(c.price)}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(c)}><Pencil className="mr-1 h-3.5 w-3.5" />Editar</Button>
                    <Button size="icon" variant="ghost" onClick={() => store.removeCourse(c.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {editing && <CourseEditor course={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function CourseEditor({ course, onClose }: { course: Course; onClose: () => void }) {
  const store = useStore();
  const [c, setC] = useState<Course>(course);
  const exists = store.customCourses.some(x => x.id === course.id);
  const set = <K extends keyof Course>(k: K, v: Course[K]) => setC(p => ({ ...p, [k]: v }));

  const save = () => {
    if (!c.title.trim()) return;
    if (exists) store.updateCourse(c.id, c);
    else store.addCourse(c);
    onClose();
  };

  const handleImage = (f: File) => {
    const r = new FileReader();
    r.onload = () => set("image", r.result as string);
    r.readAsDataURL(f);
  };

  const addLesson = () => set("lessons", [...c.lessons, { title: "Nueva lección", duration: "20 min" }]);
  const updLesson = (i: number, patch: Partial<CourseLesson>) => set("lessons", c.lessons.map((l, ix) => ix === i ? { ...l, ...patch } : l));
  const delLesson = (i: number) => set("lessons", c.lessons.filter((_, ix) => ix !== i));

  const addTask = () => set("tasks", [...c.tasks, { title: "Nueva tarea", description: "", dueInDays: 7 }]);
  const updTask = (i: number, patch: Partial<CourseTask>) => set("tasks", c.tasks.map((t, ix) => ix === i ? { ...t, ...patch } : t));
  const delTask = (i: number) => set("tasks", c.tasks.filter((_, ix) => ix !== i));

  const listInput = (arr: string[], onChange: (v: string[]) => void, ph: string) => (
    <div className="space-y-2">
      {arr.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} onChange={e => onChange(arr.map((x, ix) => ix === i ? e.target.value : x))} />
          <Button size="icon" variant="ghost" onClick={() => onChange(arr.filter((_, ix) => ix !== i))}><X className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={() => onChange([...arr, ph])}><Plus className="mr-1 h-3 w-3" />Añadir</Button>
    </div>
  );

  return (
    <Dialog open onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{exists ? "Editar curso" : "Nuevo curso"}</DialogTitle>
          <DialogDescription>Diseña cada apartado a tu gusto.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="learn">Aprenderás / Requisitos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-3">
            <div className="space-y-1.5"><Label>Imagen del curso</Label>
              <div className="flex items-center gap-3">
                <div className="h-20 w-32 rounded-md border bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="flex-1 space-y-2">
                  <Input value={c.image} onChange={e => set("image", e.target.value)} placeholder="URL de imagen o carga una…" />
                  <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])} />
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Título</Label><Input value={c.title} onChange={e => set("title", e.target.value)} maxLength={80} /></div>
              <div className="space-y-1.5"><Label>Categoría</Label>
                <Input value={c.category} onChange={e => set("category", e.target.value)} maxLength={40} placeholder="Ej. Diseño" list="cats" />
                <datalist id="cats">{DEFAULT_CATEGORIES.map(cat => <option key={cat} value={cat} />)}</datalist>
              </div>
              <div className="space-y-1.5"><Label>Precio (Lempiras)</Label><Input type="number" min={0} value={c.price} onChange={e => set("price", parseInt(e.target.value || "0", 10))} /></div>
              <div className="space-y-1.5"><Label>Duración (horas)</Label><Input type="number" min={1} value={c.hours} onChange={e => set("hours", parseInt(e.target.value || "1", 10))} /></div>
              <div className="space-y-1.5"><Label>Nivel de dificultad</Label>
                <Select value={c.level} onValueChange={v => set("level", v as Course["level"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Horario</Label><Input value={c.schedule} onChange={e => set("schedule", e.target.value)} /></div>
              <label className="flex items-center gap-2 pt-6 text-sm">
                <input type="checkbox" checked={c.flexible} onChange={e => set("flexible", e.target.checked)} /> Horarios flexibles
              </label>
              <div className="space-y-1.5"><Label>Idioma</Label><Input value={c.language} onChange={e => set("language", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Descripción corta</Label><Input value={c.description} onChange={e => set("description", e.target.value)} maxLength={140} /></div>
            <div className="space-y-1.5"><Label>Descripción larga</Label><Textarea rows={3} value={c.longDescription} onChange={e => set("longDescription", e.target.value)} maxLength={500} /></div>
            <div className="space-y-1.5"><Label>Bio del instructor</Label><Textarea rows={2} value={c.instructorBio} onChange={e => set("instructorBio", e.target.value)} maxLength={200} /></div>
          </TabsContent>

          <TabsContent value="content" className="mt-4 space-y-2">
            {c.lessons.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 rounded-lg border p-2">
                <Input value={l.title} onChange={e => updLesson(i, { title: e.target.value })} placeholder="Título de la lección" />
                <Input value={l.duration} onChange={e => updLesson(i, { duration: e.target.value })} placeholder="20 min" className="w-24" />
                <Button size="icon" variant="ghost" onClick={() => delLesson(i)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addLesson}><Plus className="mr-1 h-3 w-3" />Añadir lección</Button>
          </TabsContent>

          <TabsContent value="videos" className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">Añade URLs de video a cada lección.</p>
            {c.lessons.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr] gap-2 rounded-lg border p-2">
                <p className="truncate text-sm">{l.title}</p>
                <Input value={l.videoUrl ?? ""} onChange={e => updLesson(i, { videoUrl: e.target.value })} placeholder="https://…" />
              </div>
            ))}
            {c.lessons.length === 0 && <p className="text-sm text-muted-foreground">Agrega lecciones en la pestaña Contenido.</p>}
          </TabsContent>

          <TabsContent value="tasks" className="mt-4 space-y-3">
            {c.tasks.map((t, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-3">
                <div className="flex gap-2">
                  <Input value={t.title} onChange={e => updTask(i, { title: e.target.value })} placeholder="Título" />
                  <Input type="number" min={1} value={t.dueInDays} onChange={e => updTask(i, { dueInDays: parseInt(e.target.value || "1", 10) })} className="w-24" />
                  <Button size="icon" variant="ghost" onClick={() => delTask(i)}><X className="h-4 w-4" /></Button>
                </div>
                <Textarea rows={2} value={t.description} onChange={e => updTask(i, { description: e.target.value })} placeholder="Descripción" />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addTask}><Plus className="mr-1 h-3 w-3" />Añadir tarea</Button>
          </TabsContent>

          <TabsContent value="learn" className="mt-4 space-y-4">
            <div><Label className="mb-2 block">Lo que aprenderás</Label>{listInput(c.learnings, v => set("learnings", v), "Nuevo aprendizaje")}</div>
            <div><Label className="mb-2 block">Requisitos</Label>{listInput(c.requirements, v => set("requirements", v), "Nuevo requisito")}</div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={save}><Check className="mr-2 h-4 w-4" />{exists ? "Guardar cambios" : "Publicar curso"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ----------------- Profile Tab -----------------

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
    setError(null); setSaved(false);
    const trimmed = fullName.trim();
    if (trimmed.length < 3 || trimmed.length > 60) return setError("El nombre debe tener entre 3 y 60 caracteres.");
    const ageNum = parseInt(age, 10);
    if (Number.isNaN(ageNum) || ageNum < 10 || ageNum > 100) return setError("La edad debe estar entre 10 y 100 años.");
    if (password.length > 0) {
      if (password.length < 6 || password.length > 40) return setError("La contraseña debe tener entre 6 y 40 caracteres.");
      if (password !== confirm) return setError("Las contraseñas no coinciden.");
    }
    const res = updateProfile({ fullName: trimmed, age: ageNum, password: password || undefined });
    if (!res.ok) return setError(res.error ?? "No se pudo actualizar el perfil.");
    setPassword(""); setConfirm(""); setSaved(true);
  };

  const roleLabel = user.role === "instructor_pro" ? "Instructor Pro" : user.role === "instructor" ? "Instructor" : "Estudiante";

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <Card className="lg:w-72">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full text-primary" style={{ background: "var(--brand-soft)" }}>
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
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div className="space-y-1.5"><Label>Correo electrónico</Label><Input value={user.email} disabled /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Nombre completo</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} maxLength={60} /></div>
              <div className="space-y-1.5"><Label>Edad</Label><Input type="number" min={10} max={100} value={age} onChange={e => setAge(e.target.value)} /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Nueva contraseña</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} maxLength={40} placeholder="Dejar vacío para no cambiar" /></div>
              <div className="space-y-1.5"><Label>Confirmar contraseña</Label><Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} maxLength={40} /></div>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            {saved && <p className="flex items-center gap-1.5 text-sm font-medium text-primary"><Check className="h-4 w-4" />Perfil actualizado correctamente.</p>}
            <Button type="submit">Guardar cambios</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
