import { Bell, Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Topbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nomade_theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nomade_theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />

        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar disciplinas, materiais, professores…"
            className="pl-9 h-10 bg-muted/40 border-transparent focus-visible:bg-background"
          />
        </div>

        <div className="flex-1 sm:hidden" />

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <Button variant="ghost" size="icon" asChild aria-label="Notificações" className="relative">
          <Link to="/app/notificacoes">
            <Bell className="size-4" />
            <Badge className="absolute -top-0.5 -right-0.5 size-4 p-0 grid place-items-center text-[10px] bg-destructive">2</Badge>
          </Link>
        </Button>
      </div>
    </header>
  );
}
