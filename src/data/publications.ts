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
  /** Primary author (always Davit Kapanadze). */
  author: string;
  /** Full author list in publication order, when there are co-authors. */
  authors?: string[];
  /** Record kind, when it is not implied by the category or an arXiv ID. */
  kind?: "journal" | "textbook" | "paper";
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
  publisher?: string;
  isbn?: string;
  ebookIsbn?: string;
  publicationDate?: string;
  language?: string;
  pageCount?: number;
  /** Where it appeared, as displayed (journal, issue, pages). */
  publication?: string;
  /** Journal name only (structured data). */
  journal?: string;
  pages?: string;
  issn?: string;
  doi?: string;
  halId?: string;
  verificationNote?: string;
};

export const publications: Publication[] = [
  {
    slug: "teaching-derivative-tangent-model-dynamic-visualization",
    title:
      "Teaching the Derivative through an Algebraic–Geometric Tangent Model and Dynamic Visualization",
    georgianTitle:
      "წარმოებულის სწავლება ალგებრულ-გეომეტრიული ტანგენსის მოდელისა და დინამიური ვიზუალიზაციის მეშვეობით",
    author: "Davit Kapanadze",
    year: "2026",
    kind: "journal",
    type: "სტატია",
    status: "ჟურნალის სტატია",
    category: "education",
    categoryLabel: "მათემატიკის განათლება",
    summary:
      "სტატია წარმოებულის სწავლებას განიხილავს ალგებრულ-გეომეტრიული ტანგენსის მოდელისა და დინამიური ვიზუალიზაციის მეშვეობით.",
    abstract:
      "სტატია გამოქვეყნებულია საერთაშორისო ჟურნალში International Journal on Integrating Technology in Education (IJITE), ტ. 15, №2, გვ. 15–27. სრული ტექსტი ხელმისაწვდომია ჟურნალის ვებგვერდზე.",
    formulas: [],
    keywords: ["წარმოებული", "მხები", "დინამიური ვიზუალიზაცია", "მათემატიკის სწავლება"],
    publication: "International Journal on Integrating Technology in Education (IJITE), 15(2), 15–27",
    journal: "International Journal on Integrating Technology in Education (IJITE)",
    pages: "15–27",
    doi: "10.5121/ijite.2026.15202",
    externalUrl: "https://aircconline.com/abstract/ijite/v15n2/15226ijite02.html",
    pdfUrl: "https://aircconline.com/ijite/V15N2/15226ijite02.pdf",
  },
  {
    slug: "teaching-derivative-without-initial-limits",
    title:
      "Teaching the Derivative without the Initial Use of Limits: A Cognitive-Constructivist and Algebraic–Geometric Approach",
    georgianTitle:
      "წარმოებულის სწავლება ზღვრის საწყისი გამოყენების გარეშე: კოგნიტურ-კონსტრუქტივისტული და ალგებრულ-გეომეტრიული მიდგომა",
    author: "Davit Kapanadze",
    year: "2026",
    kind: "journal",
    type: "სტატია",
    status: "ჟურნალის სტატია",
    category: "education",
    categoryLabel: "მათემატიკის განათლება",
    summary:
      "სტატია წარმოებულის სწავლებას ზღვრის საწყისი გამოყენების გარეშე განიხილავს — კოგნიტურ-კონსტრუქტივისტული და ალგებრულ-გეომეტრიული მიდგომით.",
    abstract:
      "სტატია გამოქვეყნებულია ჟურნალში „ინტელექტი“, №2(82), გვ. 107–114 (ISSN 1512-0333). სტატია ქართულ ენაზეა.",
    formulas: [],
    keywords: ["წარმოებული ზღვრის გარეშე", "კონსტრუქტივისტული სწავლება", "მათემატიკის სწავლება"],
    publication: "ინტელექტი, №2(82), გვ. 107–114",
    journal: "Intellecti",
    pages: "107–114",
    issn: "1512-0333",
    language: "Georgian",
    externalUrl: "https://inteleqti.openjournals.ge/index.php/intelecti/issue/view/1165/755",
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
      "პრეპრინტი წარმოებულის ზღვრის გარეშე აგების ალგებრულ-გეომეტრიულ მიდგომას ელემენტარულ ფუნქციებზე ავრცელებს. სრული ტექსტი ხელმისაწვდომია arXiv-ზე.",
    formulas: ["f(x) - T_a(x) = (x - a)^2 Q(x)"],
    keywords: [
      "წარმოებული ზღვრის გარეშე",
      "ელემენტარული ფუნქციები",
      "ალგებრულ-გეომეტრიული წარმოებული",
    ],
    externalUrl: "https://arxiv.org/abs/2605.20228",
    pdfUrl: "https://arxiv.org/pdf/2605.20228",
    arxivId: "2605.20228",
    doi: "10.48550/arXiv.2605.20228",
    halId: "hal-05760397",
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
    slug: "half-order-recurrence-fractional-differentiation-monomials",
    title:
      "From the Half-Order Recurrence to General Fractional-Order Differentiation on Monomials: Functional Continuation and Operator Composition",
    georgianTitle:
      "ნახევარრიგითი რეკურენციიდან ერთწევრებზე ზოგად წილადურ დიფერენციაციამდე: ფუნქციური გაგრძელება და ოპერატორის კომპოზიცია",
    author: "Davit Kapanadze",
    year: "2026",
    type: "პრეპრინტი",
    status: "arXiv პრეპრინტი",
    category: "fractional",
    categoryLabel: "ფრაქციული აღრიცხვა",
    summary:
      "ნაშრომი ერთწევრებზე ნახევარი რიგის რეკურენციას ზოგადი წილადური რიგის დიფერენცირებამდე ავრცელებს — ფუნქციური გაგრძელებისა და ოპერატორის კომპოზიციის საშუალებით.",
    abstract:
      "ნაშრომი ერთწევრებზე ნახევარი რიგის რეკურენციას ზოგადი წილადური რიგის დიფერენცირებამდე ავრცელებს — ფუნქციური გაგრძელებისა და ოპერატორის კომპოზიციის საშუალებით. სრული ტექსტი ხელმისაწვდომია arXiv-ზე.",
    formulas: [],
    keywords: ["წილადური დიფერენცირება", "ნახევარწარმოებული", "ოპერატორის კომპოზიცია", "ერთწევრები"],
    externalUrl: "https://arxiv.org/abs/2608.19268",
    pdfUrl: "https://arxiv.org/pdf/2608.19268",
    arxivId: "2608.19268",
    doi: "10.48550/arXiv.2608.19268",
  },
  {
    slug: "student-question-half-derivative-teaching-model",
    title: "From a Student's Question to the Half-Derivative: A Constructivist Teaching Model – Part I",
    georgianTitle:
      "სტუდენტის შეკითხვიდან ნახევარწარმოებულამდე: სწავლების კონსტრუქტივისტული მოდელი — ნაწილი I",
    author: "Davit Kapanadze",
    year: "2026",
    type: "პრეპრინტი",
    status: "arXiv პრეპრინტი",
    category: "education",
    categoryLabel: "მათემატიკის განათლება",
    summary:
      "ნაშრომი წარმოადგენს სწავლების კონსტრუქტივისტულ მოდელს, რომელიც სტუდენტის შეკითხვიდან ნახევარწარმოებულის ცნებამდე მიდის (ნაწილი I).",
    abstract:
      "ნაშრომი წარმოადგენს სწავლების კონსტრუქტივისტულ მოდელს, რომელიც სტუდენტის შეკითხვიდან ნახევარწარმოებულის ცნებამდე მიდის. ეს არის სერიის პირველი ნაწილი; სრული ტექსტი ხელმისაწვდომია arXiv-ზე.",
    formulas: [],
    keywords: ["ნახევარწარმოებული", "კონსტრუქტივისტული სწავლება", "მათემატიკის სწავლება"],
    externalUrl: "https://arxiv.org/abs/2610.18932",
    pdfUrl: "https://arxiv.org/pdf/2610.18932",
    arxivId: "2610.18932",
    doi: "10.48550/arXiv.2610.18932",
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
    keywords: ["აღრიცხვა ზღვრის გარეშე", "მონოგრაფია", "წარმოებული"],
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
    slug: "derivative-without-limits-review-comparative-analysis",
    title:
      "Algebraic–Geometric Construction of the Derivative Without Limits: A Review and Comparative Analysis",
    georgianTitle:
      "წარმოებულის ალგებრულ-გეომეტრიული კონსტრუქცია ლიმიტების გარეშე: მიმოხილვა და შედარებითი ანალიზი",
    author: "Davit Kapanadze",
    authors: ["Davit Kapanadze", "A. Gaganashvili", "I. Samukashvili"],
    year: "2026",
    kind: "paper",
    type: "მიმოხილვითი ნაშრომი",
    status: "ხელმისაწვდომია Academia.edu-ზე",
    category: "analysis",
    categoryLabel: "მათემატიკური ანალიზი",
    summary:
      "მიმოხილვითი ნაშრომი წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიულ კონსტრუქციას განიხილავს და მის შედარებით ანალიზს გვთავაზობს.",
    abstract:
      "მიმოხილვითი ნაშრომი წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიულ კონსტრუქციას განიხილავს და მის შედარებით ანალიზს გვთავაზობს. ნაშრომი ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["წარმოებული ზღვრის გარეშე", "მიმოხილვა", "შედარებითი ანალიზი"],
    externalUrl: "https://seu-ge.academia.edu/DavitKapanadze",
    verificationNote: "ნაშრომის პირდაპირი ბმული ჯერ არ არის მითითებული; ბმული მიუთითებს ავტორის Academia.edu-ის პროფილზე.",
  },
  {
    slug: "fractional-derivatives-constructive-research-programme",
    title: "Fractional Derivatives: Motivation, Applications, and a Constructive Research Programme",
    georgianTitle: "წილადური წარმოებულები: მოტივაცია, გამოყენება და კონსტრუქციული კვლევითი პროგრამა",
    author: "Davit Kapanadze",
    year: "2026",
    kind: "paper",
    type: "კვლევითი ნაშრომი",
    status: "ხელმისაწვდომია Academia.edu-ზე",
    category: "fractional",
    categoryLabel: "ფრაქციული აღრიცხვა",
    summary:
      "ნაშრომი განიხილავს წილადური წარმოებულების მოტივაციასა და გამოყენებას და აყალიბებს კონსტრუქციულ კვლევით პროგრამას.",
    abstract:
      "ნაშრომი განიხილავს წილადური წარმოებულების მოტივაციასა და გამოყენებას და აყალიბებს კონსტრუქციულ კვლევით პროგრამას. სრული ტექსტი ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["წილადური წარმოებულები", "ფრაქციული აღრიცხვა", "კვლევითი პროგრამა"],
    externalUrl:
      "https://www.academia.edu/169548745/Fractional_Derivatives_Motivation_Applications_and_a_Constructive_Research_Programme",
  },
  {
    slug: "algebraic-geometric-model-teaching-derivative-guide",
    title:
      "An Algebraic–Geometric Model for Teaching the Derivative: A Methodological Guide with Two Lesson Scenarios",
    georgianTitle:
      "წარმოებულის სწავლების ალგებრულ-გეომეტრიული მოდელი: მეთოდოლოგიური სახელმძღვანელო ორგაკვეთილიანი სცენარით",
    author: "Davit Kapanadze",
    year: "2026",
    kind: "paper",
    type: "მეთოდოლოგიური სახელმძღვანელო",
    status: "ხელმისაწვდომია Academia.edu-ზე",
    category: "education",
    categoryLabel: "მათემატიკის განათლება",
    summary:
      "მეთოდოლოგიური სახელმძღვანელო წარმოებულის სწავლების ალგებრულ-გეომეტრიული მოდელით და ორი გაკვეთილის სცენარით.",
    abstract:
      "მეთოდოლოგიური სახელმძღვანელო წარმოებულის სწავლების ალგებრულ-გეომეტრიული მოდელით და ორი გაკვეთილის სცენარით. სრული ტექსტი ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["წარმოებული", "მეთოდოლოგიური სახელმძღვანელო", "გაკვეთილის სცენარი", "მათემატიკის სწავლება"],
    externalUrl:
      "https://www.academia.edu/170185768/An_Algebraic_Geometric_Model_for_Teaching_the_Derivative_A_Methodological_Guide_with_Two_Lesson_Scenarios",
  },
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
      "გამოცემის მონაცემები და მუდმივი ბმული ჯერ არ არის ხელმისაწვდომი.",
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
      "გამოცემის მონაცემები ჯერ არ არის ხელმისაწვდომი.",
  },
  {
    slug: "mathematics-10-school-textbook",
    title: "Mathematics 10",
    georgianTitle: "მათემატიკა 10",
    author: "Davit Kapanadze",
    authors: ["T. Beitirishvili", "G. Berikelashvili", "D. Kapanadze", "K. Manjgaladze"],
    year: "2006",
    kind: "textbook",
    type: "სასკოლო სახელმძღვანელო",
    status: "გამოცემული სახელმძღვანელო",
    category: "historical",
    categoryLabel: "ადრეული ნაშრომები",
    summary:
      "მე-10 კლასის მათემატიკის სასკოლო სახელმძღვანელო (თანაავტორობით). შერჩეული თავები ხელმისაწვდომია Academia.edu-ზე.",
    abstract:
      "მე-10 კლასის მათემატიკის სასკოლო სახელმძღვანელო, გამოცემული გამომცემლობა „დიოგენეს“ მიერ (თბილისი, 2006). შერჩეული თავები ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["სასკოლო სახელმძღვანელო", "მათემატიკა", "მე-10 კლასი"],
    publisher: "Diogene Publishing House, Tbilisi",
    externalUrl:
      "https://www.academia.edu/168720113/Selected_Sections_from_the_Georgian_School_Textbook_Mathematics_10",
  },
  {
    slug: "methodology-introducing-function",
    title: "On the Methodology for Introducing the Concept of Function",
    georgianTitle: "ფუნქციის ცნების შემოტანის მეთოდიკა",
    author: "Davit Kapanadze",
    year: "2005",
    type: "სტატია",
    status: "ჟურნალის სტატია",
    category: "historical",
    categoryLabel: "ადრეული ნაშრომები",
    summary:
      "ფუნქციის ცნების თანმიმდევრული და გასაგები შემოტანისადმი მიძღვნილი სასწავლო-მეთოდური სტატია.",
    abstract:
      "სასწავლო-მეთოდური სტატია ფუნქციის ცნების შემოტანის შესახებ, გამოქვეყნებული ჟურნალში „ფიზიკა და მათემატიკა სკოლაში“, გვ. 52–57. სტატია ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["ფუნქცია", "მათემატიკის სწავლება", "მეთოდიკა"],
    publication: "ფიზიკა და მათემატიკა სკოლაში, №121",
    journal: "Physics and Mathematics at School",
    pages: "52–57",
    externalUrl: "https://www.academia.edu/168065102/On_the_Methodology_for_Introducing_the_Concept_of_Function",
  },
  {
    slug: "foundations-analysis-school-course",
    title:
      "Foundations of Mathematical Analysis and the School Mathematics Course: A Historical–Methodological Review",
    georgianTitle:
      "მათემატიკური ანალიზის საფუძვლები და სასკოლო მათემატიკის კურსი: ისტორიულ-მეთოდოლოგიური მიმოხილვა",
    author: "Davit Kapanadze",
    year: "2000",
    type: "სტატია",
    status: "ჟურნალის სტატია",
    category: "historical",
    categoryLabel: "ადრეული ნაშრომები",
    summary:
      "მათემატიკური ანალიზის საფუძვლებისა და სასკოლო მათემატიკის კურსის ისტორიულ-მეთოდოლოგიური ურთიერთობის მიმოხილვა.",
    abstract:
      "ადრეული ნაშრომი მათემატიკური ანალიზის საფუძვლებისა და სასკოლო მათემატიკის კურსის ურთიერთკავშირის შესახებ, გამოქვეყნებული ჟურნალში „ფიზიკა და მათემატიკა სკოლაში“ (№116). ნაშრომი ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["მათემატიკური ანალიზი", "სასკოლო მათემატიკა", "ისტორია", "მეთოდოლოგია"],
    publication: "ფიზიკა და მათემატიკა სკოლაში, №116",
    journal: "Physics and Mathematics at School",
    externalUrl: "https://seu-ge.academia.edu/DavitKapanadze",
    verificationNote:
      "გვერდების მონაცემი და ნაშრომის პირდაპირი ბმული ჯერ არ არის მითითებული; ბმული მიუთითებს ავტორის Academia.edu-ის პროფილზე.",
  },
  {
    slug: "polynomial-behaviour-derivatives",
    title: "Investigation of Polynomial Behaviour Using Derivatives",
    georgianTitle: "პოლინომური ქცევის კვლევა წარმოებულების გამოყენებით",
    author: "Davit Kapanadze",
    year: "1993",
    kind: "paper",
    type: "კვლევითი ნაშრომი",
    status: "ხელმისაწვდომია Academia.edu-ზე",
    category: "historical",
    categoryLabel: "ადრეული ნაშრომები",
    summary: "მრავალწევრების ქცევის კვლევა წარმოებულების გამოყენებით.",
    abstract:
      "ადრეული ნაშრომი მრავალწევრების ქცევის წარმოებულების გამოყენებით კვლევის შესახებ. ნაშრომი ხელმისაწვდომია Academia.edu-ზე.",
    formulas: [],
    keywords: ["მრავალწევრი", "წარმოებული", "ფუნქციის კვლევა"],
    externalUrl: "https://seu-ge.academia.edu/DavitKapanadze",
    verificationNote: "ნაშრომის პირდაპირი ბმული ჯერ არ არის მითითებული; ბმული მიუთითებს ავტორის Academia.edu-ის პროფილზე.",
  },
];

export function getCitation(publication: Publication) {
  const authors = publication.authors?.join(", ") ?? publication.author;
  const details = [
    `${authors} (${publication.year}).`,
    `${publication.title}${publication.subtitle ? `: ${publication.subtitle}` : ""}.`,
    publication.publication
      ? `${publication.publication}${
          publication.pages && !publication.publication.includes(publication.pages) ? `, ${publication.pages}` : ""
        }.`
      : null,
    publication.arxivId ? `arXiv:${publication.arxivId}.` : null,
    publication.publisher ? `${publication.publisher}.` : null,
    publication.isbn ? `ISBN ${publication.isbn}.` : null,
    publication.doi ? `https://doi.org/${publication.doi}` : null,
  ];

  return details.filter(Boolean).join(" ");
}
