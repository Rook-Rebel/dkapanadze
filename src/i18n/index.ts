export const locales = ["ka", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ka";
export const languageCookie = "dk-language";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export type NavigationItem = { label: string; href: string };

export const navigation: Record<Locale, readonly NavigationItem[]> = {
  ka: [
    { label: "მთავარი", href: "/" },
    { label: "დავით კაპანაძე", href: "/davit-kapanadze" },
    { label: "კვლევა", href: "/research" },
    { label: "ნაშრომები", href: "/publications" },
    { label: "სწავლება", href: "/teaching" },
    { label: "ინტერაქტიული სივრცე", href: "/interactive" },
    { label: "პროექტები", href: "/interactive#projects" },
    { label: "დაკავშირება", href: "/contact" },
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "Davit Kapanadze", href: "/davit-kapanadze" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Teaching", href: "/teaching" },
    { label: "Interactive", href: "/interactive" },
    { label: "Projects", href: "/interactive#projects" },
    { label: "Contact", href: "/contact" },
  ],
};

export const ui = {
  ka: {
    skip: "მთავარ შინაარსზე გადასვლა",
    mainNavigation: "მთავარი ნავიგაცია",
    mobileNavigation: "საიტის ნავიგაცია",
    mainMenu: "მენიუ",
    openMenu: "მენიუს გახსნა",
    closeMenu: "მენიუს დახურვა",
    contact: "დაკავშირება",
    home: "მთავარი",
    homePage: "მთავარი გვერდი",
    breadcrumbs: "გვერდის მდებარეობა",
    details: "ვრცლად",
    readMore: "ვრცლად",
    viewDirection: "მიმართულების ნახვა",
    copyCitation: "ციტირების კოპირება",
    copied: "დაკოპირდა",
    copyFailed: "კოპირება ვერ მოხერხდა",
    copy: "კოპირება",
    viewArxiv: "arXiv",
    externalSource: "გარე წყარო",
    externalNewTab: "გარე წყაროს გახსნა ახალ ჩანართში",
    openPdf: "PDF",
    pdfNewTab: "ნაშრომის PDF-ის გახსნა ახალ ჩანართში",
    newTab: "(იხსნება ახალ ჩანართში)",
    changeTheme: "ღია და მუქი თემის გადართვა",
    lightMode: "ღია რეჟიმზე გადასვლა",
    darkMode: "მუქ რეჟიმზე გადასვლა",
    socialProfiles: "აკადემიური და სოციალური პროფილები",
    openProfile: "პროფილის გახსნა ახალ ჩანართში",
    chooseLanguage: "ენის არჩევა",
    georgian: "ქართული",
    english: "English",
  },
  en: {
    skip: "Skip to main content",
    mainNavigation: "Main navigation",
    mobileNavigation: "Site navigation",
    mainMenu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contact: "Contact",
    home: "Home",
    homePage: "Home page",
    breadcrumbs: "Breadcrumb",
    details: "Details",
    readMore: "Read More",
    viewDirection: "Explore this area",
    copyCitation: "Copy citation",
    copied: "Copied",
    copyFailed: "Copy failed",
    copy: "Copy",
    viewArxiv: "arXiv",
    externalSource: "External source",
    externalNewTab: "Open the external source in a new tab",
    openPdf: "PDF",
    pdfNewTab: "Open the publication PDF in a new tab",
    newTab: "(opens in a new tab)",
    changeTheme: "Switch between light and dark theme",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    socialProfiles: "Academic and social profiles",
    openProfile: "Open profile in a new tab",
    chooseLanguage: "Choose language",
    georgian: "ქართული",
    english: "English",
  },
} as const;

export type UiLabels = (typeof ui)[Locale];

export function getNavigation(locale: Locale) {
  return navigation[locale];
}

export function getUi(locale: Locale): UiLabels {
  return ui[locale];
}
