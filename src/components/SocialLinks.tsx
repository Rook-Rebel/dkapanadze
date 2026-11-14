import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getUi, type Locale } from "@/i18n";

const profileLinks = [
  { label: "ORCID", href: siteConfig.profiles.orcid },
  { label: "Academia.edu", href: siteConfig.profiles.academia },
  { label: "LinkedIn", href: siteConfig.profiles.linkedin },
  { label: "Facebook", href: siteConfig.profiles.facebook },
] as const;

export function SocialLinks({
  className = "",
  locale,
  exclude = [],
}: {
  className?: string;
  locale: Locale;
  exclude?: ReadonlyArray<(typeof profileLinks)[number]["label"]>;
}) {
  const labels = getUi(locale);
  return (
    <ul className={`profile-links ${className}`.trim()} aria-label={labels.socialProfiles}>
      {profileLinks
        .filter((profile) => !exclude.includes(profile.label))
        .map(({ label, href }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer" translate="no">
              {label}
              <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> {labels.newTab}</span>
            </a>
          </li>
        ))}
    </ul>
  );
}
