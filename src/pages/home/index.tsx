import { Social } from "../../components/social"
import { FaFacebook, FaWhatsapp } from "react-icons/fa"
import { SiBookstack, SiInstagram } from "react-icons/si"
import { IoLogoGithub } from "react-icons/io"
import { useEffect, useState } from "react"

import { db } from "../../services/firebaseConnections"
import { collection, query, orderBy, doc, getDocs, getDoc } from "firebase/firestore"
import { FacebookAuthProvider } from "firebase/auth/web-extension"

interface LinkProps {
  id: string
  nome: string
  url: string
  bg: string
  color: string
}

interface SocialLinksProps {
  facebook: string
  youtube: string
  instagram: string
}
export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

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

  useEffect(() => {
    function loadLinksSocial() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.Facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          })
        }
      })
    }

    loadLinksSocial()
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
            <a
              href={link.url}
              target="_blank"
            >
              <p className="text-base md:text-lg">{link.nome}</p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex   justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaFacebook
                size={35}
                color="#fff"
              />
            </Social>
            <Social url="https://camiloruas.dev/">
              <SiBookstack
                size={35}
                color="#fff"
              />
            </Social>
            <Social url={socialLinks.instagram}>
              <SiInstagram
                size={35}
                color="#fff"
              />
            </Social>
            <Social url={socialLinks.youtube}>
              <FaWhatsapp
                size={35}
                color="#fff"
              />
            </Social>
            <Social url="https://github.com/Camiloruas">
              <IoLogoGithub
                size={35}
                color="#fff"
              />
            </Social>
          </footer>
        )}
      </main>
    </div>
  )
}
