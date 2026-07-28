"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ProjectList from "./ProjectList";
import PolymarketActivityCheckerImage from "@/app/assets/projects/polymarket-activity-checker.png";

// For each project, drop a screenshot in src/app/assets/projects/ (webp,
// imported as `image`) or a demo video in public/videos/ (`videoSrc`).
const projects = [
  {
    title: "Polymarket Activity Checker",
    href: "https://polymarket-activity-checker-navy.vercel.app/",
    description:
      "paste wallet addresses and pull Polymarket volume, pnl, trades, and deposits — with filters and csv export.",
    image: PolymarketActivityCheckerImage,
    imageAlt: "Polymarket Activity Checker",
    technologies: ["HTML", "JavaScript", "Polymarket API"],
    github: "https://github.com/chesterchong/Polymarket-Activity-Checker",
    demo: "https://polymarket-activity-checker-navy.vercel.app/",
  },
  {
    title: "AI Quiz Wrapper",
    href: "https://gamify-ai-learn.vercel.app/",
    description:
      "turns any material into a gamified quiz. from zero to live in < 1 day.",
    videoSrc: "/videos/gamify-ai-learn.mp4",
    imageAlt: "AI Quiz Wrapper",
    technologies: ["Next.js", "Gemini"],
    github: "https://github.com/chesterchong/gamify-ai-learn",
    demo: "https://gamify-ai-learn.vercel.app/",
  },
];

export default function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute top-2.5 left-3 size-6 text-stone-400" />
        <input
          type="text"
          placeholder="search for a project, technology, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 border border-stone-400 rounded-md bg-transparent focus:outline-none focus:border-stone-700 pl-10"
        />
      </div>
      <ProjectList projects={filtered} />
    </>
  );
}
