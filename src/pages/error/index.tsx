import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className="font-bold text-6xl mb-4">404</h1>
      <h2 className="font-bold text-4xl mb-4">Página não encontrada</h2>
      <p className="italic text-lg mb-8 text-zinc-400">Você parece ter se perdido...</p>

      <Link to="/" className="bg-blue-600 px-6 py-2 rounded-md font-medium transition-transform hover:scale-105">
        Voltar para a Home
      </Link>
    </div>
  );
}
