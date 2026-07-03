import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import {
  BookOpen, GraduationCap, Wallet, TrendingUp, Clock, ChevronRight,
  Flame, Award, Target, Sparkles, CalendarDays, Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  student, subjects, gradeHistory, attendanceData, upcomingEvents, achievements,
} from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const eventTone = {
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  info: "bg-info/15 text-info-foreground border-info/30",
  success: "bg-success/15 text-success-foreground border-success/30",
} as const;

function Dashboard() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Hero greeting */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 md:p-8 text-primary-foreground shadow-elevated">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 ring-4 ring-white/20">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>OO</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm opacity-80">Olá, bom estudo 👋</p>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{student.name.split(" ")[0]}!</h1>
              <p className="text-sm opacity-85 mt-1">{student.course} · {student.semester}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">{student.gpa.toFixed(1)}</p>
              <p className="text-[11px] uppercase tracking-wider opacity-80 mt-1">Média</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">{student.attendance}%</p>
              <p className="text-[11px] uppercase tracking-wider opacity-80 mt-1">Frequência</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">{student.progress}%</p>
              <p className="text-[11px] uppercase tracking-wider opacity-80 mt-1">Curso</p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Disciplinas ativas", value: subjects.length, sub: "neste semestre", tone: "bg-primary/10 text-primary" },
          { icon: GraduationCap, label: "Média geral", value: student.gpa.toFixed(1), sub: "+0.3 vs semestre anterior", tone: "bg-secondary/10 text-secondary" },
          { icon: Wallet, label: "Próximo boleto", value: "R$ 1.249", sub: "vence em 10/jun", tone: "bg-warning/15 text-warning-foreground" },
          { icon: TrendingUp, label: "Progresso do curso", value: `${student.progress}%`, sub: `${student.credits.done} de ${student.credits.total} créditos`, tone: "bg-success/15 text-success-foreground" },
        ].map((k) => (
          <Card key={k.label} className="shadow-soft border-border/60 hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`size-11 rounded-xl grid place-items-center ${k.tone}`}>
                  <k.icon className="size-5" />
                </div>
              </div>
              <p className="text-3xl font-bold tracking-tight mt-4">{k.value}</p>
              <p className="text-sm font-medium mt-1">{k.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charts */}
        <Card className="lg:col-span-2 shadow-soft border-border/60">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Evolução de notas</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Média mensal nos últimos 6 meses</p>
            </div>
            <Badge variant="secondary" className="bg-success/15 text-success-foreground border-0">
              <TrendingUp className="size-3 mr-1" /> +14%
            </Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={gradeHistory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.22 265)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 265)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 260)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis domain={[6, 10]} axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 260)" }} />
                <Area type="monotone" dataKey="media" stroke="oklch(0.55 0.22 265)" strokeWidth={3} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/60">
          <CardHeader>
            <CardTitle>Frequência mensal</CardTitle>
            <p className="text-sm text-muted-foreground">Presença em aulas</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 260)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 260)" }} />
                <Bar dataKey="freq" fill="oklch(0.6 0.22 295)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Continue learning + events */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft border-border/60">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Continue de onde parou</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/disciplinas">Ver todas <ChevronRight className="size-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {subjects.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                to="/app/disciplinas/$id"
                params={{ id: s.id }}
                className="group rounded-2xl border border-border bg-card p-4 hover:shadow-elevated hover:-translate-y-0.5 transition-all"
              >
                <div className={`h-24 rounded-xl bg-gradient-to-br ${s.color} mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,white_0%,transparent_50%)] opacity-30" />
                  <Button size="icon" className="absolute bottom-2 right-2 rounded-full bg-white/95 text-foreground hover:bg-white size-9">
                    <Play className="size-4 fill-current" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{s.teacher}</p>
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors mt-0.5">{s.name}</h3>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{s.progress}%</span>
                  </div>
                  <Progress value={s.progress} className="h-1.5" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-soft border-border/60">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" /> Próximos eventos
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/app/calendario"><ChevronRight className="size-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((e) => (
                <div key={e.id} className="flex items-start gap-3 group">
                  <div className={`shrink-0 rounded-xl border px-3 py-2 text-center min-w-14 ${eventTone[e.color as keyof typeof eventTone]}`}>
                    <p className="text-[10px] font-semibold uppercase">{e.date.split(" ")[1]}</p>
                    <p className="text-lg font-bold leading-none">{e.date.split(" ")[0]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{e.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Clock className="size-3" /> {e.time} · {e.type}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/60 bg-gradient-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Assistente IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Resuma materiais, tire dúvidas e crie cronogramas personalizados.
              </p>
              <Button asChild className="w-full bg-gradient-brand shadow-glow">
                <Link to="/app/suporte">Conversar agora</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gamification */}
      <Card className="shadow-soft border-border/60">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="size-4 text-primary" /> Conquistas
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Você desbloqueou 4 de 6 conquistas</p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/15 text-warning-foreground text-sm font-semibold">
            <Flame className="size-4" /> 7 dias seguidos
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl border p-4 text-center transition ${a.unlocked ? "bg-card border-border" : "bg-muted/40 border-dashed opacity-60"}`}
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
