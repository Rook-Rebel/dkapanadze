import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DigitalProjects } from "@/components/DigitalProjects";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { TangentDemo } from "@/components/TangentDemo";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "ინტერაქტიული მათემატიკური სივრცე: წარმოებული ზღვრის გარეშე, მხები წრფის ვიზუალიზაცია, ორმაგი ფესვის პირობა და ნახევარწარმოებულის ოპერატორი.";

export const metadata: Metadata = createMetadata({
  title: "ინტერაქტიული სივრცე",
  description,
  path: "/interactive",
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "ინტერაქტიული სივრცე", href: "/interactive" },
];

const topics = [
  {
    title: "წარმოებული ზღვრის გარეშე",
    description: "ალგებრული პირობიდან წერტილოვანი ცვლილებისკენ.",
    icon: "derivative",
  },
  {
    title: "მხები წრფის ვიზუალიზაცია",
    description: "შეხების წერტილისა და წრფის ერთდროული მოძრაობა.",
    icon: "tangent",
  },
  {
    title: "ორმაგი ფესვის პირობა",
    description: "ფაქტორიზაცია, რომელიც გეომეტრიულ შეხებას აღწერს.",
    icon: "double-root",
  },
  {
    title: "ნახევარწარმოებულის ოპერატორი",
    description: "ოპერატორული კომპოზიციის კონცეპტუალური სქემა.",
    icon: "operator",
  },
] as const;

export default function InteractivePage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "ინტერაქტიული მათემატიკური სივრცე",
            description,
            path: "/interactive",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "ინტერაქტიული სივრცე" }]} />
          <p className="eyebrow">მათემატიკური ლაბორატორია</p>
          <h1>ინტერაქტიული სივრცე</h1>
          <p className="lede">
            ცოცხალი ვიზუალიზაციები ალგებრულ ფორმულასა და გეომეტრიულ
            მნიშვნელობას შორის კავშირის დასანახად.
          </p>
        </div>
      </header>

      <div className="site-shell page-content learning-surface interactive-learning-surface">
        <div className="interactive-topics" aria-label="ინტერაქტიული თემები">
          {topics.map((topic, index) => (
            <GlassCard className="interactive-topic" key={topic.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div
                className={`interactive-topic-icon interactive-topic-icon-${topic.icon}`}
                aria-hidden="true"
              >
                <i />
                <i />
              </div>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
            </GlassCard>
          ))}
        </div>

        <TangentDemo />

        <section className="interactive-projects-section">
          <SectionHeading
            eyebrow="გარე პლატფორმები"
            title="ინტერაქტიული პროექტები"
            description="დამოუკიდებელი ციფრული სივრცეები მათემატიკური ექსპერიმენტის, ვიზუალიზაციისა და სწავლებისთვის. თითოეული ბმული იხსნება გარე პლატფორმაზე."
          />
          <DigitalProjects />
        </section>
      </div>
    </>
  );
}
