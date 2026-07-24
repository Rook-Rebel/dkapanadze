export type PublicationCategory =
  | "analysis"
  | "education"
  | "fractional"
  | "monograph"
  | "historical";

export type Publication = {
  slug: string;
  title: string;
  subtitle?: string;
  georgianTitle: string;
  author: "Davit Kapanadze";
  year: string;
  type: string;
  status: string;
  category: PublicationCategory;
  categoryLabel: string;
  summary: string;
  abstract: string;
  formulas: string[];
  keywords: string[];
  externalUrl?: string;
  pdfUrl?: string;
  arxivId?: string;
  pdfPath?: string;
  publisher?: string;
  isbn?: string;
  ebookIsbn?: string;
  publicationDate?: string;
  language?: string;
  pageCount?: number;
  publication?: string;
  verificationNote?: string;
};

export const categoryLabels: Record<PublicationCategory, string> = {
  analysis: "მათემატიკური ანალიზი",
  education: "მათემატიკის განათლება",
  fractional: "ფრაქციული აღრიცხვა",
  monograph: "მონოგრაფია",
  historical: "ისტორიული ნაშრომები",
};

export const publications: Publication[] = [
  {
    slug: "cognitive-constructivist-foundations-derivative-without-limits",
    title:
      "Cognitive-Constructivist Foundations and an Algebraic–Geometric Model for Teaching the Derivative Without Limits",
    georgianTitle:
      "კოგნიტურ-კონსტრუქტივისტული საფუძვლები და წარმოებულის ზღვრის გარეშე სწავლების ალგებრულ-გეომეტრიული მოდელი",
    author: "Davit Kapanadze",
    year: "2026",
    type: "კვლევითი ხელნაწერი",
    status: "ხელნაწერი",
    category: "education",
    categoryLabel: "მათემატიკის განათლება",
    summary:
      "წარმოებული თავდაპირველად ზღვრის ფორმალური განსაზღვრების გარეშე შემოდის — კვადრატული ფუნქციის, ორმაგი ფესვის, გეომეტრიული მხების, ბეზუს თეორემისა და ალგებრულ-გეომეტრიული კრიტერიუმის გამოყენებით.",
    abstract:
      "ნაშრომის ძირითადი იდეაა წარმოებულის ცნების აგება მოსწავლისთვის უკვე ნაცნობი ალგებრული და გეომეტრიული კონსტრუქციებიდან. კვადრატული ფუნქცია, ორმაგი ფესვი და მხები ქმნის საწყის მოდელს, ხოლო ფაქტორიზაციის კრიტერიუმი მიდგომას მრავალწევრებზე ავრცელებს.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: [
      "წარმოებული ზღვრის გარეშე",
      "კონსტრუქტივისტული სწავლება",
      "ორმაგი ფესვი",
      "მხები",
    ],
    verificationNote:
      "გამოქვეყნების სტატუსი, რედაქცია და მუდმივი ბმული ჯერ არ არის მოწოდებული.",
  },
  {
    slug: "teaching-derivative-polynomial-case",
    title:
      "Teaching the Derivative through an Algebraic–Geometric Constructivist Model: The Polynomial Case",
    georgianTitle:
      "წარმოებულის სწავლება ალგებრულ-გეომეტრიული კონსტრუქტივისტული მოდელით: მრავალწევრის შემთხვევა",
    author: "Davit Kapanadze",
    year: "2026",
    type: "კვლევითი ხელნაწერი",
    status: "ხელნაწერი",
    category: "education",
    categoryLabel: "მათემატიკის განათლება და მრავალწევრთა აღრიცხვა",
    summary:
      "მრავალწევრი ფუნქციებისთვის წარმოებულის სწავლების მოდელი, რომელიც ორმაგ ფესვს, მხებ წრფესა და ფაქტორიზაციას ერთ კონცეპტუალურ ჯაჭვად აერთიანებს.",
    abstract:
      "ხელნაწერი განიხილავს მრავალწევრის შემთხვევას, სადაც მხების პირობა ალგებრულად ფუნქციასა და მის შესაბამის წრფეს შორის სხვაობის ორმაგი ფესვით გამოიხატება. მიდგომა წარმოებულის წესებს წინასწარ ნაცნობი სტრუქტურებიდან ავითარებს.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: ["მრავალწევრი", "წარმოებული", "ალგებრული გეომეტრია", "სწავლება"],
    verificationNote:
      "მიღების ან გამოქვეყნების დამადასტურებელი ჩანაწერი ჯერ არ არის მოწოდებული.",
  },
  {
    slug: "algebraic-operator-half-derivative",
    title:
      "An Algebraic-Operator Construction of the Half-Derivative on a Graded Monomial Space. Part I: Recurrence, Double Factorials, the Wallis Product, and Normalization",
    georgianTitle:
      "ნახევარწარმოებულის ალგებრულ-ოპერატორული კონსტრუქცია გრადუირებულ მონომურ სივრცეზე",
    author: "Davit Kapanadze",
    year: "2026",
    type: "პრეპრინტი",
    status: "arXiv პრეპრინტი",
    category: "fractional",
    categoryLabel: "ფრაქციული აღრიცხვა",
    summary:
      "ნაშრომი აგებს ნახევარი რიგის დიფერენცირების ოპერატორს გრადუირებულ მონომურ სივრცეზე. კონსტრუქცია ეფუძნება ოპერატორულ კომპოზიციას, რეკურენტულ დამოკიდებულებებს, ორმაგ ფაქტორიალებსა და უოლისის ნამრავლს.",
    abstract:
      "ნაშრომი იკვლევს ოპერატორს, რომლის საკუთარ თავთან კომპოზიცია ჩვეულებრივ დიფერენცირებას იძლევა. კოეფიციენტები განისაზღვრება რეკურენტული თანაფარდობით და უკავშირდება ორმაგ ფაქტორიალებსა და უოლისის ნამრავლს.",
    formulas: [
      "c(\\beta)c(\\beta - 1/2)=\\beta",
      "D^{1/2} \\circ D^{1/2} = D",
    ],
    keywords: [
      "ნახევარწარმოებული",
      "ფრაქციული აღრიცხვა",
      "ოპერატორი",
      "უოლისის ნამრავლი",
    ],
    externalUrl: "https://arxiv.org/abs/2607.19482",
    pdfUrl: "https://arxiv.org/pdf/2607.19482",
    arxivId: "2607.19482",
  },
  {
    slug: "limit-free-elementary-functions",
    title:
      "A Limit-Free Algebraic-Geometric Construction of Derivatives for Elementary Functions",
    georgianTitle:
      "ელემენტარული ფუნქციების წარმოებულთა ზღვრის გარეშე ალგებრულ-გეომეტრიული კონსტრუქცია",
    author: "Davit Kapanadze",
    year: "2026",
    type: "პრეპრინტი",
    status: "arXiv პრეპრინტი",
    category: "analysis",
    categoryLabel: "მათემატიკური ანალიზი",
    summary:
      "ნაშრომი წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიულ კონსტრუქციას ავრცელებს რაციონალურ ხარისხობრივ, ექსპონენციალურ, ლოგარითმულ, ტრიგონომეტრიულ და შებრუნებულ ტრიგონომეტრიულ ფუნქციებზე.",
    abstract:
      "პრეპრინტი წარმოებულის ზღვრის გარეშე აგების ალგებრულ-გეომეტრიულ მიდგომას ელემენტარულ ფუნქციებთან აკავშირებს. ამ ჩანაწერში მოცემულია მხოლოდ მოწოდებული სათაური, ავტორი, წელი და arXiv იდენტიფიკატორი.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: ["limit-free derivative", "elementary functions", "algebraic-geometric derivative"],
    externalUrl: "https://arxiv.org/abs/2605.20228",
    pdfUrl: "https://arxiv.org/pdf/2605.20228",
    arxivId: "2605.20228",
  },
  {
    slug: "limit-free-polynomial-foundational-model",
    title:
      "A Limit-Free Algebraic-Geometric Construction of the Derivative with a Foundational Model in the Class of Polynomial Functions",
    georgianTitle:
      "წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიული კონსტრუქცია მრავალწევრი ფუნქციების კლასში აგებული ფუნდამენტური მოდელით",
    author: "Davit Kapanadze",
    year: "2026",
    type: "პრეპრინტი",
    status: "arXiv პრეპრინტი",
    category: "analysis",
    categoryLabel: "მათემატიკური ანალიზი და მათემატიკის განათლება",
    summary:
      "ნაშრომი მრავალწევრი ფუნქციების კლასში წარმოებულს აგებს მხები წრფისა და ორმაგი ფესვის ალგებრული პირობის საფუძველზე, ზღვრის საწყის განსაზღვრებად გამოყენების გარეშე.",
    abstract:
      "მრავალწევრი ფუნქციების კლასში წარმოებულის ფუნდამენტური მოდელი ეყრდნობა მხები წრფისა და ორმაგი ფესვის ალგებრულ კავშირს. arXiv პრეპრინტი მიდგომას აყალიბებს ზღვრის საწყის განსაზღვრებად გამოყენების გარეშე.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: [
      "წარმოებული ზღვრის გარეშე",
      "მრავალწევრი ფუნქციები",
      "ორმაგი ფესვი",
      "მათემატიკის განათლება",
    ],
    externalUrl: "https://arxiv.org/abs/2604.20888",
    pdfUrl: "https://arxiv.org/pdf/2604.20888",
    arxivId: "2604.20888",
  },
  {
    slug: "calculus-without-limits-monograph",
    title:
      "Calculus Without Limits: An Algebraic–Geometric Construction of the Derivative",
    georgianTitle:
      "აღრიცხვა ზღვრის გარეშე: წარმოებულის ალგებრულ-გეომეტრიული კონსტრუქცია",
    author: "Davit Kapanadze",
    year: "2026",
    type: "მონოგრაფია",
    status: "გამოცემული მონოგრაფია",
    category: "monograph",
    categoryLabel: "მონოგრაფია",
    summary:
      "წიგნი წარმოადგენს წარმოებულის ალგებრულ და გეომეტრიულ-ფუნქციურ კონსტრუქციას ელემენტარული ფუნქციებისთვის, ზღვრის საწყის განსაზღვრებად გამოყენების გარეშე.",
    abstract:
      "წიგნი წარმოადგენს წარმოებულის ალგებრულ და გეომეტრიულ-ფუნქციურ კონსტრუქციას ელემენტარული ფუნქციებისთვის, ზღვრის საწყის განსაზღვრებად გამოყენების გარეშე. კლასიკური ზღვრული წარმოდგენა მოგვიანებით ჩნდება, როგორც უკვე აგებული გეომეტრიული დიფერენციალის ანალიზური ფორმალიზაცია.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: ["calculus without limits", "მონოგრაფია", "წარმოებული"],
    publisher: "AuthorHouse",
    isbn: "9798823096607",
    ebookIsbn: "9798823096614",
    publicationDate: "2026-04-26",
    language: "English",
    pageCount: 54,
    externalUrl:
      "https://www.authorhouse.com/en/bookstore/bookdetails/874420-calculus-without-limits",
  },
  {
    slug: "foundations-analysis-school-course",
    title:
      "Foundations of Mathematical Analysis and the School Mathematics Course: A Historical–Methodological Review",
    georgianTitle:
      "მათემატიკური ანალიზის საფუძვლები და სასკოლო მათემატიკის კურსი: ისტორიულ-მეთოდოლოგიური მიმოხილვა",
    author: "Davit Kapanadze",
    year: "1999/2000",
    type: "სტატია",
    status: "ბიბლიოგრაფია გადასამოწმებელია",
    category: "historical",
    categoryLabel: "ისტორიული ნაშრომები",
    summary:
      "მათემატიკური ანალიზის საფუძვლებისა და სასკოლო მათემატიკის კურსის ისტორიულ-მეთოდოლოგიური ურთიერთობის მიმოხილვა.",
    abstract:
      "სრული ბიბლიოგრაფიული მონაცემები და ტექსტის ანოტაცია ჯერ არ არის მოწოდებული; ჩანაწერი ნეიტრალურად ასახავს მხოლოდ ცნობილ სათაურს, ავტორსა და თარიღს.",
    formulas: [],
    keywords: ["მათემატიკური ანალიზი", "სასკოლო მათემატიკა", "ისტორია", "მეთოდოლოგია"],
    verificationNote:
      "საჭიროა ჟურნალის, ტომის, ნომრის, გვერდებისა და ზუსტი გამოცემის წლის დადასტურება.",
  },
  {
    slug: "methodology-introducing-function",
    title: "A Methodology for Introducing the Concept of Function",
    georgianTitle: "ფუნქციის ცნების შემოტანის მეთოდიკა",
    author: "Davit Kapanadze",
    year: "2005",
    type: "სტატია",
    status: "ბიბლიოგრაფიული ჩანაწერი",
    category: "historical",
    categoryLabel: "ისტორიული ნაშრომები",
    summary:
      "ფუნქციის ცნების თანმიმდევრული და გასაგები შემოტანისადმი მიძღვნილი სასწავლო-მეთოდური სტატია.",
    abstract:
      "ჩანაწერი ეფუძნება მოწოდებულ სათაურსა და გამოცემის მონაცემს. სრული ანოტაცია, გვერდები და ციფრული წყარო ჯერ არ არის მოწოდებული.",
    formulas: [],
    keywords: ["ფუნქცია", "მათემატიკის სწავლება", "მეთოდიკა"],
    publication: "Physics and Mathematics at School, No. 121",
    verificationNote: "საჭიროა გვერდებისა და გამოცემის სრული მონაცემების დადასტურება.",
  },
];

export function getPublication(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}

export function getCitation(publication: Publication) {
  const details = [
    `${publication.author} (${publication.year}).`,
    `${publication.title}${publication.subtitle ? `: ${publication.subtitle}` : ""}.`,
    publication.arxivId ? `arXiv:${publication.arxivId}.` : null,
    publication.publication ? `${publication.publication}.` : null,
    publication.publisher ? `${publication.publisher}.` : null,
    publication.isbn ? `ISBN ${publication.isbn}.` : null,
  ];

  return details.filter(Boolean).join(" ");
}
