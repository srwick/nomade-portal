import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Sparkles, Eye, EyeOff, ShieldCheck, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Nomade Portal do Aluno" },
      { name: "description", content: "Acesse o Nomade com seu RA, CPF ou e-mail institucional." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("nomade_auth", "1");
      navigate({ to: "/app" });
    }, 700);
  };

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-20 -left-10 size-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-white/15 backdrop-blur grid place-items-center">
            <Sparkles className="size-6" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Nomade</h1>
            <p className="text-xs uppercase tracking-widest opacity-80">Portal do Aluno</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
            Sua jornada acadêmica,<br />
            <span className="opacity-80">em um só lugar.</span>
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Acesse aulas, notas, financeiro, biblioteca digital e acompanhe seu progresso com nosso assistente de IA.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
            {[
              { icon: GraduationCap, label: "Aulas ao vivo" },
              { icon: BookOpen, label: "Biblioteca" },
              { icon: ShieldCheck, label: "100% seguro" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-white/10 backdrop-blur p-4 text-center">
                <f.icon className="size-5 mx-auto mb-2" />
                <p className="text-xs font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs opacity-70">© 2026 Nomade Educacional. Todos os direitos reservados.</p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow">
              <Sparkles className="size-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Nomade</h1>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Portal do Aluno</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Entre com seu RA, CPF ou e-mail institucional.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ra">RA, CPF ou e-mail</Label>
              <Input id="ra" placeholder="2024100387" defaultValue="2024100387" required className="h-11" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd">Senha</Label>
                <button type="button" className="text-xs text-primary hover:underline">Esqueci minha senha</button>
              </div>
              <div className="relative">
                <Input id="pwd" type={show ? "text" : "password"} defaultValue="demo1234" required className="h-11 pr-10" />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox id="remember" defaultChecked />
              <span className="text-muted-foreground">Manter conectado neste dispositivo</span>
            </label>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-brand hover:opacity-95 shadow-glow text-base font-semibold">
              {loading ? "Entrando…" : "Entrar no portal"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Primeiro acesso?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Crie sua senha</Link>
            </p>
          </form>

          <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground flex gap-3">
            <ShieldCheck className="size-4 shrink-0 mt-0.5 text-primary" />
            <p>
              Acesso protegido com criptografia ponta a ponta e autenticação em dois fatores opcional. Conforme LGPD.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
