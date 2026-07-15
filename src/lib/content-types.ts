export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
};

export type HeroContent = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subtext: string;
  ctaLabel: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

export type AboutContent = {
  paragraph: string;
  stats: Stat[];
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
  order: number;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  gradient: string;
  tags: string[];
  link: string;
  order: number;
  published: boolean;
};

export type ExperienceItem = {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  order: number;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  order: number;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  order: number;
};

export type SiteContent = {
  profile: Profile;
  hero: HeroContent;
  about: AboutContent;
  marqueeSkills: string[];
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  certifications: Certification[];
  socialLinks: SocialLink[];
};
