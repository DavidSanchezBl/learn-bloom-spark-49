import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">El Saber HN</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
                Mis cursos
              </Link>
              <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium sm:inline">
                {user.role === "instructor_pro" ? "Instructor Pro" : user.role === "instructor" ? "Instructor" : "Estudiante"}
              </span>
              <Link to="/dashboard" search={{ tab: "profile" } as never} className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
                Perfil
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)}>
                <LogOut className="mr-1 h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
              <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Está segura de cerrar sesión?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Se cerrará tu sesión actual y volverás a la página de inicio.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { logout(); setConfirmOpen(false); navigate({ to: "/" }); }}>
                      Sí, cerrar sesión
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Ingresar</Button></Link>
              <Link to="/register"><Button size="sm">Registrarme</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
