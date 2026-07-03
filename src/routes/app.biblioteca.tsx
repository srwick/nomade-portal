import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Bookmark, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { library } from "@/lib/mock-data";

export const Route = createFileRoute("/app/biblioteca")({
  head: () => ({ meta: [{ title: "Biblioteca Digital — Nomade" }] }),
  component: BibliotecaPage,
});

function BibliotecaPage() {
  const [q, setQ] = useState("");
  const filtered = library.filter((b) => (b.title + b.author).toLowerCase().includes(q.toLowerCase()));
  const categories = ["Todos", ...Array.from(new Set(library.map((b) => b.category)))];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca Digital</h1>
          <p className="text-muted-foreground mt-1">Mais de 12.000 títulos disponíveis</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar livro ou autor…" className="pl-9 h-11" />
        </div>
      </header>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c, i) => (
          <Badge key={c} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer px-3 py-1.5">{c}</Badge>
        ))}
      </div>

      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((b) => (
          <Card key={b.id} className="overflow-hidden border-border/60 hover:shadow-elevated transition-all group">
            <div className={`relative aspect-[3/4] bg-gradient-to-br ${b.cover} p-4 flex flex-col justify-between`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white_0%,transparent_60%)] opacity-15" />
              <Button size="icon" variant="ghost" className="relative ml-auto size-8 text-white/80 hover:text-white hover:bg-white/10">
                <Bookmark className="size-4" />
              </Button>
              <div className="relative text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-70">{b.category}</p>
                <p className="font-bold text-lg leading-tight mt-1 line-clamp-3">{b.title}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate">{b.author}</p>
              <div className="flex items-center gap-1 mt-1 text-amber-500">
                {[1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-current" />)}
                <Star className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground ml-1">4.2</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
