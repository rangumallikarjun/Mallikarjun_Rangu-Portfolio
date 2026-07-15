import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteContent();
  const description = profile.tagline || profile.bio;

  return {
    title: `${profile.name} — ${profile.role}`,
    description,
    openGraph: {
      title: `${profile.name} — ${profile.role}`,
      description,
      images: profile.avatarUrl ? [profile.avatarUrl] : undefined,
    },
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getSiteContent();

  return (
    <div className="site-chrome overflow-x-hidden selection:bg-accent selection:text-black">
      <Preloader name={profile.name} />
      <Noise />
      <Cursor />
      <ScrollProgress />
      <Navbar brand={getInitials(profile.name)} />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
