import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && localStorage.getItem("nomade_auth")) {
      throw redirect({ to: "/app" });
    }
    throw redirect({ to: "/login" });
  },
});
