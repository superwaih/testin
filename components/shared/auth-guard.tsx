import { getToken } from "@/services/get-token";
import { redirect } from "next/navigation";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {

  const AUTHENTICATION_TOKEN = getToken();

  if (!AUTHENTICATION_TOKEN) {
    redirect("/");
  }

  return <>{children}</>;
};
