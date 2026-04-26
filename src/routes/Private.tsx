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
        const useData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactlinks", JSON.stringify(useData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
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
