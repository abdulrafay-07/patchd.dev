import { BookOpen, Hammer, Briefcase, Compass } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

import { SocialPlatform } from "@/lib/generated/prisma";

export const navItems = [
  {
    label: "Example",
    href: "/#example",
    icon: BookOpen,
  },
  {
    label: "Behind the Build",
    href: "/#behind-the-build",
    icon: Hammer,
  },
  {
    label: "Use Cases",
    href: "/#use-cases",
    icon: Briefcase,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
];

export const socials = [
  {
    value: "GITHUB" as SocialPlatform,
    name: "Github",
    icon: FaGithub,
    placeholder: "github.com/your-username",
  },
  {
    value: "TWITTER" as SocialPlatform,
    name: "Twitter",
    icon: FaXTwitter,
    placeholder: "x.com/your-handle",
  },
  {
    value: "LINKEDIN" as SocialPlatform,
    name: "LinkedIn",
    icon: FaLinkedin,
    placeholder: "linkedin.com/in/your-profile",
  },
  {
    value: "INSTAGRAM" as SocialPlatform,
    name: "Instagram",
    icon: FaInstagram,
    placeholder: "instagram.com/your-username",
  },
  {
    value: "YOUTUBE" as SocialPlatform,
    name: "Youtube",
    icon: FaYoutube,
    placeholder: "youtube.com/@your-channel",
  },
  {
    value: "EMAIL" as SocialPlatform,
    name: "Email",
    icon: IoMdMail,
    placeholder: "your@email.com",
  },
];
