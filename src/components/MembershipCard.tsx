"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Award, CalendarDays, ExternalLink, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MembershipCard() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const certificateSrc: string | null = siteConfig.membership.certificateImage;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const triggerButton = triggerButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
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
      triggerButton?.focus();
    };
  }, [open]);

  return (
    <>
      <article className="membership-card">
        <div className="membership-seal" aria-hidden="true">
          <Award />
          <span>AMIMA</span>
        </div>
        <div className="membership-copy">
          <p className="eyebrow">აკადემიური კავშირი</p>
          <h2 className="membership-section-title">პროფესიული წევრობა</h2>
          <h3 lang="en">{siteConfig.membership.name}</h3>
          <p className="membership-role">
            {siteConfig.membership.role} ·{" "}
            <strong>{siteConfig.membership.postNominal}</strong>
          </p>
          <p className="membership-date">
            <CalendarDays aria-hidden="true" />
            არჩევის თარიღი: {siteConfig.membership.electionDate}
          </p>
          <p>
            წევრობის ხარისხი: {siteConfig.membership.grade}. წევრობის მონაცემი
            აღწერს პროფესიულ კავშირს და არ გულისხმობს ინსტიტუტის მიერ კვლევის
            მხარდაჭერას ან შეფასებას.
          </p>
          {certificateSrc ? (
            <button
              ref={triggerButtonRef}
              className="button button-secondary"
              type="button"
              onClick={() => setOpen(true)}
            >
              სერტიფიკატის ნახვა
              <ExternalLink aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <div className="membership-certificate">
          {certificateSrc ? (
            <>
              <Image
                src={certificateSrc}
                alt="IMA-ის ასოცირებული წევრობის სერტიფიკატის უსაფრთხო წინასწარი ხედი"
                width={900}
                height={640}
                sizes="(max-width: 900px) 86vw, 340px"
              />
              <span className="certificate-privacy-mask" aria-hidden="true" />
            </>
          ) : (
            <div className="certificate-placeholder" aria-hidden="true">
              <Award />
              <span>IMA · AMIMA</span>
            </div>
          )}
        </div>
      </article>

      {open && certificateSrc ? (
        <div
          className="certificate-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-title"
            aria-describedby="certificate-privacy-note"
          >
            <div className="certificate-modal-header">
              <div>
                <p className="eyebrow">პროფესიული წევრობა</p>
                <h2 id="certificate-title">IMA წევრობის სერტიფიკატი</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="icon-button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="სერტიფიკატის ფანჯრის დახურვა"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="certificate-full-image">
              <Image
                src={certificateSrc}
                alt="Institute of Mathematics and its Applications-ის ასოცირებული წევრობის სერტიფიკატი — დავით კაპანაძე"
                width={1400}
                height={1000}
                sizes="92vw"
              />
              <span className="certificate-privacy-mask" aria-hidden="true" />
            </div>
            <p id="certificate-privacy-note">
              პირადი წევრობის ნომერი უსაფრთხოების მიზნით საჯარო ხედში
              დაფარულია.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
