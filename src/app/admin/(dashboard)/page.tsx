import Link from "next/link";
import {
  UserCircle,
  Sparkles,
  Info,
  Layers,
  ShieldCheck,
  Briefcase,
  Share2,
} from "lucide-react";

const cards = [
  { label: "Profile", href: "/admin/profile", icon: UserCircle, desc: "Name, bio, avatar, resume" },
  { label: "Hero", href: "/admin/hero", icon: Sparkles, desc: "Homepage headline & intro" },
  { label: "About", href: "/admin/about", icon: Info, desc: "About paragraph & stats" },
  { label: "Projects", href: "/admin/projects", icon: Layers, desc: "Featured work" },
  { label: "Skills", href: "/admin/skills", icon: ShieldCheck, desc: "Capability groups & marquee" },
  { label: "Certifications", href: "/admin/certifications", icon: ShieldCheck, desc: "Security certifications" },
  { label: "Experience", href: "/admin/experience", icon: Briefcase, desc: "Career timeline" },
  { label: "Social Links", href: "/admin/social", icon: Share2, desc: "Contact & social profiles" },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Welcome back</h1>
      <p className="text-muted text-sm mb-10">
        Edit any section below — changes go live on the site immediately.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors"
            >
              <Icon className="text-accent mb-4" size={22} />
              <h2 className="font-display text-lg">{card.label}</h2>
              <p className="text-muted text-sm mt-1">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
