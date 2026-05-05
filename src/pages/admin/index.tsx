import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnections";
import { getSocialKind, getSocialIcon } from "../../utils/socialUtils";

interface LinkProps {
  id: string;
  nome: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nomeInput, setNomeInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (onSnapshot) => {
      const lista = [] as LinkProps[];

      onSnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      
      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nomeInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }
    try {
      await addDoc(collection(db, "links"), {
        nome: nomeInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date(),
      });
      setNomeInput("");
      setUrlInput("");

    } catch (error) {
      console.log("Erro ao cadastrar no Banco", error);
    }
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <h2 className="text-white font-bold text-xl mb-4">Cadastrar Novo Link</h2>
        <label className="text-white font-medium mt-2 mb-2 ">Nome do Link</label>
        <Input
          placeholder="Digite o nome do Link"
          value={nomeInput}
          onChange={(e) => setNomeInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2 ">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className=" flex gap-2">
            <label className=" text-white font-medium mt-2 mb-2">Cor do texto</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <label className=" text-white font-medium mt-2 mb-2">Fundo do Link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>
        {nomeInput !== "" && (
          <div className="flex  items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className=" text-white font-medium mt-2 mb-2">Veja como está ficando:</label>
            <article
              className=" w-11/12 max-w-lg flex flex-col items-center justify-center bg-zinc-900 rounded px-1 py-3"
              style={{ marginBottom: 8, marginTop: 8, background: backgroundColorInput }}
            >
              <div className="flex items-center gap-2">
                {getSocialIcon(getSocialKind(urlInput, nomeInput), 20, textColorInput)}
                <p
                  className="font-medium"
                  style={{ color: textColorInput }}
                >
                  {nomeInput}
                </p>
              </div>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <div className="w-full max-w-xl flex flex-col items-center justify-center">
        <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
        {links.map((link) => (
          <article
            key={link.id}
            className="relative flex items-center justify-center w-full rounded py-3 px-2 mb-2"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <div className="flex-1 flex items-center justify-center gap-2">
              {getSocialIcon(getSocialKind(link.url, link.nome), 20, link.color)}
              <p className="text-center">{link.nome}</p>
            </div>
            <div className="absolute right-2">
              <button
                type="button"
                className="border border-dashed p-1 rounded"
                onClick={() => handleDeleteLink(link.id)}
              >
                <FiTrash
                  size={18}
                  color="#fff"
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
