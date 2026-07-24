import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AcademicTimeline } from "@/components/AcademicTimeline";
import { DigitalProjects } from "@/components/DigitalProjects";
import { FeaturedBook } from "@/components/FeaturedBook";
import { Formula } from "@/components/Formula";
import { GlassCard } from "@/components/GlassCard";
import { HeroSection } from "@/components/HeroSection";
import { LearningSequence } from "@/components/LearningSequence";
import { PublicationCard } from "@/components/PublicationCard";
import { ResearchCard } from "@/components/ResearchCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { homeContent, researchFocus } from "@/content/site-content";
import { publications } from "@/data/publications";
import { webPageJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webPageJsonLd({
          name: siteConfig.title,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <HeroSection />

      <section className="section site-shell" aria-labelledby="research-focus-title">
        <SectionHeading
          eyebrow="კვლევის ფოკუსი"
          title="ერთი იდეა — რამდენიმე მათემატიკური ენა"
          description="კვლევითი მიმართულებები აერთიანებს ალგებრულ სტრუქტურას, გეომეტრიულ ინტუიციას, ოპერატორულ კონსტრუქციას და სწავლების თანმიმდევრულ მოდელს."
        />
        <div className="research-grid" id="research-focus-title">
          {researchFocus.map((research, index) => (
            <Reveal key={research.title} delay={index * 0.08}>
              <ResearchCard {...research} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section learning-section" aria-labelledby="learning-path-title">
        <div className="site-shell">
          <SectionHeading
            eyebrow="სასწავლო არქიტექტურა"
            title="ცნობილი სტრუქტურიდან ანალიზურ ცნებამდე"
            description="კონცეპტუალური გზა ეტაპობრივად გადააქვს მოსწავლე ფაქტორიზაციიდან წარმოებულისა და ზღვრის ურთიერთკავშირამდე."
          />
          <div id="learning-path-title">
            <LearningSequence />
          </div>
        </div>
      </section>

      <section className="section site-shell" aria-labelledby="featured-publications-title">
        <SectionHeading
          eyebrow="რჩეული ნაშრომები"
          title="კვლევითი ტექსტები და ბიბლიოგრაფია"
          description="სტატუსები შეგნებულადაა აღწერილი ნეიტრალურად და ეყრდნობა მხოლოდ მოწოდებულ ბიბლიოგრაფიულ ინფორმაციას."
        />
        <div className="publication-list" id="featured-publications-title">
          {publications.slice(0, 3).map((publication) => (
            <PublicationCard
              key={publication.slug}
              publication={publication}
              compact
            />
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link className="button button-secondary" href="/publications">
            სრული ბიბლიოგრაფია
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section section-soft">
        <div className="site-shell">
          <FeaturedBook />
        </div>
      </section>

      <section className="section learning-section research-explanation-section">
        <div className="site-shell idea-grid">
          <div className="idea-copy">
            <p className="eyebrow">ცენტრალური იდეა</p>
            <h2>შეხება, რომელიც ფაქტორიზაციით იკითხება</h2>
            <p>{homeContent.idea}</p>
          </div>
          <GlassCard className="idea-proof">
            <div className="proof-step">
              <span>01</span>
              <div>
                <h3>გეომეტრიული პირობა</h3>
                <p>
                  წრფე <span className="math-inline">Tₐ</span> ფუნქციის გრაფიკს{" "}
                  <span className="math-inline">x = a</span> წერტილში ეხება.
                </p>
              </div>
            </div>
            <div className="proof-step">
              <span>02</span>
              <div>
                <h3>ალგებრული თარგმანი</h3>
                <p>
                  ფუნქციისა და წრფის სხვაობას{" "}
                  <span className="math-inline">x = a</span>-ში ორმაგი ფესვი აქვს.
                </p>
              </div>
            </div>
            <div className="proof-step">
              <span>03</span>
              <div>
                <h3>ფაქტორიზაციის კრიტერიუმი</h3>
                <div className="proof-formula">
                  <Formula display>
                    {"f(x) - T_a(x) = (x - a)^2 Q(x)"}
                  </Formula>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section site-shell" aria-labelledby="timeline-title">
        <SectionHeading
          eyebrow="აკადემიური ქრონოლოგია"
          title="თემების განვითარება დროში"
          description="ქრონოლოგია მოიცავს მხოლოდ იმ ნაშრომებსა და წლებს, რომლებიც მოწოდებულ წყაროებშია მითითებული."
        />
        <div id="timeline-title">
          <AcademicTimeline />
        </div>
      </section>

      <section className="section learning-section">
        <div className="site-shell">
          <GlassCard className="teaching-preview">
            <div className="teaching-preview-copy">
              <p className="eyebrow">პედაგოგიური ხედვა</p>
              <h2>გაგება — ფორმულის გამოყენებამდე</h2>
              <p>
                სწავლების მოდელი მოსწავლეს ჯერ ცნების შიდა სტრუქტურას აჩვენებს,
                შემდეგ კი ფორმალურ წესებსა და ანალიზურ განსაზღვრებას უკავშირებს.
                მიზანი არის მათემატიკური ენის გაცნობიერებული გამოყენება და არა
                იზოლირებული ალგორითმების დამახსოვრება.
              </p>
              <Link className="button button-secondary" href="/teaching">
                სწავლების ხედვის ნახვა
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="teaching-preview-visual" aria-hidden="true">
              <div className="concept-orbit">
                <strong>კონცეპტუალური გაგება</strong>
                <span>ალგებრა</span>
                <span>გეომეტრია</span>
                <span>ანალიზი</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section learning-section">
        <div className="site-shell">
          <div className="interactive-preview">
            <GlassCard className="interactive-card">
              <p className="eyebrow">ინტერაქტიული სივრცე</p>
              <h2>ნახეთ, როგორ მოძრაობს მხები</h2>
              <p>
                შეცვალეთ შეხების წერტილი და დააკვირდით, როგორ განახლდება მხები,
                მისი განტოლება და ორმაგი ფესვის ფაქტორიზაცია ერთდროულად.
              </p>
              <Link className="button button-primary" href="/interactive">
                დემონსტრაციის გახსნა
                <ArrowRight aria-hidden="true" />
              </Link>
            </GlassCard>
            <div className="interactive-side">
              <GlassCard className="mini-card">
                <span>∂</span>
                <h3>მხები წრფის ვიზუალიზაცია</h3>
                <p>დინამიკური გრაფიკი და წერტილზე დამოკიდებული განტოლება.</p>
              </GlassCard>
              <GlassCard className="mini-card">
                <span>D½</span>
                <h3>ნახევარწარმოებულის ოპერატორი</h3>
                <p>ოპერატორული თანაფარდობების კონცეპტუალური მიმოხილვა.</p>
              </GlassCard>
            </div>
          </div>
          <div className="projects-home-block">
            <SectionHeading
              eyebrow="ციფრული მათემატიკა"
              title="ინტერაქტიული პროექტები"
              description="ორი გარე პლატფორმა მათემატიკური მოდელების კვლევისა და ვიზუალური სწავლებისთვის."
            />
            <DigitalProjects />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="site-shell">
          <div className="contact-callout">
            <div>
              <p className="eyebrow">აკადემიური მიმოწერა</p>
              <h2>კვლევითი დიალოგისთვის</h2>
              <p>
                კვლევით თანამშრომლობასთან, გამოცემებთან ან მათემატიკის
                სწავლებასთან დაკავშირებული წერილებისთვის გამოიყენეთ აკადემიური
                საკონტაქტო არხი.
              </p>
            </div>
            <Link className="button button-primary" href="/contact">
              დაკავშირება
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
