import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, GraduationCap, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Início", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Cursos", url: "/app/disciplinas", icon: BookOpen },
  { title: "Notas", url: "/app/notas", icon: GraduationCap },
  { title: "$", url: "/app/financeiro", icon: Wallet },
  { title: "Perfil", url: "/app/perfil", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav
      aria-label="Navegação principal"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = it.exact ? pathname === it.url : pathname.startsWith(it.url);
          return (
            <li key={it.url}>
              <Link
                to={it.url}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <it.icon className="size-5" />
                <span>{it.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
