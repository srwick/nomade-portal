import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download, AlertCircle, CheckCircle2, Clock, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { billing } from "@/lib/mock-data";

export const Route = createFileRoute("/app/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — Nomade" }] }),
  component: FinanceiroPage,
});

const statusInfo = {
  paid: { label: "Pago", className: "bg-success/15 text-success-foreground border-0", icon: CheckCircle2 },
  open: { label: "Em aberto", className: "bg-warning/15 text-warning-foreground border-0", icon: Clock },
  pending: { label: "A vencer", className: "bg-muted text-muted-foreground border-0", icon: Clock },
} as const;

function FinanceiroPage() {
  const next = billing.find((b) => b.status === "open");
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground mt-1">Mensalidades, boletos e pagamentos</p>
      </header>

      {next && (
        <Card className="border-warning/30 bg-gradient-to-br from-warning/5 to-transparent shadow-soft">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-warning/20 text-warning-foreground grid place-items-center shrink-0">
                <AlertCircle className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-warning-foreground">Boleto em aberto</p>
                <p className="text-2xl font-bold tracking-tight mt-0.5">
                  R$ {next.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">Referente a {next.ref} · vence em {next.due}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2"><QrCode className="size-4" /> Pagar com PIX</Button>
              <Button className="gap-2 bg-gradient-brand shadow-glow"><CreditCard className="size-4" /> Pagar com cartão</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/60 shadow-soft">
        <CardHeader>
          <CardTitle>Histórico de pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referência</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Comprovante</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billing.map((b) => {
                const s = statusInfo[b.status];
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.ref}</TableCell>
                    <TableCell className="text-muted-foreground">{b.due}</TableCell>
                    <TableCell>R$ {b.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <Badge className={s.className}><s.icon className="size-3 mr-1" /> {s.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" disabled={b.status !== "paid"}>
                        <Download className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
