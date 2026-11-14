"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getNavigation, getUi, type Locale } from "@/i18n";
import { isActivePath } from "@/lib/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

export function MagicNavbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const labels = getUi(locale);
  const items = getNavigation(locale);
  // The monogram links home and the contact page has its own call to action.
  const desktopItems = items.filter((item) => item.href !== "/" && item.href !== "/contact");
  const contactActive = isActivePath(pathname, "/contact");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Position the sliding "magic" indicator under the active link. Before this runs
  // (and without JavaScript) the active link carries its own static highlight.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = (animate: boolean) => {
      const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!active) {
        nav.dataset.indicator = "hidden";
        return;
      }
      nav.style.setProperty("--indicator-x", `${active.offsetLeft}px`);
      nav.style.setProperty("--indicator-w", `${active.offsetWidth}px`);
      nav.dataset.indicator = animate ? "animate" : "static";
    };
    place(nav.dataset.ready === "true");
    nav.dataset.ready = "true";
    const observer = new ResizeObserver(() => place(false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [pathname, locale]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? "true" : undefined}>
        <div className="magic-nav">
          <Link
            className="monogram"
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <span aria-hidden="true">DK</span>
            <i aria-hidden="true">∂</i>
            <span className="sr-only">
              {locale === "en" ? siteConfig.name.english : siteConfig.name.georgian} — {labels.homePage}
            </span>
          </Link>

          <nav ref={navRef} className="desktop-nav" aria-label={labels.mainNavigation}>
            <span className="nav-indicator" aria-hidden="true" />
            {desktopItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="nav-controls">
              <LanguageToggle locale={locale} />
              <span className="nav-controls-divider" aria-hidden="true" />
              <ThemeToggle locale={locale} />
            </div>
            <Link
              className="nav-contact"
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
            >
              <Mail aria-hidden="true" />
              <span>{labels.contact}</span>
            </Link>
            <button
              type="button"
              className="menu-button"
              aria-label={labels.openMenu}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation
        open={menuOpen}
        items={items}
        locale={locale}
        pathname={pathname}
        onClose={closeMenu}
      />
    </>
  );
}
