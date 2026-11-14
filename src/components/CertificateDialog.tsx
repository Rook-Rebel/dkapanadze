"use client";

import Image from "next/image";
import { useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import type { Locale } from "@/i18n";

/**
 * Shown only when a (privacy-masked) certificate image is configured in
 * `siteConfig.membership.certificateImage`. Uses a native modal <dialog>.
 */
export function CertificateDialog({ src, locale }: { src: string; locale: Locale }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const en = locale === "en";

  return (
    <>
      <button
        className="button button-secondary"
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        {en ? "View certificate" : "სერტიფიკატის ნახვა"}
        <ExternalLink aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        className="certificate-dialog"
        aria-labelledby="certificate-title"
        aria-describedby="certificate-note"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="certificate-panel">
          <div className="certificate-header">
            <h2 id="certificate-title">
              {en ? "IMA membership certificate" : "IMA წევრობის სერტიფიკატი"}
            </h2>
            <button
              className="icon-button"
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={en ? "Close" : "დახურვა"}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="certificate-image">
            <Image
              src={src}
              alt={
                en
                  ? "Institute of Mathematics and its Applications Associate membership certificate — Davit Kapanadze"
                  : "Institute of Mathematics and its Applications-ის ასოცირებული წევრობის სერტიფიკატი — დავით კაპანაძე"
              }
              width={1400}
              height={1000}
              sizes="(max-width: 1000px) 92vw, 900px"
            />
          </div>
          <p id="certificate-note">
            {en
              ? "The private membership number is masked in the public view."
              : "პირადი წევრობის ნომერი საჯარო ხედში დაფარულია."}
          </p>
        </div>
      </dialog>
    </>
  );
}
