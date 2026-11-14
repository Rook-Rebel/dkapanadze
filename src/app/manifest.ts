import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "დავით კაპანაძე — აკადემიური ვებსაიტი",
    short_name: "დავით კაპანაძე",
    description:
      "მათემატიკა, კვლევა და განათლება — დავით კაპანაძის აკადემიური ვებსაიტი.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f4",
    theme_color: "#faf9f4",
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
