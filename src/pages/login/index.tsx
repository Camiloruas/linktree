import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState, type FormEvent } from "react";

import { auth } from "../../services/firebaseConnections";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha seu e-mail e senha");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/social");
      console.log("Login realizado com sucesso!", userCredential.user);
    } catch (error) {
      const authError = error as AuthError;

      console.error("Erro ao fazer login:", authError.message);

      if (authError.code === "auth/invalid-credential") {
        alert("E-mail ou senha inválidos.");
      }

      if (authError.code === "auth/too-many-requests") {
        alert("Muitas tentativas. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from bg-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          placeholder="Digite o E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="***************"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white "
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
