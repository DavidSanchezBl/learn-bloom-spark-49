import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("No tiene cuenta o ingresó el nombre/contraseña incorrecto");
    const res = login(email, password);
    if (!res.ok) return setError(res.error || "Error");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">Bienvenido de vuelta</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ingresa a tu cuenta para continuar aprendiendo.</p>
        <Card className="mt-6">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              {error && (
                <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={80} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} maxLength={40} />
              </div>
              <Button type="submit" className="w-full">Ingresar</Button>
              <p className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
