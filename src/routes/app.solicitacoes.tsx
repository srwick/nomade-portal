import { createFileRoute } from "@tanstack/react-router";
import { Plus, Clock, CheckCircle2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requests } from "@/lib/mock-data";

export const Route = createFileRoute("/app/solicitacoes")({
  head: () => ({ meta: [{ title: "Solicitações — Nomade" }] }),
  component: SolicitacoesPage,
});

const types = [
  "Declaração de Matrícula", "Histórico Escolar", "Segunda via de boleto",
  "Trancamento", "Revisão de nota", "Aproveitamento de disciplinas",
];

function SolicitacoesPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitações Acadêmicas</h1>
          <p className="text-muted-foreground mt-1">Abra e acompanhe seus requerimentos</p>
        </div>
        <Button className="gap-2 bg-gradient-brand shadow-glow"><Plus className="size-4" /> Nova solicitação</Button>
      </header>

      <Card className="border-border/60 shadow-soft">
        <CardHeader><CardTitle>Tipos de solicitação</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {types.map((t) => (
            <button key={t} className="text-left p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group">
              <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="size-4" />
              </div>
              <p className="font-medium text-sm">{t}</p>
              <p className="text-xs text-muted-foreground mt-1">Prazo médio: 5 dias úteis</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-soft">
        <CardHeader><CardTitle>Minhas solicitações</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-muted grid place-items-center">
                  {r.status === "Concluído" ? <CheckCircle2 className="size-5 text-success" /> : <Clock className="size-5 text-warning-foreground" />}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{r.id} · {r.date}</p>
                  <p className="font-medium">{r.type}</p>
                </div>
              </div>
              <Badge variant="secondary" className={
                r.status === "Concluído" ? "bg-success/15 text-success-foreground border-0" :
                r.status === "Em análise" ? "bg-info/15 text-info-foreground border-0" :
                "bg-warning/15 text-warning-foreground border-0"
              }>
                {r.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
