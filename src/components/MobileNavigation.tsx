"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { NavigationItem } from "@/config/site";

type MobileNavigationProps = {
  open: boolean;
  items: readonly NavigationItem[];
  pathname: string;
  onClose: () => void;
};

export function MobileNavigation({
  open,
  items,
  pathname,
  onClose,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mobile-nav-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="მთავარი მენიუ"
            initial={reduceMotion ? false : { y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="mobile-nav-header">
              <p className="mobile-nav-label">ნავიგაცია</p>
              <button
                ref={closeButtonRef}
                className="mobile-nav-close"
                type="button"
                onClick={onClose}
                aria-label="მენიუს დახურვა"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="მობილური ნავიგაცია">
              {items.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.035 }}
                  >
                    <Link
                      href={item.href}
                      className={active ? "active" : ""}
                      aria-current={active ? "page" : undefined}
                      onClick={onClose}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
