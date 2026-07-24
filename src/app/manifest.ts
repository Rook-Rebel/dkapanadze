import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "დავით კაპანაძე — აკადემიური პორტფოლიო",
    short_name: "დავით კაპანაძე",
    description:
      "მათემატიკა, კვლევა და განათლება — დავით კაპანაძის აკადემიური სივრცე.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCF8",
    theme_color: "#FCFCF8",
    lang: "ka",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
