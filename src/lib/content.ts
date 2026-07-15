import { getAdminDb } from "./firebase/admin";
import { defaultContent } from "./default-content";
import type {
  SiteContent,
  Profile,
  HeroContent,
  AboutContent,
  SkillGroup,
  Project,
  ExperienceItem,
  Certification,
  SocialLink,
} from "./content-types";

async function getDoc<T>(path: string, fallback: T): Promise<T> {
  const db = getAdminDb();
  if (!db) return fallback;
  try {
    const [collection, id] = path.split("/");
    const snap = await db.collection(collection).doc(id).get();
    if (!snap.exists) return fallback;
    const data = snap.data();
    return { ...fallback, ...data } as T;
  } catch {
    return fallback;
  }
}

async function getCollection<T extends { order: number }>(
  name: string,
  fallback: T[],
  opts: { publishedOnly?: boolean } = {}
): Promise<T[]> {
  const db = getAdminDb();
  if (!db) return fallback;
  try {
    const snap = await db.collection(name).get();
    if (snap.empty) return fallback;
    let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as T);
    if (opts.publishedOnly) {
      items = items.filter((item) => (item as unknown as { published?: boolean }).published !== false);
    }
    items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return items;
  } catch {
    return fallback;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const [profile, hero, about, marqueeDoc, skillGroups, projects, experience, certifications, socialLinks] =
    await Promise.all([
      getDoc<Profile>("content/profile", defaultContent.profile),
      getDoc<HeroContent>("content/hero", defaultContent.hero),
      getDoc<AboutContent>("content/about", defaultContent.about),
      getDoc<{ items: string[] }>("content/marquee", { items: defaultContent.marqueeSkills }),
      getCollection<SkillGroup>("skillGroups", defaultContent.skillGroups),
      getCollection<Project>("projects", defaultContent.projects, { publishedOnly: true }),
      getCollection<ExperienceItem>("experience", defaultContent.experience),
      getCollection<Certification>("certifications", defaultContent.certifications),
      getCollection<SocialLink>("socialLinks", defaultContent.socialLinks),
    ]);

  return {
    profile,
    hero,
    about,
    marqueeSkills: marqueeDoc.items?.length ? marqueeDoc.items : defaultContent.marqueeSkills,
    skillGroups,
    projects,
    experience,
    certifications,
    socialLinks,
  };
}
