import { FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter, FaTelegramPlane } from "react-icons/fa"
import { SiBookstack, SiInstagram, SiYoutube, SiTiktok, SiX } from "react-icons/si"
import { IoLogoGithub } from "react-icons/io"

export type SocialKind =
  | "github"
  | "instagram"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "tiktok"
  | "x"
  | "twitter"
  | "telegram"
  | "whatsapp"
  | "portfolio"

export function normalize(value: string) {
  return value.trim().toLowerCase()
}

export function getSocialKind(urlValue: string, nomeValue: string): SocialKind | null {
  const url = normalize(urlValue)
  const nome = normalize(nomeValue)

  if (url.includes("github.com")) return "github"
  if (url.includes("instagram.com")) return "instagram"
  if (url.includes("facebook.com") || url.includes("fb.com")) return "facebook"
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
  if (url.includes("linkedin.com")) return "linkedin"
  if (url.includes("tiktok.com")) return "tiktok"
  if (url.includes("x.com")) return "x"
  if (url.includes("twitter.com")) return "twitter"
  if (url.includes("t.me") || url.includes("telegram.me")) return "telegram"
  if (url.includes("wa.me") || url.includes("whatsapp.com")) return "whatsapp"

  if (nome.includes("portfolio") || nome.includes("portfólio")) return "portfolio"

  return null
}

export function getSocialIcon(kind: SocialKind | null, size = 35, color = "#fff") {
  if (kind === "github") return <IoLogoGithub size={size} color={color} />
  if (kind === "instagram") return <SiInstagram size={size} color={color} />
  if (kind === "facebook") return <FaFacebook size={size} color={color} />
  if (kind === "youtube") return <SiYoutube size={size} color={color} />
  if (kind === "linkedin") return <FaLinkedin size={size} color={color} />
  if (kind === "tiktok") return <SiTiktok size={size} color={color} />
  if (kind === "x") return <SiX size={size} color={color} />
  if (kind === "twitter") return <FaTwitter size={size} color={color} />
  if (kind === "telegram") return <FaTelegramPlane size={size} color={color} />
  if (kind === "whatsapp") return <FaWhatsapp size={size} color={color} />
  if (kind === "portfolio") return <SiBookstack size={size} color={color} />

  return null
}
