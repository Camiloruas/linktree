import { useEffect, useMemo, useState } from "react"
import { Social } from "../../components/social"
import { db } from "../../services/firebaseConnections"
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore"
import { getSocialKind, getSocialIcon, type SocialKind } from "../../utils/socialUtils"

interface LinkProps {
  id: string
  nome: string
  url: string
  bg: string
  color: string
}

interface SocialLinks {
  facebook?: string
  instagram?: string
  youtube?: string
  whatsapp?: string
  github?: string
  portfolio?: string
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({})

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
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
            whatsapp: snapshot.data()?.whatsapp,
            github: snapshot.data()?.github,
            portfolio: snapshot.data()?.portfolio,
          })
        }
      })
    }

    loadSocialLinks()
  }, [])

  const finalSocialLinks = useMemo(() => {
    const result: Array<{ url: string; kind: SocialKind }> = []
    const seen = new Set<SocialKind>()

    // Prioritize dedicated social links
    if (socialLinks.facebook) {
      result.push({ url: socialLinks.facebook, kind: "facebook" })
      seen.add("facebook")
    }
    if (socialLinks.instagram) {
      result.push({ url: socialLinks.instagram, kind: "instagram" })
      seen.add("instagram")
    }
    if (socialLinks.youtube) {
      result.push({ url: socialLinks.youtube, kind: "youtube" })
      seen.add("youtube")
    }
    if (socialLinks.whatsapp) {
      result.push({ url: socialLinks.whatsapp, kind: "whatsapp" })
      seen.add("whatsapp")
    }
    if (socialLinks.github) {
      result.push({ url: socialLinks.github, kind: "github" })
      seen.add("github")
    }
    if (socialLinks.portfolio) {
      result.push({ url: socialLinks.portfolio, kind: "portfolio" })
      seen.add("portfolio")
    }

    // Add derived links if not already present
    links.forEach((link) => {
      const kind = getSocialKind(link.url, link.nome)
      if (kind && !seen.has(kind)) {
        result.push({ url: link.url, kind })
        seen.add(kind)
      }
    })

    return result
  }, [socialLinks, links])

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

        {finalSocialLinks.length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            {finalSocialLinks.map((item, index) => (
              <Social key={index} url={item.url}>
                {getSocialIcon(item.kind)}
              </Social>
            ))}
          </footer>
        )}
      </main>
    </div>
  )
}

