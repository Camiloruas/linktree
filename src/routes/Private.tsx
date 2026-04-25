import type { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnections";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-domodule";



interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  console.log("testeeeee");
export function Private({ children }: PrivateProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  return children;
  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // Usuário está logado
        setSigned(true);
      } else {
        // Usuário não está logado
        setSigned(false);
      }
      setLoading(false);
    });
    return () => checkLogin(); // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Pode ser substituído por um spinner ou tela de carregamento
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
