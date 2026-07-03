export const student = {
  name: "Otniel de Oliveira",
  ra: "2024100387",
  course: "Análise e Desenvolvimento de Sistemas",
  semester: "5º semestre",
  avatar: "/avatar-otniel.jpg",
  email: "otniel.oliveira@nomade.edu.br",
  gpa: 8.7,
  attendance: 94,
  progress: 62,
  credits: { done: 142, total: 240 },
};

export const subjects = [
  { id: "alg-grafos", name: "Algoritmos em Grafos", teacher: "Prof. Renato Lima", progress: 78, color: "from-blue-500 to-indigo-600", nextClass: "Hoje, 19:00", grade: 9.2, attendance: 96 },
  { id: "prog-web", name: "Programação Web II", teacher: "Profª. Camila Souza", progress: 64, color: "from-violet-500 to-purple-600", nextClass: "Amanhã, 21:00", grade: 8.5, attendance: 92 },
  { id: "bd-avancado", name: "Banco de Dados Avançado", teacher: "Prof. André Pires", progress: 51, color: "from-fuchsia-500 to-pink-600", nextClass: "Qua, 19:00", grade: 7.8, attendance: 88 },
  { id: "ia", name: "Inteligência Artificial", teacher: "Profª. Luiza Mendes", progress: 82, color: "from-cyan-500 to-blue-600", nextClass: "Qui, 20:00", grade: 9.5, attendance: 100 },
  { id: "redes", name: "Redes de Computadores", teacher: "Prof. Diego Alves", progress: 45, color: "from-emerald-500 to-teal-600", nextClass: "Sex, 19:00", grade: 8.1, attendance: 90 },
  { id: "ux", name: "UX e Interfaces", teacher: "Profª. Beatriz Nunes", progress: 70, color: "from-orange-500 to-rose-600", nextClass: "Sáb, 09:00", grade: 9.0, attendance: 95 },
];

export const gradeHistory = [
  { month: "Mar", media: 7.8 }, { month: "Abr", media: 8.1 }, { month: "Mai", media: 8.4 },
  { month: "Jun", media: 8.2 }, { month: "Jul", media: 8.7 }, { month: "Ago", media: 8.9 },
];

export const attendanceData = [
  { month: "Mar", freq: 92 }, { month: "Abr", freq: 95 }, { month: "Mai", freq: 90 },
  { month: "Jun", freq: 96 }, { month: "Jul", freq: 94 }, { month: "Ago", freq: 97 },
];

export const upcomingEvents = [
  { id: 1, title: "Prova: Algoritmos em Grafos", date: "22 Mai", time: "19:00", type: "Prova", color: "destructive" },
  { id: 2, title: "Entrega TCC - Pré-projeto", date: "24 Mai", time: "23:59", type: "Atividade", color: "warning" },
  { id: 3, title: "Aula ao vivo - IA", date: "25 Mai", time: "20:00", type: "Aula", color: "info" },
  { id: 4, title: "Seminário UX", date: "28 Mai", time: "09:00", type: "Evento", color: "success" },
];

export const notifications = [
  { id: 1, title: "Nova nota lançada", desc: "Banco de Dados Avançado: 8.5", time: "há 2h", unread: true, type: "academic" },
  { id: 2, title: "Boleto disponível", desc: "Mensalidade de Junho - R$ 1.249,00", time: "há 5h", unread: true, type: "financial" },
  { id: 3, title: "Novo material", desc: "Apostila de IA - Capítulo 5", time: "ontem", unread: false, type: "academic" },
  { id: 4, title: "Lembrete: Prova quinta", desc: "Algoritmos em Grafos às 19h", time: "ontem", unread: false, type: "academic" },
];

export const billing = [
  { id: 1, ref: "Mai/2026", value: 1249, due: "10/05/2026", status: "paid" as const },
  { id: 2, ref: "Jun/2026", value: 1249, due: "10/06/2026", status: "open" as const },
  { id: 3, ref: "Jul/2026", value: 1249, due: "10/07/2026", status: "pending" as const },
  { id: 4, ref: "Abr/2026", value: 1249, due: "10/04/2026", status: "paid" as const },
  { id: 5, ref: "Mar/2026", value: 1249, due: "10/03/2026", status: "paid" as const },
];

export const lessons = [
  { id: 1, title: "Introdução a Grafos", duration: "42min", done: true },
  { id: 2, title: "Representação: matriz e lista", duration: "38min", done: true },
  { id: 3, title: "Busca em largura (BFS)", duration: "51min", done: true },
  { id: 4, title: "Busca em profundidade (DFS)", duration: "47min", done: false, current: true },
  { id: 5, title: "Caminho mínimo: Dijkstra", duration: "1h 12min", done: false },
  { id: 6, title: "Árvore geradora mínima", duration: "55min", done: false },
  { id: 7, title: "Algoritmos em grafos direcionados", duration: "48min", done: false },
];

export const library = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programação", cover: "from-slate-700 to-slate-900" },
  { id: 2, title: "Design Patterns", author: "Gang of Four", category: "Arquitetura", cover: "from-indigo-600 to-violet-800" },
  { id: 3, title: "Refactoring", author: "Martin Fowler", category: "Engenharia", cover: "from-emerald-600 to-teal-800" },
  { id: 4, title: "Don't Make Me Think", author: "Steve Krug", category: "UX", cover: "from-orange-500 to-red-700" },
  { id: 5, title: "Sapiens", author: "Yuval Harari", category: "História", cover: "from-amber-600 to-orange-800" },
  { id: 6, title: "Pragmatic Programmer", author: "Hunt & Thomas", category: "Programação", cover: "from-fuchsia-600 to-pink-800" },
  { id: 7, title: "Atomic Habits", author: "James Clear", category: "Produtividade", cover: "from-cyan-600 to-blue-800" },
  { id: 8, title: "The Mythical Man-Month", author: "Fred Brooks", category: "Gestão", cover: "from-rose-600 to-pink-800" },
];

export const requests = [
  { id: "REQ-2041", type: "Declaração de Matrícula", status: "Concluído", date: "12/05/2026" },
  { id: "REQ-2055", type: "Histórico Escolar", status: "Em análise", date: "15/05/2026" },
  { id: "REQ-2061", type: "Revisão de Nota", status: "Aguardando", date: "18/05/2026" },
];

export const achievements = [
  { id: 1, title: "Maratonista", desc: "7 dias de estudo seguidos", icon: "🔥", unlocked: true },
  { id: 2, title: "Nota Máxima", desc: "Tire 10 em uma avaliação", icon: "⭐", unlocked: true },
  { id: 3, title: "Presente Sempre", desc: "100% de frequência no mês", icon: "🎯", unlocked: true },
  { id: 4, title: "Bibliófilo", desc: "Leia 5 livros da biblioteca", icon: "📚", unlocked: false },
  { id: 5, title: "Mentor", desc: "Ajude 10 colegas no fórum", icon: "🤝", unlocked: false },
  { id: 6, title: "Top 10", desc: "Entre no top 10 do curso", icon: "🏆", unlocked: true },
];
