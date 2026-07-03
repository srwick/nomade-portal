import { createFileRoute } from "@tanstack/react-router";
import { Bell, GraduationCap, Wallet, MessageCircle, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/app/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — Nomade" }] }),
  component: NotificacoesPage,
});

const iconMap = {
  academic: { icon: GraduationCap, tone: "bg-primary/10 text-primary" },
  financial: { icon: Wallet, tone: "bg-warning/15 text-warning-foreground" },
  support: { icon: MessageCircle, tone: "bg-secondary/15 text-secondary" },
};

function NotificacoesPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bell className="size-7 text-primary" /> Notificações
          </h1>
          <p className="text-muted-foreground mt-1">Suas atualizações em um só lugar</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2"><CheckCheck className="size-4" /> Marcar todas</Button>
      </header>

      <Card className="border-border/60 shadow-soft">
        <CardHeader><CardTitle className="text-base">Recentes</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {notifications.map((n) => {
            const cfg = iconMap[n.type as keyof typeof iconMap] ?? iconMap.academic;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-muted/50 ${n.unread ? "bg-primary/5" : ""}`}
              >
                <div className={`size-10 rounded-xl grid place-items-center shrink-0 ${cfg.tone}`}>
                  <cfg.icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm leading-snug">{n.title}</p>
                    {n.unread && <span className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
