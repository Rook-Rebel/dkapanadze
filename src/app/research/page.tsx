import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Formula } from "@/components/Formula";
import { GlassCard } from "@/components/GlassCard";
import { LearningSequence } from "@/components/LearningSequence";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { researchFocus } from "@/content/site-content";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "დავით კაპანაძის კვლევითი მიმართულებები: წარმოებული ზღვრის გარეშე, ნახევარწარმოებულის ოპერატორი და მათემატიკის სწავლების კონსტრუქტივისტული მოდელი.";

export const metadata: Metadata = createMetadata({
  title: "კვლევა",
  description,
  path: "/research",
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "კვლევა", href: "/research" },
];

export default function ResearchPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "CollectionPage",
            name: "კვლევითი მიმართულებები",
            description,
            path: "/research",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "კვლევა" }]} />
          <p className="eyebrow">კვლევითი პროგრამა</p>
          <h1>კვლევა</h1>
          <p className="lede">
            კვლევის საერთო ღერძია ალგებრული სტრუქტურის, გეომეტრიული
            ინტერპრეტაციისა და მათემატიკური ცნების სწავლების თანმიმდევრული
            დაკავშირება.
          </p>
        </div>
      </header>

      <div className="site-shell page-content learning-surface research-learning-surface">
        <div className="research-overview-grid">
          {researchFocus.map((research) => (
            <GlassCard key={research.title} className="research-overview-card">
              <span className="index">{research.index}</span>
              <h2>{research.title}</h2>
              <p>{research.description}</p>
              {research.formula ? (
                <div className="formula-panel">
                  <Formula display>{research.formula}</Formula>
                </div>
              ) : null}
              <Link className="text-link" href={research.href}>
                მიმართულების ვრცლად ნახვა
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </GlassCard>
          ))}
          <GlassCard className="research-overview-card">
            <span className="index">04</span>
            <h2>კვლევითი კავშირები</h2>
            <p>
              კვლევითი მიმართულებები ერთმანეთისგან განცალკევებული არაა:
              წარმოებულის კონსტრუქცია ქმნის სწავლების მოდელს, ხოლო ოპერატორული
              აზროვნება ანალიზის გაფართოებულ სტრუქტურებს ეხება.
            </p>
            <Link className="text-link" href="/publications">
              დაკავშირებული ნაშრომები
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </GlassCard>
        </div>
      </div>

      <section className="section learning-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="სწავლების მოდელი"
            title="კონცეპტუალური გადასვლების თანმიმდევრობა"
            description="ცნების აგება იწყება ფაქტორიზაციითა და მხებით, შემდეგ გადადის დიფერენცირების წესებსა და ზღვართან ანალიზურ კავშირზე."
          />
          <LearningSequence />
        </div>
      </section>
    </>
  );
}
