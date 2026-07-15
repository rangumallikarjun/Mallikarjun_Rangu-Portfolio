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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-chrome overflow-x-hidden selection:bg-accent selection:text-black">
      <Preloader />
      <Noise />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
