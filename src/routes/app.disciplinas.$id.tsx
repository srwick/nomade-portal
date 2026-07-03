import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Play, FileText, MessageSquare, Download, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects, lessons } from "@/lib/mock-data";

export const Route = createFileRoute("/app/disciplinas/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} — Nomade` }] }),
  component: DisciplinaDetail,
  notFoundComponent: () => <div className="p-10 text-center">Disciplina não encontrada.</div>,
});

function DisciplinaDetail() {
  const { id } = Route.useParams();
  const subject = subjects.find((s) => s.id === id);
  if (!subject) throw notFound();
  const current = lessons.find((l) => l.current) ?? lessons[0];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/app/disciplinas"><ArrowLeft className="size-4" /> Voltar</Link>
      </Button>

      <div className={`rounded-3xl p-6 md:p-8 bg-gradient-to-br ${subject.color} text-white shadow-elevated relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,white_0%,transparent_50%)] opacity-25" />
        <div className="relative">
          <p className="text-sm opacity-85">{subject.teacher}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">{subject.name}</h1>
          <div className="flex flex-wrap gap-3 mt-5">
            <Badge className="bg-white/20 border-0 backdrop-blur">Média {subject.grade}</Badge>
            <Badge className="bg-white/20 border-0 backdrop-blur">{subject.attendance}% frequência</Badge>
            <Badge className="bg-white/20 border-0 backdrop-blur">{subject.progress}% concluído</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-soft overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-700 relative grid place-items-center">
              <Button size="lg" className="rounded-full size-20 bg-white/95 text-foreground hover:bg-white shadow-2xl">
                <Play className="size-8 fill-current ml-1" />
              </Button>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-xs opacity-80">Aula 4 de {lessons.length}</p>
                <p className="font-semibold">{current.title}</p>
              </div>
            </div>
            <CardContent className="p-5">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Visão geral</TabsTrigger>
                  <TabsTrigger value="materials">Materiais</TabsTrigger>
                  <TabsTrigger value="forum">Fórum</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-3 pt-4">
                  <h3 className="font-semibold">Sobre esta aula</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nesta aula abordamos a Busca em Profundidade (DFS) em grafos, suas aplicações em detecção de ciclos,
                    componentes fortemente conexos e ordenação topológica. Inclui exemplos práticos em Python.
                  </p>
                </TabsContent>
                <TabsContent value="materials" className="pt-4 space-y-2">
                  {["Slides - DFS.pdf", "Lista de Exercícios 04.pdf", "Código fonte - dfs.py"].map((m) => (
                    <div key={m} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                          <FileText className="size-4" />
                        </div>
                        <span className="text-sm font-medium">{m}</span>
                      </div>
                      <Button variant="ghost" size="icon"><Download className="size-4" /></Button>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="forum" className="pt-4 text-sm text-muted-foreground text-center py-8">
                  <MessageSquare className="size-10 mx-auto mb-3 opacity-40" />
                  Seja o primeiro a abrir uma discussão sobre esta aula.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 shadow-soft h-fit">
          <CardHeader>
            <CardTitle>Trilha de aprendizado</CardTitle>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{lessons.filter((l) => l.done).length} de {lessons.length} aulas</span>
                <span className="font-semibold">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-1.5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {lessons.map((l, i) => (
              <div
                key={l.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                  l.current ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                }`}
              >
                {l.done ? (
                  <CheckCircle2 className="size-5 text-success shrink-0" />
                ) : (
                  <Circle className={`size-5 shrink-0 ${l.current ? "text-primary" : "text-muted-foreground"}`} />
                )}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm leading-tight ${l.done ? "text-muted-foreground line-through" : "font-medium"}`}>
                    {i + 1}. {l.title}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="size-3" /> {l.duration}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
