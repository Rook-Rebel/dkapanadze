import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FeaturedBook } from "@/components/FeaturedBook";
import { PublicationFilters } from "@/components/PublicationFilters";
import { StructuredData } from "@/components/StructuredData";
import { publications } from "@/data/publications";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "დავით კაპანაძის ნაშრომების სტრუქტურირებული ბიბლიოგრაფია — მათემატიკური ანალიზი, მათემატიკის განათლება, ფრაქციული აღრიცხვა და ისტორიულ-მეთოდოლოგიური ტექსტები.";

export const metadata: Metadata = createMetadata({
  title: "ნაშრომები",
  description,
  path: "/publications",
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "ნაშრომები", href: "/publications" },
];

export default function PublicationsPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "CollectionPage",
            name: "დავით კაპანაძის ნაშრომები",
            description,
            path: "/publications",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs items={[{ label: "ნაშრომები" }]} />
          <p className="eyebrow">აკადემიური ბიბლიოგრაფია</p>
          <h1>ნაშრომები</h1>
          <p className="lede">
            ხელნაწერები, პრეპრინტი, მონოგრაფია და ისტორიული
            სასწავლო-მეთოდური ჩანაწერები. თითოეული სტატუსი ასახავს მხოლოდ
            მოწოდებულ, გადასამოწმებელ ინფორმაციას.
          </p>
        </div>
      </header>
      <div className="site-shell page-content">
        <section className="publications-featured-book" aria-label="მთავარი წიგნი">
          <FeaturedBook compact />
        </section>
        <PublicationFilters publications={publications} />
      </div>
    </>
  );
}
