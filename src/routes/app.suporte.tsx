import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, Bot, User as UserIcon, Phone, Mail, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { student } from "@/lib/mock-data";

export const Route = createFileRoute("/app/suporte")({
  head: () => ({ meta: [{ title: "Suporte e Chat — Nomade" }] }),
  component: SuportePage,
});

type Msg = { role: "user" | "bot"; text: string };

const initial: Msg[] = [
  { role: "bot", text: "Olá! Eu sou a Flow, sua assistente acadêmica com IA 🤖✨ Como posso te ajudar hoje?" },
];

function SuportePage() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const user = input.trim();
    setMsgs((m) => [...m, { role: "user", text: user }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, {
        role: "bot",
        text: "Ótima pergunta! Posso te ajudar com isso. Você quer que eu crie um cronograma personalizado, resuma um material ou explique algum conceito específico?",
      }]);
    }, 600);
  };

  return (
    <div className="max-w-[1400px] mx-auto grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 border-border/60 shadow-soft flex flex-col h-[calc(100dvh-12rem)]">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            Flow · Assistente Acadêmica IA
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "bot" ? (
                <div className="size-8 rounded-full bg-gradient-brand grid place-items-center shrink-0">
                  <Bot className="size-4 text-primary-foreground" />
                </div>
              ) : (
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback><UserIcon className="size-4" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </CardContent>
        <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte qualquer coisa…"
            className="h-11"
          />
          <Button type="submit" size="icon" className="size-11 bg-gradient-brand shrink-0">
            <Send className="size-4" />
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        <Card className="border-border/60 shadow-soft">
          <CardHeader><CardTitle>Outras formas de contato</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { icon: Phone, label: "Central acadêmica", desc: "0800 123 4567" },
              { icon: Mail, label: "E-mail", desc: "ajuda@nomade.edu.br" },
              { icon: HelpCircle, label: "Central de ajuda", desc: "FAQ e tutoriais" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <c.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft bg-gradient-soft">
          <CardHeader><CardTitle className="text-sm">Sugestões rápidas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              "Resumir o capítulo 5 de IA",
              "Criar cronograma de estudo da semana",
              "Como funciona Dijkstra?",
              "Solicitar segunda via de boleto",
            ].map((s) => (
              <Button
                key={s}
                variant="outline"
                size="sm"
                onClick={() => setInput(s)}
                className="w-full justify-start font-normal text-left h-auto py-2"
              >
                {s}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
