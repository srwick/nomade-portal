import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, GraduationCap, Wallet, CalendarDays,
  Library, MessageCircle, FileText, Bell, User, LogOut, Sparkles,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { student } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainItems = [
  { title: "Início", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Disciplinas", url: "/app/disciplinas", icon: BookOpen },
  { title: "Notas e Frequência", url: "/app/notas", icon: GraduationCap },
  { title: "Financeiro", url: "/app/financeiro", icon: Wallet },
  { title: "Calendário", url: "/app/calendario", icon: CalendarDays },
];

const secondaryItems = [
  { title: "Biblioteca", url: "/app/biblioteca", icon: Library },
  { title: "Solicitações", url: "/app/solicitacoes", icon: FileText },
  { title: "Suporte", url: "/app/suporte", icon: MessageCircle },
  { title: "Notificações", url: "/app/notificacoes", icon: Bell },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();

  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  const logout = () => {
    localStorage.removeItem("nomade_auth");
    navigate({ to: "/login" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app" className="flex items-center gap-3 px-2 py-3">
          <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center shadow-glow shrink-0">
            <Sparkles className="size-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base tracking-tight">Nomade</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal do Aluno</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Acadêmico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Serviços</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/app/perfil")} tooltip={student.name}>
              <Link to="/app/perfil" className="!h-auto py-2">
                <Avatar className="size-8">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>OO</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex flex-col items-start leading-tight min-w-0">
                    <span className="text-sm font-medium truncate">{student.name}</span>
                    <span className="text-[11px] text-muted-foreground truncate">RA {student.ra}</span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Sair">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
