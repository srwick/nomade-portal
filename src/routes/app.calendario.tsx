import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { upcomingEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/app/calendario")({
  head: () => ({ meta: [{ title: "Calendário Acadêmico — Nomade" }] }),
  component: CalendarioPage,
});

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const eventDays = new Set([22, 24, 25, 28]);

function CalendarioPage() {
  // May 2026: starts Friday (1)
  const firstDay = 5;
  const daysInMonth = 31;
  const cells: (number | null)[] = [
    ...Array.from<unknown, null>({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Calendário Acadêmico</h1>
        <p className="text-muted-foreground mt-1">Provas, eventos e prazos do semestre</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Maio 2026</CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="icon"><ChevronLeft className="size-4" /></Button>
              <Button variant="outline" size="icon"><ChevronRight className="size-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
              {DAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${
                    !d ? "" :
                    d === 20 ? "bg-primary text-primary-foreground font-bold" :
                    eventDays.has(d) ? "bg-secondary/15 text-secondary font-semibold hover:bg-secondary/25 cursor-pointer" :
                    "hover:bg-muted cursor-pointer"
                  }`}
                >
                  {d}
                  {d && eventDays.has(d) && <div className="size-1 rounded-full bg-secondary mt-0.5" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft h-fit">
          <CardHeader>
            <CardTitle>Próximos eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((e) => (
              <div key={e.id} className="rounded-xl border border-border p-3 hover:bg-muted/40 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px]">{e.type}</Badge>
                  <span className="text-xs text-muted-foreground">{e.date} · {e.time}</span>
                </div>
                <p className="text-sm font-medium mt-2 leading-snug">{e.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
