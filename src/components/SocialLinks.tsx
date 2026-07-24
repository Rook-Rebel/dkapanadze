import {
  BadgeCheck,
  BookOpen,
  ContactRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const profileLinks: Array<{
  label: string;
  accessibleLabel: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    label: "ORCID",
    accessibleLabel: "დავით კაპანაძის ORCID პროფილის გახსნა ახალ ჩანართში",
    href: siteConfig.profiles.orcid,
    icon: BadgeCheck,
  },
  {
    label: "Academia.edu",
    accessibleLabel: "დავით კაპანაძის Academia.edu პროფილის გახსნა ახალ ჩანართში",
    href: siteConfig.profiles.academia,
    icon: BookOpen,
  },
  {
    label: "LinkedIn",
    accessibleLabel: "დავით კაპანაძის LinkedIn პროფილის გახსნა ახალ ჩანართში",
    href: siteConfig.profiles.linkedin,
    icon: ContactRound,
  },
  {
    label: "Facebook",
    accessibleLabel: "დავით კაპანაძის Facebook პროფილის გახსნა ახალ ჩანართში",
    href: siteConfig.profiles.facebook,
    icon: UsersRound,
  },
];

export function SocialLinks({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <nav
      className={`social-links ${compact ? "social-links-compact" : ""} ${className}`}
      aria-label="აკადემიური და სოციალური პროფილები"
    >
      {profileLinks.map(({ label, accessibleLabel, href, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accessibleLabel}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
