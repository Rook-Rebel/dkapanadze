import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Formula } from "@/components/Formula";
import { StructuredData } from "@/components/StructuredData";
import { publications } from "@/data/publications";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "ნახევარწარმოებულის ალგებრულ-ოპერატორული კონსტრუქცია გრადუირებულ მონომურ სივრცეზე, რეკურენტული კოეფიციენტებითა და კომპოზიციის პირობით.";

export const metadata: Metadata = createMetadata({
  title: "ნახევარწარმოებულის ოპერატორი",
  description,
  path: "/research/half-derivative",
  keywords: ["ნახევარწარმოებული", "ოპერატორული კონსტრუქცია"],
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "კვლევა", href: "/research" },
  {
    name: "ნახევარწარმოებულის ოპერატორი",
    href: "/research/half-derivative",
  },
];

const halfDerivativePublication = publications.find(
  (publication) => publication.slug === "algebraic-operator-half-derivative",
);

export default function HalfDerivativePage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "ნახევარწარმოებულის ოპერატორი",
            description,
            path: "/research/half-derivative",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs
            items={[
              { label: "კვლევა", href: "/research" },
              { label: "ნახევარწარმოებულის ოპერატორი" },
            ]}
          />
          <p className="eyebrow">კვლევითი მიმართულება · 02</p>
          <h1>ნახევარწარმოებულის ოპერატორული კონსტრუქცია</h1>
          <p className="lede">
            ნახევარი რიგის დიფერენცირების ალგებრული აგება გრადუირებულ მონომურ
            სივრცეზე — კომპოზიციის, რეკურენტული კოეფიციენტებისა და
            ნორმალიზაციის საშუალებით.
          </p>
        </div>
      </header>

      <div className="site-shell page-content research-article">
        <article className="research-article-copy">
          <section id="operator">
            <h2>ოპერატორული პირობა</h2>
            <p>
              კონსტრუქციის მიზანია ისეთი ოპერატორის განსაზღვრა, რომლის საკუთარ
              თავთან კომპოზიცია ჩვეულებრივ დიფერენცირებას იძლევა.
            </p>
            <div className="formula-panel">
              <Formula display>{"D^{1/2} \\circ D^{1/2} = D"}</Formula>
            </div>
          </section>

          <section id="graded-space">
            <h2>გრადუირებული მონომური სივრცე</h2>
            <p>
              ოპერატორი განიხილება მონომების გრადუირებულ ოჯახზე. მოქმედების
              კოეფიციენტები უნდა შეესაბამებოდეს კომპოზიციის პირობას, რაც
              რეკურენტულ დამოკიდებულებას წარმოშობს.
            </p>
            <div className="formula-panel">
              <Formula display>
                {"c(\\beta)c(\\beta - 1/2)=\\beta"}
              </Formula>
            </div>
          </section>

          <section id="recurrence">
            <h2>რეკურენცია და ნორმალიზაცია</h2>
            <p>
              მოწოდებული ნაშრომის ქვესათაური მიუთითებს ორმაგ ფაქტორიალებზე,
              ვალისის ნამრავლსა და ნორმალიზაციაზე. სრული ტექნიკური
              არგუმენტაცია უნდა დაეყრდნოს ნაშრომის დადასტურებულ ტექსტს; ამ
              გვერდზე წარმოდგენილია მხოლოდ მოწოდებული ძირითადი თანაფარდობები.
            </p>
          </section>

          <section id="publication">
            <h2>დაკავშირებული ნაშრომი</h2>
            <p>
              ბიბლიოგრაფიულ ჩანაწერში ტიპი და გამოქვეყნების სტატუსი
              შეგნებულადაა მონიშნული გადასამოწმებლად.
            </p>
            {halfDerivativePublication ? (
              <Link
                className="text-link"
                href={`/publications/${halfDerivativePublication.slug}`}
              >
                ნაშრომის ვრცლად ნახვა
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ) : null}
          </section>
        </article>

        <aside className="research-aside" aria-label="ამ გვერდის სარჩევი">
          <nav>
            <a href="#operator">ოპერატორული პირობა</a>
            <a href="#graded-space">მონომური სივრცე</a>
            <a href="#recurrence">რეკურენცია</a>
            <a href="#publication">ნაშრომი</a>
          </nav>
        </aside>
      </div>
    </>
  );
}
