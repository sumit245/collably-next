import { ExternalLink } from "lucide-react"

export function SocialCard({ icon, platform, description, href, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white rounded-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-md overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-2 h-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-10"
        style={{ background: color }}
      ></div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white/80 transition-colors duration-300">
          <div className="text-gray-600 group-hover:text-[#ff0055] transition-colors duration-300">{icon}</div>
        </div>
        <h3 className="font-bold text-lg mb-1">{platform}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center text-[#ff0055] text-sm font-medium">
          <span>Connect</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </div>
      </div>
    </a>
  )
}

