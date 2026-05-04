import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { db } from "../../services/firebaseConnections"
import { setDoc, addDoc, getDoc, doc, collection } from "firebase/firestore"
export function Networks() {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect(() => {
    function loadLink() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
        }
      })
    }
    loadLink()
  }, [])

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("Cadastrado com Sucesso")
      })
      .catch((error) => {
        console.log("Erro ao Salvar", error)
      })
    setFacebook("")
    setInstagram("")
    setYoutube("")
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

      <form
        className="flex flex-col max-w-xl w-full"
        onSubmit={handleRegister}
      >
        <label
          htmlFor=""
          className="text-white font-medium mt-8 mb-4"
        >
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label
          htmlFor=""
          className="text-white font-medium mt-8 mb-4"
        >
          Link do Youtube
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <label
          htmlFor=""
          className="text-white font-medium mt-8 mb-4"
        >
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <button className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium mt-5">Salvar Links</button>
      </form>
    </div>
  )
}
