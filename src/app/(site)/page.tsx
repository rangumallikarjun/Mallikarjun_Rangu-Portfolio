import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";

export const revalidate = 0;

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <Hero
        hero={content.hero}
        location={content.profile.location}
        avatarUrl={content.profile.avatarUrl}
        resumeUrl={content.profile.resumeUrl}
      />
      <About about={content.about} />
      <Projects projects={content.projects} />
      <Skills marqueeSkills={content.marqueeSkills} skillGroups={content.skillGroups} />
      <Certifications certifications={content.certifications} />
      <Experience experience={content.experience} />
      <Contact email={content.profile.email} socialLinks={content.socialLinks} />
      <Footer name={content.profile.name} />
    </main>
  );
}
