"use client";

import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { PROFILE } from "@/data/content";

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: "WORK", href: "/work" },
    { label: "PROJECTS", href: "/projects" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const socialLinks = [
    { icon: GithubIcon, href: PROFILE.github },
    { icon: LinkedinIcon, href: PROFILE.linkedin },
    { icon: Mail, href: `mailto:${PROFILE.email}` },
  ];

  return (
    <MinimalistHero
      logoText={PROFILE.handle}
      navLinks={navLinks}
      mainText="Systems engineer — 6 years building high-throughput backends, ML pipelines, and real-time multiplayer architectures. Currently designing server-authoritative VR and NLP-driven analytics at Northeastern."
      readMoreLink="/about"
      imageSrc="/ask-port.png"
      imageAlt={`Portrait — ${PROFILE.fullName}`}
      overlayText={{
        part1: "systems.",
        part2: "scale.",
      }}
      socialLinks={socialLinks}
      locationText={PROFILE.location}
    />
  );
};

export default MinimalistHeroDemo;
