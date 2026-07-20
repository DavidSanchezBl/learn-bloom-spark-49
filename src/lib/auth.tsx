import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "student" | "instructor" | "instructor_pro";

export interface User {
  email: string;
  fullName: string;
  age: number;
  role: Role;
}

interface StoredUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  register: (data: StoredUser) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  upgradeToPro: () => void;
  updateProfile: (patch: { fullName?: string; age?: number; password?: string }) => { ok: boolean; error?: string };
  enrolledIds: number[];
  enroll: (id: number) => void;
  unenroll: (id: number) => void;
  customCourses: CustomCourse[];
  addCustomCourse: (c: Omit<CustomCourse, "id" | "instructor">) => void;
  updateCustomCourse: (id: string, patch: Partial<CustomCourse>) => void;
  removeCustomCourse: (id: string) => void;
}

export interface CustomCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  color: string;
  instructor: string;
}

const AuthCtx = createContext<AuthState | null>(null);
const USERS_KEY = "es_users";
const SESSION_KEY = "es_session";
const ENROLL_KEY = "es_enroll_";
const COURSES_KEY = "es_courses_";

function readUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function writeUsers(u: StoredUser[]) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledIds, setEnrolled] = useState<number[]>([]);
  const [customCourses, setCustom] = useState<CustomCourse[]>([]);

  useEffect(() => {
    const s = localStorage.getItem(SESSION_KEY);
    if (s) {
      const email = s;
      const found = readUsers().find(u => u.email === email);
      if (found) {
        const { password: _p, ...rest } = found;
        setUser(rest);
        setEnrolled(JSON.parse(localStorage.getItem(ENROLL_KEY + email) || "[]"));
        setCustom(JSON.parse(localStorage.getItem(COURSES_KEY + email) || "[]"));
      }
    }
  }, []);

  const persistEnroll = (email: string, ids: number[]) => {
    localStorage.setItem(ENROLL_KEY + email, JSON.stringify(ids));
  };
  const persistCourses = (email: string, cs: CustomCourse[]) => {
    localStorage.setItem(COURSES_KEY + email, JSON.stringify(cs));
  };

  const value: AuthState = {
    user,
    register: (data) => {
      const users = readUsers();
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { ok: false, error: "Ya existe una cuenta con ese correo" };
      }
      users.push(data);
      writeUsers(users);
      return { ok: true };
    },
    login: (email, password) => {
      const users = readUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) return { ok: false, error: "No tiene cuenta o ingresó el nombre/contraseña incorrecto" };
      const { password: _p, ...rest } = found;
      setUser(rest);
      localStorage.setItem(SESSION_KEY, found.email);
      setEnrolled(JSON.parse(localStorage.getItem(ENROLL_KEY + found.email) || "[]"));
      setCustom(JSON.parse(localStorage.getItem(COURSES_KEY + found.email) || "[]"));
      return { ok: true };
    },
    logout: () => {
      setUser(null); setEnrolled([]); setCustom([]);
      localStorage.removeItem(SESSION_KEY);
    },
    upgradeToPro: () => {
      if (!user) return;
      const users = readUsers();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx >= 0) {
        users[idx].role = "instructor_pro";
        writeUsers(users);
        setUser({ ...user, role: "instructor_pro" });
      }
    },
    updateProfile: (patch) => {
      if (!user) return { ok: false, error: "No hay sesión" };
      const users = readUsers();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx < 0) return { ok: false, error: "Usuario no encontrado" };
      if (patch.fullName !== undefined) users[idx].fullName = patch.fullName;
      if (patch.age !== undefined) users[idx].age = patch.age;
      if (patch.password !== undefined && patch.password.length > 0) users[idx].password = patch.password;
      writeUsers(users);
      const { password: _p, ...rest } = users[idx];
      setUser(rest);
      return { ok: true };
    },
    enrolledIds,
    enroll: (id) => {
      if (!user) return;
      if (enrolledIds.includes(id)) return;
      const next = [...enrolledIds, id];
      setEnrolled(next);
      persistEnroll(user.email, next);
    },
    unenroll: (id) => {
      if (!user) return;
      const next = enrolledIds.filter(x => x !== id);
      setEnrolled(next);
      persistEnroll(user.email, next);
    },
    customCourses,
    addCustomCourse: (c) => {
      if (!user) return;
      const nc: CustomCourse = { ...c, id: crypto.randomUUID(), instructor: user.fullName };
      const next = [...customCourses, nc];
      setCustom(next);
      persistCourses(user.email, next);
    },
    updateCustomCourse: (id, patch) => {
      if (!user) return;
      const next = customCourses.map(c => c.id === id ? { ...c, ...patch } : c);
      setCustom(next);
      persistCourses(user.email, next);
    },
    removeCustomCourse: (id) => {
      if (!user) return;
      const next = customCourses.filter(c => c.id !== id);
      setCustom(next);
      persistCourses(user.email, next);
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
