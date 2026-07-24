import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, Presentation, UsersRound } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GlassCard } from "@/components/GlassCard";
import { LearningSequence } from "@/components/LearningSequence";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { teachingPrinciples } from "@/content/site-content";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "დავით კაპანაძის მათემატიკის სწავლების ხედვა — ცნობილიდან უცნობისკენ, ალგებრისა და გეომეტრიის კავშირი, კონცეპტუალური გაგება და ვიზუალიზაცია.";

export const metadata: Metadata = createMetadata({
  title: "სწავლება",
  description,
  path: "/teaching",
  keywords: ["მათემატიკის სწავლება", "კოგნიტურ-კონსტრუქტივისტული მოდელი"],
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "სწავლება", href: "/teaching" },
];

export default function TeachingPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "მათემატიკის სწავლება",
            description,
            path: "/teaching",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "სწავლება" }]} />
          <p className="eyebrow">მათემატიკის განათლება</p>
          <h1>სწავლება</h1>
          <p className="lede">
            რთული ანალიზური ცნების სწავლება იწყება მოსწავლისთვის ნაცნობი
            ალგებრული და გეომეტრიული სტრუქტურებით — შემდეგ კი ფორმალურ ენას
            თანმიმდევრულად უკავშირდება.
          </p>
        </div>
      </header>

      <div className="site-shell page-content learning-surface teaching-learning-surface">
        <SectionHeading
          eyebrow="სწავლების ფილოსოფია"
          title="მათემატიკური აზრი — წესების ჩამონათვალამდე"
          description="სწავლების ღირებულება გამოიხატება არა დაუსაბუთებელ ეფექტურობის პრეტენზიებში, არამედ ცნების აგების ნათელ, შემოწმებად და თანმიმდევრულ გზაში."
        />
        <div className="principles-grid">
          {teachingPrinciples.map((principle, index) => (
            <article className="principle-card" key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{principle.title}</h2>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="section learning-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="კოგნიტური გზა"
            title="ორმაგი ფესვიდან ზღვართან კავშირამდე"
            description="თანმიმდევრობა აჩვენებს, სად შემოდის თითოეული ახალი ცნება და როგორ ეყრდნობა წინამორბედ სტრუქტურას."
          />
          <LearningSequence />
        </div>
      </section>

      <section className="section site-shell learning-surface resource-learning-surface">
        <SectionHeading
          eyebrow="რესურსების არქიტექტურა"
          title="სტუდენტებისა და მასწავლებლებისთვის"
          description="რესურსები დაემატება მხოლოდ დადასტურებული ფაილებისა და ბმულების მოწოდების შემდეგ. ქვემოთ ნაჩვენებია დაგეგმილი სტრუქტურა და არა არარსებული ჩამოტვირთვები."
        />
        <div className="resource-list">
          <GlassCard className="resource-card">
            <BookOpenText aria-hidden="true" />
            <h3>კონცეპტუალური ჩანაწერები</h3>
            <p>
              მოკლე ტექსტები, რომლებიც ფორმულას მის ალგებრულ და გეომეტრიულ
              მნიშვნელობას უკავშირებს.
            </p>
          </GlassCard>
          <GlassCard className="resource-card">
            <Presentation aria-hidden="true" />
            <h3>ვიზუალური დემონსტრაციები</h3>
            <p>
              მხები წრფის, ორმაგი ფესვისა და ოპერატორული კომპოზიციის
              ინტერაქტიული წარმოდგენა.
            </p>
          </GlassCard>
          <GlassCard className="resource-card">
            <UsersRound aria-hidden="true" />
            <h3>მასწავლებლის გზამკვლევი</h3>
            <p>
              გაკვეთილის შესაძლო თანმიმდევრობა და კითხვები კონცეპტუალური
              დიალოგისთვის — ფაილის მოწოდების შემდეგ.
            </p>
          </GlassCard>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link className="button button-secondary" href="/interactive">
            ინტერაქტიული დემონსტრაციის ნახვა
          </Link>
        </div>
      </section>
    </>
  );
}
