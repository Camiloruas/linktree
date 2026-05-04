import { Social } from "../../components/social"
import { FaFacebook, FaWhatsapp } from "react-icons/fa"
import { SiBookstack, SiInstagram } from "react-icons/si"
import { IoLogoGithub } from "react-icons/io"
import { useEffect, useState } from "react"

import { db } from "../../services/firebaseConnections"
import { collection, query, orderBy, doc, getDocs, getDoc } from "firebase/firestore"

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
        
      })
    }
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20 ">Página HOME</h1>
      <span className="text-gray-50 mb-5 mt-6">Veja meus Links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
          <a
            href="https://camiloruas.dev"
            target="_blank"
          >
            <p className="text-base md:text-lg">Portífólio</p>
          </a>
        </section>

        <footer className="flex   justify-center gap-3 my-4">
          <Social url="https://www.facebook.com/camilo.ruas/">
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
          <Social url="https://www.instagram.com/camiloruas/">
            <SiInstagram
              size={35}
              color="#fff"
            />
          </Social>
          <Social url="https://wa.me/5579998448030">
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
      </main>
    </div>
  )
}
