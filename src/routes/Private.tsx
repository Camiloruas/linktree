import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebaseConnections";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setSigned(true);
      } else {
        setSigned(false);
      }
      setLoading(false);
    });

    return () => checkLogin();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
