import type { SiteContent } from "./content-types";

export const defaultContent: SiteContent = {
  profile: {
    name: "Mallikarjun Rangu",
    role: "Cybersecurity Analyst & Web Developer",
    tagline: "Defending enterprise systems and building the web that runs on them.",
    bio: "Cybersecurity Analyst with 4+ years of SOC and incident response experience across financial-sector environments, specializing in SIEM monitoring, threat detection, vulnerability remediation, and security operations. Hands-on with Splunk, Microsoft Sentinel, CrowdStrike, and Microsoft Defender to investigate threats, reduce false positives, and strengthen access controls. Also builds full-stack web applications with React, TypeScript, and Node.js. CompTIA Security+ and CySA+ certified, MS in Cybersecurity from UNC Charlotte.",
    location: "Edison, NJ",
    email: "rangumallikarjun2045@gmail.com",
    avatarUrl: "",
    resumeUrl: "",
  },
  hero: {
    eyebrow: "Cybersecurity Analyst — SOC, Incident Response & Web Development",
    headingLine1: "Mallikarjun Rangu",
    headingLine2: "detects & builds.",
    subtext:
      "SOC and incident response specialist who also designs and builds modern web applications — security and software, together.",
    ctaLabel: "View Work",
  },
  about: {
    paragraph:
      "I'm a cybersecurity analyst with 4+ years of SOC and incident response experience across financial-sector environments. I specialize in SIEM monitoring, threat detection, and vulnerability remediation — hands-on with Splunk, Microsoft Sentinel, CrowdStrike, and Microsoft Defender to investigate threats, reduce false positives, and strengthen access controls across enterprise systems. On the side, I design and build full-stack web applications with React, TypeScript, and modern tooling.",
    stats: [
      { label: "Years of SOC experience", value: 4, suffix: "+" },
      { label: "Alerts triaged monthly", value: 300, suffix: "+" },
      { label: "Certifications", value: 3, suffix: "" },
      { label: "Detection rules engineered", value: 6, suffix: "" },
    ],
  },
  marqueeSkills: [
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
  skillGroups: [
    {
      id: "soc",
      title: "SOC & Incident Response",
      items: [
        "L1/L2 Incident Investigation",
        "Alert Triage & Escalation",
        "Threat Containment",
        "Endpoint Isolation",
      ],
      order: 0,
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      items: [
        "Splunk",
        "Microsoft Sentinel",
        "CrowdStrike Falcon",
        "Microsoft Defender",
        "Elastic Stack (ELK)",
        "Cloudflare WAF",
      ],
      order: 1,
    },
    {
      id: "detection",
      title: "Threat Detection & Analysis",
      items: [
        "MITRE ATT&CK",
        "KQL / SIEM Rule Tuning",
        "Phishing & Malware Analysis",
        "IOC Identification",
      ],
      order: 2,
    },
    {
      id: "frameworks",
      title: "Frameworks & Compliance",
      items: ["NIST Incident Response", "HIPAA / HITRUST", "ISO 27001", "Security Audits & Risk Assessments"],
      order: 3,
    },
    {
      id: "frontend",
      title: "Frontend Development",
      items: ["HTML5 & CSS3", "React & TypeScript", "Tailwind CSS & Bootstrap", "UI/UX Design"],
      order: 4,
    },
    {
      id: "backend",
      title: "Backend & Databases",
      items: ["JavaScript (Node.js)", "Python", "REST APIs", "SQL & Databases"],
      order: 5,
    },
  ],
  projects: [
    {
      id: "soc-lab",
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
      id: "aws-labs",
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
  ],
  experience: [
    {
      id: "wells-fargo",
      year: "Jan 2025 — Present",
      role: "Cybersecurity Analyst",
      company: "Wells Fargo",
      description:
        "Performing L2 incident investigations across 300+ escalated alerts monthly using Splunk, CrowdStrike, and Microsoft Sentinel — improving incident response efficiency by 30% and reducing false positives by 20% through SIEM rule tuning.",
      order: 0,
    },
    {
      id: "citi-group",
      year: "Jan 2022 — May 2024",
      role: "SOC Analyst L1",
      company: "Citi Group",
      description:
        "Monitored and triaged 500+ real-time alerts weekly in a 24/7 SOC, resolving 100+ Level 1 incidents and cutting escalation time by 25% through accurate triage and log correlation across Windows, VPN, and Active Directory.",
      order: 1,
    },
  ],
  certifications: [
    {
      id: "aws-ccp",
      name: "AWS Certified Cloud Practitioner",
      issuer: "AWS",
      year: "2026",
      credentialUrl: "",
      order: 0,
    },
    {
      id: "comptia-cysa",
      name: "CompTIA CySA+",
      issuer: "CompTIA",
      year: "2026",
      credentialUrl: "",
      order: 1,
    },
    {
      id: "comptia-secplus",
      name: "CompTIA Security+",
      issuer: "CompTIA",
      year: "2025",
      credentialUrl: "",
      order: 2,
    },
  ],
  socialLinks: [
    { id: "github", label: "GitHub", url: "https://github.com/rangumallikarjun", order: 0 },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/mallikarjun-r-922230422",
      order: 1,
    },
  ],
};
