import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { MembershipCard } from "@/components/MembershipCard";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/content/site-content";
import { breadcrumbJsonLd, personJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "დავით კაპანაძის აკადემიური პროფილი, კვლევითი ინტერესები, პედაგოგიური ხედვა, პროფესიული კავშირები და დადასტურებული საკონტაქტო ინფორმაცია.";

export const metadata: Metadata = createMetadata({
  title: "დავით კაპანაძე",
  description,
  path: "/davit-kapanadze",
  image: {
    url: siteConfig.portrait.src,
    width: siteConfig.portrait.width,
    height: siteConfig.portrait.height,
    alt: siteConfig.portrait.alt,
  },
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "დავით კაპანაძე", href: "/davit-kapanadze" },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[
          personJsonLd,
          webPageJsonLd({
            type: "ProfilePage",
            name: "დავით კაპანაძე — აკადემიური პროფილი",
            description,
            path: "/davit-kapanadze",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "დავით კაპანაძე" }]} />
          <p className="eyebrow">აკადემიური პროფილი</p>
          <h1>დავით კაპანაძე</h1>
          <p className="lede">
            პედაგოგიკურ მეცნიერებათა დოქტორი და საქართველოს ეროვნული
            უნივერსიტეტ SEU-ს ბიზნესისა და ტექნოლოგიების ფაკულტეტის პროფესორი
            — კვლევითი ინტერესებით მათემატიკური ანალიზის, ფრაქციული აღრიცხვისა
            და მათემატიკის განათლების მიმართულებით.
          </p>
        </div>
      </header>

      <div className="site-shell page-content profile-layout">
        <article className="editorial-copy">
          <section>
            <p className="eyebrow">პროფილი</p>
            <h2>მოკლე ბიოგრაფია</h2>
            {aboutContent.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section>
            <h2>კვლევითი ინტერესები</h2>
            <ul>
              {aboutContent.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>აკადემიური საქმიანობა</h2>
            <p>{aboutContent.academicActivity}</p>
            <Link className="text-link" href="/publications">
              ნაშრომების ბიბლიოგრაფიის ნახვა
              <ArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section>
            <h2>პედაგოგიური ხედვა</h2>
            <p>{aboutContent.teachingVision}</p>
            <Link className="text-link" href="/teaching">
              სწავლების მიდგომის სრულად ნახვა
              <ArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section>
            <h2>პროფესიული კავშირები</h2>
            <p>
              დადასტურებული აკადემიური კავშირია{" "}
              <strong>{siteConfig.affiliation.name}</strong>, თბილისი,
              საქართველო. დავით კაპანაძე ასევე არის{" "}
              <strong>
                {siteConfig.membership.name}-ის {siteConfig.membership.role} (
                {siteConfig.membership.postNominal})
              </strong>
              , გაერთიანებული სამეფო.
            </p>
          </section>

          <section>
            <h2>ORCID და აკადემიური პროფილები</h2>
            <p>
              დადასტურებული საჯარო პროფილებია ORCID, Academia.edu, LinkedIn და
              Facebook.
            </p>
            <a
              className="text-link"
              href={siteConfig.profiles.orcid}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ORCID პროფილის გახსნა ახალ ჩანართში"
            >
              ORCID: 0009-0006-8112-5084
              <ExternalLink aria-hidden="true" />
            </a>
          </section>

        </article>
        <ProfileSidebar />
      </div>
      <section className="section section-soft">
        <div className="site-shell">
          <MembershipCard />
        </div>
      </section>
    </>
  );
}
