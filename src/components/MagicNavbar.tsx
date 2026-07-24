"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

export function MagicNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`magic-nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <div className="magic-nav">
          <Link className="monogram" href="/" aria-label="დავით კაპანაძე — მთავარი">
            <span>DK</span>
            <i aria-hidden="true">∂</i>
          </Link>

          <nav className="desktop-nav" aria-label="მთავარი ნავიგაცია">
            {siteConfig.navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty(
                      "--pointer-x",
                      `${event.clientX - rect.left}px`,
                    );
                  }}
                >
                  {active ? (
                    <motion.span
                      className="active-pill"
                      layoutId="active-navigation"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 34 }
                      }
                    />
                  ) : null}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <Link className="nav-contact" href="/contact">
              <Mail aria-hidden="true" />
              <span>დაკავშირება</span>
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={reduceMotion ? false : { rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { rotate: 20, opacity: 0 }}
                >
                  {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation
        open={menuOpen}
        items={siteConfig.navigation}
        pathname={pathname}
        onClose={closeMenu}
      />
    </>
  );
}

