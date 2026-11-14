import { splitLocalePath } from "@/i18n/paths";

/**
 * Whether a navigation entry (given by its unprefixed `path`) is the current
 * page. Works identically for "/research" and "/en/research".
 */
export function isActivePath(pathname: string, path: string) {
  if (path.includes("#")) return false;
  const current = splitLocalePath(pathname).path;
  return path === "/" ? current === "/" : current === path || current.startsWith(`${path}/`);
}
