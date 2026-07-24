import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-identity">
          <Link className="footer-monogram" href="/" aria-label="მთავარ გვერდზე დაბრუნება">
            DK
          </Link>
          <div>
            <strong>{siteConfig.name.georgian}</strong>
            <p>მათემატიკა · კვლევა · განათლება</p>
          </div>
        </div>
        <div className="footer-nav">
          <p>საიტის რუკა</p>
          <nav aria-label="ქვედა ნავიგაცია">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-academic">
          <p>აკადემიური კავშირი</p>
          <strong>{siteConfig.affiliation.name}</strong>
          <span>{siteConfig.affiliation.location}</span>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.profiles.orcid}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="დავით კაპანაძის ORCID პროფილის გახსნა ახალ ჩანართში"
          >
            ORCID
            <ArrowUpRight aria-hidden="true" />
          </a>
          <SocialLinks compact className="footer-social-links" />
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name.georgian}</span>
        <span>თბილისი, საქართველო</span>
        <span>ენა: ქართული</span>
      </div>
    </footer>
  );
}
