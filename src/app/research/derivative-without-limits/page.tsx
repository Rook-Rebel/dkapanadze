import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Formula } from "@/components/Formula";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const description =
  "წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიული კონსტრუქცია — ორმაგი ფესვი, მხები წრფე და მრავალწევრის ფაქტორიზაცია.";

export const metadata: Metadata = createMetadata({
  title: "წარმოებული ზღვრის გარეშე",
  description,
  path: "/research/derivative-without-limits",
  keywords: ["ორმაგი ფესვი", "მხები წრფე"],
});

const crumbs = [
  { name: "მთავარი", href: "/" },
  { name: "კვლევა", href: "/research" },
  {
    name: "წარმოებული ზღვრის გარეშე",
    href: "/research/derivative-without-limits",
  },
];

export default function DerivativeWithoutLimitsPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "წარმოებული ზღვრის გარეშე",
            description,
            path: "/research/derivative-without-limits",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs
            items={[
              { label: "კვლევა", href: "/research" },
              { label: "წარმოებული ზღვრის გარეშე" },
            ]}
          />
          <p className="eyebrow">კვლევითი მიმართულება · 01</p>
          <h1>წარმოებული ზღვრის გარეშე</h1>
          <p className="lede">
            წარმოებულის საწყისი აგება მრავალწევრი ფუნქციებისთვის — ორმაგი
            ფესვის, მხები წრფისა და ალგებრულ-გეომეტრიული კრიტერიუმის საფუძველზე.
          </p>
        </div>
      </header>

      <div className="site-shell page-content research-article">
        <article className="research-article-copy">
          <section id="idea">
            <h2>საწყისი იდეა</h2>
            <p>
              მრავალწევრი ფუნქციის გრაფიკთან{" "}
              <span className="math-inline">x = a</span> წერტილში მხები წრფის
              არსებობა შეიძლება გამოიხატოს ფუნქციასა და წრფეს შორის სხვაობის
              ალგებრული თვისებით. თუ სხვაობას ამ წერტილში ორმაგი ფესვი აქვს,
              მაშინ მასში <span className="math-inline">(x − a)²</span> ფაქტორი
              გამოიყოფა.
            </p>
            <div className="formula-panel">
              <Formula display>
                {"f(x) - T_a(x) = (x - a)^2 Q(x)"}
              </Formula>
            </div>
          </section>

          <section id="quadratic">
            <h2>კვადრატული მოდელი</h2>
            <p>
              ფუნქციისთვის <span className="math-inline">f(x) = x²</span> და
              წერტილისთვის <span className="math-inline">a</span> მხები წრფის
              განტოლებაა{" "}
              <span className="math-inline">Tₐ(x) = 2ax − a²</span>. სხვაობის
              გამოთვლა უშუალოდ იძლევა სრულ კვადრატს:
            </p>
            <div className="formula-stack">
              <div className="formula-panel">
                <Formula display>{"T_a(x) = 2ax - a^2"}</Formula>
              </div>
              <div className="formula-panel">
                <Formula display>
                  {"x^2 - (2ax - a^2) = (x - a)^2"}
                </Formula>
              </div>
            </div>
          </section>

          <section id="meaning">
            <h2>ალგებრული და გეომეტრიული მნიშვნელობა</h2>
            <p>
              ორმაგი ფესვი აღწერს არა უბრალოდ გადაკვეთის წერტილს, არამედ
              შეხებას. ამგვარად, დახრილობა შეიძლება გამოვლინდეს ფაქტორიზაციის
              პირობიდან, სანამ ზღვრის ფორმალური განსაზღვრება შემოვა.
            </p>
          </section>

          <section id="scope">
            <h2>მიდგომის ფარგლები</h2>
            <p>
              საწყისი კონსტრუქცია განკუთვნილია მრავალწევრი ფუნქციებისთვის.
              ელემენტარულ ფუნქციებზე გაფართოება წარმოდგენილია ცალკე
              პრეპრინტში. მიდგომა არ უარყოფს ზღვრის როლს ანალიზში; ის ცვლის
              ცნების სწავლების საწყის მარშრუტს.
            </p>
          </section>

          <section id="related">
            <h2>დაკავშირებული მასალები</h2>
            <p>
              ინტერაქტიულ სივრცეში შეგიძლიათ შეცვალოთ შეხების წერტილი და
              ერთდროულად ნახოთ გრაფიკი, მხები და ფაქტორიზაცია.
            </p>
            <Link className="text-link" href="/interactive">
              ინტერაქტიული დემონსტრაციის გახსნა
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </section>
        </article>

        <aside className="research-aside" aria-label="ამ გვერდის სარჩევი">
          <nav>
            <a href="#idea">საწყისი იდეა</a>
            <a href="#quadratic">კვადრატული მოდელი</a>
            <a href="#meaning">მნიშვნელობა</a>
            <a href="#scope">ფარგლები</a>
            <a href="#related">დაკავშირებული მასალები</a>
          </nav>
        </aside>
      </div>
    </>
  );
}
