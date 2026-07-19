import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate({ to: "/" }); }}>
                <LogOut className="h-4 w-4" />
              </Button>
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
