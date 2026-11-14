"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getUi, type Locale, type NavigationItem } from "@/i18n";
import { isActivePath } from "@/lib/navigation";

type MobileNavigationProps = {
  open: boolean;
  items: readonly NavigationItem[];
  locale: Locale;
  pathname: string;
  onClose: () => void;
};

/**
 * The mobile menu is a native modal <dialog>: the browser provides the focus
 * trap, Escape handling, an inert background and focus restoration.
 */
export function MobileNavigation({ open, items, locale, pathname, onClose }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const labels = getUi(locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    // Close the menu if the viewport grows into the desktop layout.
    const desktop = window.matchMedia("(min-width: 1080px)");
    const handleViewport = () => {
      if (desktop.matches && dialog.open) dialog.close();
    };
    desktop.addEventListener("change", handleViewport);
    return () => {
      dialog.removeEventListener("close", handleClose);
      desktop.removeEventListener("change", handleViewport);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      className="mobile-nav"
      aria-label={labels.mainMenu}
      onClick={(event) => {
        // A click on the backdrop targets the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mobile-nav-panel">
        <div className="mobile-nav-header">
          <p className="mobile-nav-label">{labels.mainMenu}</p>
          <button
            className="mobile-nav-close"
            type="button"
            onClick={onClose}
            aria-label={labels.closeMenu}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={labels.mobileNavigation}>
          <ul className="mobile-nav-list">
            {items.map((item) => {
              const active = isActivePath(pathname, item.path);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                  >
                    <span>{item.label}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a className="mobile-nav-email" href={`mailto:${siteConfig.email}`}>
          <Mail aria-hidden="true" />
          {siteConfig.email}
        </a>
      </div>
    </dialog>
  );
}
