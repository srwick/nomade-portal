import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Play, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects } from "@/lib/mock-data";

export const Route = createFileRoute("/app/disciplinas/")({
  head: () => ({ meta: [{ title: "Disciplinas — Nomade" }] }),
  component: DisciplinasPage,
});

function DisciplinasPage() {
  const [q, setQ] = useState("");
  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disciplinas</h1>
          <p className="text-muted-foreground mt-1">Continue seus estudos do semestre atual</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar disciplina…" className="pl-9 h-11" />
        </div>
      </header>

      <Tabs defaultValue="ativas">
        <TabsList>
          <TabsTrigger value="ativas">Em andamento</TabsTrigger>
          <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link
            key={s.id}
            to="/app/disciplinas/$id"
            params={{ id: s.id }}
            className="group"
          >
            <Card className="overflow-hidden border-border/60 hover:shadow-elevated hover:-translate-y-1 transition-all h-full">
              <div className={`relative h-36 bg-gradient-to-br ${s.color}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_50%)] opacity-25" />
                <Badge className="absolute top-3 left-3 bg-white/90 text-foreground border-0">{s.attendance}% freq.</Badge>
                <div className="absolute bottom-3 right-3 size-12 rounded-full bg-white/95 text-foreground grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-5 fill-current" />
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Users className="size-3" /> {s.teacher}
                </p>
                <h3 className="font-semibold text-lg leading-snug mt-1 group-hover:text-primary transition-colors">{s.name}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{s.progress}%</span>
                  </div>
                  <Progress value={s.progress} className="h-2" />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <span className="flex items-center gap-1"><BookOpen className="size-3" /> Próx: {s.nextClass}</span>
                  <span className="font-semibold text-foreground">Média {s.grade}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
