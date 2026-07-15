// One-time setup script: populates Firestore with starter content so the
// site and admin panel have something to show/edit immediately.
//
// Usage (after filling in .env.local with your Firebase Admin credentials):
//   node --env-file=.env.local scripts/seed.mjs

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_ADMIN_PROJECT_ID / FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY.\n" +
      "Fill in .env.local first, then run:\n  node --env-file=.env.local scripts/seed.mjs"
  );
  process.exit(1);
}

const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore(app);

const profile = {
  name: "Mallikarjun Rangu",
  role: "Cybersecurity Analyst & Web Developer",
  tagline: "Defending enterprise systems and building the web that runs on them.",
  bio: "Cybersecurity Analyst with 4+ years of SOC and incident response experience across financial-sector environments, specializing in SIEM monitoring, threat detection, vulnerability remediation, and security operations. Hands-on with Splunk, Microsoft Sentinel, CrowdStrike, and Microsoft Defender to investigate threats, reduce false positives, and strengthen access controls. Also builds full-stack web applications with React, TypeScript, and Node.js. CompTIA Security+ and CySA+ certified, MS in Cybersecurity from UNC Charlotte.",
  location: "Edison, NJ",
  email: "rangumallikarjun2045@gmail.com",
  avatarUrl: "",
  resumeUrl: "",
};

const hero = {
  eyebrow: "Cybersecurity Analyst — SOC, Incident Response & Web Development",
  headingLine1: "Mallikarjun Rangu",
  headingLine2: "detects & builds.",
  subtext:
    "SOC and incident response specialist who also designs and builds modern web applications — security and software, together.",
  ctaLabel: "View Work",
};

const about = {
  paragraph:
    "I'm a cybersecurity analyst with 4+ years of SOC and incident response experience across financial-sector environments. I specialize in SIEM monitoring, threat detection, and vulnerability remediation — hands-on with Splunk, Microsoft Sentinel, CrowdStrike, and Microsoft Defender to investigate threats, reduce false positives, and strengthen access controls across enterprise systems. On the side, I design and build full-stack web applications with React, TypeScript, and modern tooling.",
  stats: [
    { label: "Years of SOC experience", value: 4, suffix: "+" },
    { label: "Alerts triaged monthly", value: 300, suffix: "+" },
    { label: "Certifications", value: 3, suffix: "" },
    { label: "Detection rules engineered", value: 6, suffix: "" },
  ],
};

const marquee = {
  items: [
    "Splunk",
    "Microsoft Sentinel",
    "CrowdStrike Falcon",
    "Microsoft Defender",
    "MITRE ATT&CK",
    "Elastic Stack",
    "Cloudflare WAF",
    "Python",
    "Wireshark",
    "Kali Linux",
    "React",
    "TypeScript",
    "SQL",
  ],
};

const skillGroups = [
  {
    title: "SOC & Incident Response",
    order: 0,
    items: [
      "L1/L2 Incident Investigation",
      "Alert Triage & Escalation",
      "Threat Containment",
      "Endpoint Isolation",
    ],
  },
  {
    title: "Tools & Platforms",
    order: 1,
    items: [
      "Splunk",
      "Microsoft Sentinel",
      "CrowdStrike Falcon",
      "Microsoft Defender",
      "Elastic Stack (ELK)",
      "Cloudflare WAF",
    ],
  },
  {
    title: "Threat Detection & Analysis",
    order: 2,
    items: ["MITRE ATT&CK", "KQL / SIEM Rule Tuning", "Phishing & Malware Analysis", "IOC Identification"],
  },
  {
    title: "Frameworks & Compliance",
    order: 3,
    items: ["NIST Incident Response", "HIPAA / HITRUST", "ISO 27001", "Security Audits & Risk Assessments"],
  },
  {
    title: "Frontend Development",
    order: 4,
    items: ["HTML5 & CSS3", "React & TypeScript", "Tailwind CSS & Bootstrap", "UI/UX Design"],
  },
  {
    title: "Backend & Databases",
    order: 5,
    items: ["JavaScript (Node.js)", "Python", "REST APIs", "SQL & Databases"],
  },
];

const projects = [
  {
    title: "SOC Lab — Enterprise Security Pipeline",
    category: "Security Operations",
    year: "2026",
    description:
      "A self-hosted SOC pipeline running on live production traffic — Cloudflare WAF, a full Elastic Stack SIEM, and 6 custom Kibana detections mapped to MITRE ATT&CK. Triaged real attacks from live threat actors end-to-end, including a confirmed malicious IP and a WordPress brute-force campaign, through a full Jira incident lifecycle.",
    imageUrl: "",
    gradient: "linear-gradient(135deg, #7c5cff 0%, #cdff4c 100%)",
    tags: ["Elastic Stack", "Cloudflare WAF", "Python", "MITRE ATT&CK"],
    link: "https://github.com/rangumallikarjun",
    order: 0,
    published: true,
  },
  {
    title: "AWS Cloud Architecting",
    category: "Cloud Infrastructure",
    year: "2025",
    description:
      "Hands-on AWS labs building secure, scalable cloud environments — a highly available EC2 deployment behind an Elastic Load Balancer with Auto Scaling, a multi-AZ RDS migration with automated backups, and a static site on S3 + CloudFront hardened with IAM and KMS encryption.",
    imageUrl: "",
    gradient: "linear-gradient(135deg, #ff6b57 0%, #7c5cff 100%)",
    tags: ["AWS", "EC2", "RDS", "CloudFront"],
    link: "https://github.com/rangumallikarjun",
    order: 1,
    published: true,
  },
];

const experience = [
  {
    year: "Jan 2025 — Present",
    role: "Cybersecurity Analyst",
    company: "Wells Fargo",
    description:
      "Performing L2 incident investigations across 300+ escalated alerts monthly using Splunk, CrowdStrike, and Microsoft Sentinel — improving incident response efficiency by 30% and reducing false positives by 20% through SIEM rule tuning.",
    order: 0,
  },
  {
    year: "Jan 2022 — May 2024",
    role: "SOC Analyst L1",
    company: "Citi Group",
    description:
      "Monitored and triaged 500+ real-time alerts weekly in a 24/7 SOC, resolving 100+ Level 1 incidents and cutting escalation time by 25% through accurate triage and log correlation across Windows, VPN, and Active Directory.",
    order: 1,
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "AWS",
    year: "2026",
    credentialUrl: "",
    order: 0,
  },
  {
    name: "CompTIA CySA+",
    issuer: "CompTIA",
    year: "2026",
    credentialUrl: "",
    order: 1,
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2025",
    credentialUrl: "",
    order: 2,
  },
];

const socialLinks = [
  { label: "GitHub", url: "https://github.com/rangumallikarjun", order: 0 },
  { label: "LinkedIn", url: "https://linkedin.com/in/mallikarjun-r-922230422", order: 1 },
];

async function seedSingleton(id, data) {
  await db.collection("content").doc(id).set(data, { merge: true });
  console.log(`  content/${id} ✓`);
}

async function seedCollection(name, docs) {
  const snap = await db.collection(name).limit(1).get();
  if (!snap.empty) {
    console.log(`  ${name} already has data — skipping`);
    return;
  }
  const batch = db.batch();
  for (const item of docs) {
    batch.set(db.collection(name).doc(), item);
  }
  await batch.commit();
  console.log(`  ${name} ✓ (${docs.length} docs)`);
}

async function main() {
  console.log("Seeding Firestore…");
  await seedSingleton("profile", profile);
  await seedSingleton("hero", hero);
  await seedSingleton("about", about);
  await seedSingleton("marquee", marquee);
  await seedCollection("skillGroups", skillGroups);
  await seedCollection("projects", projects);
  await seedCollection("experience", experience);
  await seedCollection("certifications", certifications);
  await seedCollection("socialLinks", socialLinks);
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
