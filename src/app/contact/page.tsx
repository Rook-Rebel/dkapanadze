import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { StructuredData } from "@/components/StructuredData";
import { PortraitFrame } from "@/components/PortraitFrame";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "დავით კაპანაძესთან აკადემიური კავშირი — კვლევითი თანამშრომლობა, სარედაქციო მიმოწერა, ORCID და აკადემიური ელფოსტა.";

export const metadata: Metadata = createMetadata({
  title: "დაკავშირება",
  description,
  path: "/contact",
  image: {
    url: siteConfig.portrait.src,
    width: siteConfig.portrait.width,
    height: siteConfig.portrait.height,
    alt: siteConfig.portrait.alt,
  },
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "დაკავშირება", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "ContactPage",
            name: "დავით კაპანაძესთან დაკავშირება",
            description,
            path: "/contact",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "დაკავშირება" }]} />
          <p className="eyebrow">აკადემიური მიმოწერა</p>
          <h1>დაკავშირება</h1>
          <p className="lede">
            კვლევითი თანამშრომლობის, მათემატიკის სწავლების, გამოცემებისა და
            სარედაქციო საკითხებისთვის გამოიყენეთ დადასტურებული აკადემიური
            ელფოსტა.
          </p>
        </div>
      </header>

      <div className="site-shell page-content contact-grid">
        <section className="contact-details">
          <PortraitFrame variant="contact" />
          <h2>საკონტაქტო ინფორმაცია</h2>
          <p>
            წერილში სასურველია მოკლედ მიუთითოთ საკითხის სფერო და სასურველი
            თანამშრომლობის ან მიმოწერის ფორმა.
          </p>
          <div className="contact-list">
            <div className="contact-item">
              <span>აკადემიური ელფოსტა</span>
              <div className="email-copy-row">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <CopyButton
                  value={siteConfig.email}
                  label="ელფოსტის კოპირება"
                />
              </div>
            </div>
            <div className="contact-item">
              <span>აკადემიური კავშირი</span>
              <strong>{siteConfig.affiliation.name}</strong>
            </div>
            <div className="contact-item">
              <span>მდებარეობა</span>
              <strong>{siteConfig.affiliation.location}</strong>
            </div>
            <div className="contact-item">
              <span>ORCID</span>
              <a
                href={siteConfig.profiles.orcid}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ORCID პროფილის გახსნა ახალ ჩანართში"
              >
                0009-0006-8112-5084
                <ExternalLink
                  aria-hidden="true"
                  style={{ display: "inline", width: "0.8rem", marginLeft: "0.3rem" }}
                />
              </a>
            </div>
            <div className="contact-item">
              <span>მიმოწერის სფეროები</span>
              <strong>
                კვლევითი თანამშრომლობა · სარედაქციო და აკადემიური საკითხები
              </strong>
            </div>
          </div>
          <SocialLinks />
        </section>
        <section aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="sr-only">
            ელფოსტით დაკავშირების ფორმა
          </h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
