import { createFileRoute } from "@tanstack/react-router";
import { Camera, Shield, Bell, Lock, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { student } from "@/lib/mock-data";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({ meta: [{ title: "Meu Perfil — Nomade" }] }),
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus dados, segurança e preferências</p>
      </header>

      <Card className="border-border/60 shadow-soft overflow-hidden">
        <div className="h-32 bg-gradient-hero" />
        <CardContent className="p-6 -mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative">
              <Avatar className="size-28 ring-4 ring-background">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>OO</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-1 right-1 size-8 rounded-full">
                <Camera className="size-4" />
              </Button>
            </div>
            <div className="flex-1 sm:pb-3">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.course} · RA {student.ra}</p>
            </div>
            <Button variant="outline" className="sm:mb-3">Editar perfil</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserIcon className="size-4" /> Dados pessoais</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input defaultValue={student.name} />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input defaultValue={student.email} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input defaultValue="(11) 98765-4321" />
          </div>
          <div className="space-y-2">
            <Label>Data de nascimento</Label>
            <Input defaultValue="1999-04-15" type="date" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="size-4" /> Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center gap-2"><Lock className="size-4" /> Senha</p>
              <p className="text-sm text-muted-foreground">Alterada há 3 meses</p>
            </div>
            <Button variant="outline" size="sm">Alterar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticação em dois fatores</p>
              <p className="text-sm text-muted-foreground">Adiciona uma camada extra de segurança</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="size-4" /> Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "E-mail acadêmico", desc: "Notas, materiais e avisos das disciplinas", on: true },
            { label: "Financeiro", desc: "Boletos, pagamentos e renegociações", on: true },
            { label: "Push no celular", desc: "Notificações em tempo real", on: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{n.label}</p>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
