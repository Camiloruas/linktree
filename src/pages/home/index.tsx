import { useEffect, useState } from "react"
import { Social } from "../../components/social"
import { db } from "../../services/firebaseConnections"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { getSocialKind, getSocialIcon } from "../../utils/socialUtils"

interface LinkProps {
  id: string
  nome: string
  url: string
  bg: string
  color: string
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[]

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          })
        })

        setLinks(lista)
      })
    }

    loadLinks()
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20 ">Página HOME</h1>
      <span className="text-gray-50 mb-5 mt-6">Veja meus Links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{ background: link.bg }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
              {getSocialIcon(getSocialKind(link.url, link.nome), 20, link.color)}
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.nome}
              </p>
            </a>
          </section>
        ))}

        <footer className="flex justify-center gap-3 my-4">
          {links.map((link) => {
            const kind = getSocialKind(link.url, link.nome);
            if (!kind) return null;

            return (
              <Social key={link.id} url={link.url}>
                {getSocialIcon(kind, 35)}
              </Social>
            )
          })}
        </footer>
      </main>
    </div>
  )
}
