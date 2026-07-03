import { createFileRoute } from "@tanstack/react-router";
import { Download, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { subjects, student } from "@/lib/mock-data";

export const Route = createFileRoute("/app/notas")({
  head: () => ({ meta: [{ title: "Notas e Frequência — Nomade" }] }),
  component: NotasPage,
});

function NotasPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notas e Frequência</h1>
          <p className="text-muted-foreground mt-1">Acompanhe seu desempenho acadêmico</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="size-4" /> Exportar PDF</Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60 shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <Award className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Média geral</p>
                <p className="text-2xl font-bold">{student.gpa.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-success/15 text-success-foreground grid place-items-center">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Frequência média</p>
                <p className="text-2xl font-bold">{student.attendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-secondary/15 text-secondary grid place-items-center font-bold">
                AP
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Situação acadêmica</p>
                <p className="text-2xl font-bold">Aprovado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 shadow-soft">
        <CardHeader>
          <CardTitle>Detalhamento por disciplina</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disciplina</TableHead>
                <TableHead className="hidden md:table-cell">Professor</TableHead>
                <TableHead>Média</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead className="text-right">Situação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{s.teacher}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${s.grade >= 7 ? "text-success" : "text-destructive"}`}>
                      {s.grade.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-32">
                      <Progress value={s.attendance} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-8">{s.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="bg-success/15 text-success-foreground border-0">Aprovado</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
