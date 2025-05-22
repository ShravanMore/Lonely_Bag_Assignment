import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?from=" + encodeURIComponent(pathname));
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
