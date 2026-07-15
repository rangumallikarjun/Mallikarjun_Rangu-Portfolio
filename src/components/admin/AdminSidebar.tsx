"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  UserCircle,
  Sparkles,
  Info,
  Layers,
  ShieldCheck,
  Briefcase,
  Share2,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Profile", href: "/admin/profile", icon: UserCircle },
  { label: "Hero", href: "/admin/hero", icon: Sparkles },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Projects", href: "/admin/projects", icon: Layers },
  { label: "Skills", href: "/admin/skills", icon: ShieldCheck },
  { label: "Certifications", href: "/admin/certifications", icon: ShieldCheck },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Social Links", href: "/admin/social", icon: Share2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <aside className="w-64 shrink-0 border-r border-border h-screen sticky top-0 flex flex-col p-6">
      <div className="mb-8">
        <p className="font-display text-lg">Admin Panel</p>
        <p className="text-xs text-muted mt-1">Mallikarjun Rangu</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-accent text-black font-medium"
                  : "text-muted hover:text-fg hover:bg-surface"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 pt-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface transition-colors"
        >
          <ExternalLink size={16} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface transition-colors text-left"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
