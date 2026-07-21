import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  validateSearch: () => ({
    role: "student" as "student" | "instructor",
    pro: false as boolean,
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState<Role>(search.role);
  const [pro, setPro] = useState(search.pro);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !fullName || !password || !age) return setError("Completa todos los campos");
    if (fullName.length < 3 || fullName.length > 60) return setError("El nombre debe tener entre 3 y 60 caracteres");
    if (password.length < 6 || password.length > 40) return setError("La contraseña debe tener entre 6 y 40 caracteres");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Correo electrónico inválido");
    const ageN = parseInt(age, 10);
    if (isNaN(ageN) || ageN < 10 || ageN > 100) return setError("Edad inválida (10-100)");
    const finalRole: Role = role === "instructor" ? (pro ? "instructor_pro" : "instructor") : "student";
    const res = register({ email, fullName, password, age: ageN, role: finalRole });
    if (!res.ok) return setError(res.error || "Error");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">Crea tu cuenta</h1>
        <p className="mt-1 text-sm text-muted-foreground">Únete a El Saber HN en menos de un minuto.</p>
        <Card className="mt-6">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              {error && (
                <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={fullName} onChange={e => setName(e.target.value)} maxLength={60} placeholder="Ej. Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={80} placeholder="tucorreo@ejemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} maxLength={40} placeholder="Mínimo 6 caracteres" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} min={10} max={100} />
              </div>
              <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as Role)} className="grid gap-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                    <RadioGroupItem value="student" id="r1" />
                    <div><p className="text-sm font-medium">Estudiante</p><p className="text-xs text-muted-foreground">Quiero aprender nuevas habilidades</p></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                    <RadioGroupItem value="instructor" id="r2" />
                    <div><p className="text-sm font-medium">Maestro / Instructor</p><p className="text-xs text-muted-foreground">Quiero enseñar y crear cursos</p></div>
                  </label>
                </RadioGroup>
              </div>
              {role === "instructor" && (
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-primary/40 bg-primary/5 p-3">
                  <input type="checkbox" checked={pro} onChange={e => setPro(e.target.checked)} className="mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Activar Instructor Pro — L. 250/mes</p>
                    <p className="text-xs text-muted-foreground">Cursos ilimitados, editor libre y define tus precios.</p>
                  </div>
                </label>
              )}
              <Button type="submit" className="w-full">Crear cuenta</Button>
              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta? <Link to="/login" className="text-primary hover:underline">Ingresa aquí</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
