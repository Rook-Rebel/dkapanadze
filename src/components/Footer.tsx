import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getNavigation, getUi, type Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";
import { MathDivider } from "./MathMotif";

const profiles = [
  { label: "ORCID", href: siteConfig.profiles.orcid },
  { label: "Academia.edu", href: siteConfig.profiles.academia },
  { label: "LinkedIn", href: siteConfig.profiles.linkedin },
  { label: "Facebook", href: siteConfig.profiles.facebook },
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const items = getNavigation(locale).filter((item) => !item.path.includes("#") && item.path !== "/");
  const text = getSiteText(locale);
  const labels = getUi(locale);
  const en = locale === "en";

  return (
    <footer className="site-footer">
      <MathDivider className="footer-divider" />
      <div className="site-shell footer-main">
        <div className="footer-identity">
          <Link className="footer-monogram" href={localizePath("/", locale)} aria-label={`${text.name} — ${labels.homePage}`}>
            DK
          </Link>
          <div>
            <p className="footer-name">{text.name}</p>
            <p className="footer-descriptor">
              {text.academicStatus} · {text.affiliation}
            </p>
          </div>
        </div>
        <nav aria-label={en ? "Footer navigation" : "ქვედა ნავიგაცია"}>
          <ul className="footer-nav">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="site-shell footer-meta">
        <ul className="footer-links" aria-label={labels.socialProfiles}>
          <li>
            <a href={`mailto:${siteConfig.email}`} translate="no">
              {siteConfig.email}
            </a>
          </li>
          {profiles.map((profile) => (
            <li key={profile.href}>
              <a href={profile.href} target="_blank" rel="noopener noreferrer" translate="no">
                {profile.label}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-copyright">
          © {new Date().getFullYear()} {text.name}
        </p>
      </div>
    </footer>
  );
}
