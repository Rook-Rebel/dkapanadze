import type { Locale } from ".";
import {
  aboutContent,
  homeContent,
  learningSequence,
  researchFocus,
  teachingPrinciples,
  timeline,
} from "@/content/site-content";

const english = {
  homeContent: {
    eyebrow: "Mathematics · Research · Education",
    title: "Davit Kapanadze",
    subtitle: "Mathematician, Researcher and Professor",
    statement:
      "Research at the intersection of algebra, geometry, and mathematics education — constructing the derivative from algebraic and geometric structures that learners already know.",
    markers: [
      "Mathematical analysis",
      "Mathematics education",
      "Algebraic–geometric approaches",
      "Fractional calculus",
    ],
    idea:
      "If a line is tangent to the graph of a polynomial at a point, the difference between the polynomial and the line has a double root there. This algebraic factor connects slope and the derivative with their geometric meaning.",
  },
  researchFocus: [
    {
      index: "01",
      title: "The derivative without limits",
      description:
        "An initial construction of the derivative for polynomial functions, based on the double root, the tangent line, and an algebraic–geometric criterion.",
      formula: "f(x) - T_a(x) = (x - a)^2 Q(x)",
      href: "/research/derivative-without-limits",
    },
    {
      index: "02",
      title: "An operator construction of the half-derivative",
      description:
        "An algebraic construction of the half-order differentiation operator on a graded monomial space, using composition and recurrence relations.",
      formula: "D^{1/2} \\circ D^{1/2} = D",
      href: "/research/half-derivative",
    },
    {
      index: "03",
      title: "A cognitive-constructivist model for mathematics education",
      description:
        "Teaching advanced analytic concepts from algebraic and geometric structures already familiar to the learner.",
      formula: null,
      href: "/teaching",
    },
  ],
  learningSequence: [
    { title: "Double root", description: "Recognising the factor (x − a)² in the difference.", icon: "double-root" },
    { title: "Tangent", description: "A line and a curve share a direction at one point.", icon: "tangent" },
    { title: "Slope", description: "The coefficient of the tangent line describes the rate of change.", icon: "slope" },
    { title: "Derivative", description: "Slope becomes a pointwise characteristic of the function.", icon: "derivative" },
    { title: "Differentiation rules", description: "Algebraic operations are consolidated into general rules.", icon: "rules" },
    { title: "Elementary functions", description: "The construction extends to broader classes of functions.", icon: "functions" },
    { title: "Connection to the limit", description: "The constructed geometric concept is linked to its analytic formalisation.", icon: "limit" },
  ],
  timeline: [
    { period: "1999/2000", title: "Historical and methodological research", text: "A review of the relationship between the foundations of mathematical analysis and the school mathematics curriculum." },
    { period: "2005", title: "Teaching the concept of function", text: "A methodological study on introducing the concept of function." },
    { period: "2026", title: "The algebraic–geometric programme", text: "Work on constructing the derivative without limits and on its constructivist teaching model." },
    { period: "2026", title: "The half-derivative operator", text: "An algebraic construction of half-order differentiation on a graded monomial space." },
  ],
  aboutContent: {
    biography: [
      "Davit Kapanadze is a Doctor of Pedagogical Sciences and a professor at Georgian National University SEU. His research focuses on the limit-free algebraic–geometric construction of the derivative, mathematics education, and fractional derivatives.",
      "He works at the Faculty of Business and Technology of Georgian National University SEU in Tbilisi. His research interests bring together mathematical analysis, fractional calculus, and mathematics education.",
    ],
    interests: [
      "Mathematical analysis and its foundations",
      "Algebraic–geometric construction of the derivative",
      "Fractional derivatives and fractional calculus",
      "Mathematics education and cognitive-constructivist teaching",
      "Conceptual connections between algebra and geometry",
    ],
    academicActivity:
      "As a professor at the Faculty of Business and Technology of Georgian National University SEU, Davit Kapanadze combines mathematical precision, geometric intuition, and the progressive pedagogical construction of concepts in both research and teaching.",
    teachingVision:
      "Teaching begins with familiar structures: roots, factorisation, lines, and tangents. Formal analytic language is introduced once the learner has developed an algebraic and geometric understanding of the concept.",
  },
  teachingPrinciples: [
    { title: "From the known to the unknown", text: "A new concept is grounded in algebraic operations and geometric representations that the learner already understands." },
    { title: "Connecting algebra and geometry", text: "Formula and diagram explain one another: factorisation describes geometric contact, while the tangent gives meaning to the algebraic condition." },
    { title: "Reducing cognitive load", text: "Complexity is divided into successive stages, so that only one new relationship needs to be processed at a time." },
    { title: "Understanding before memorisation", text: "Differentiation rules are presented as consequences of an understood structure, not as a list of isolated formulas." },
    { title: "The role of visualisation", text: "A dynamic graph, the tangent, and the double root make it possible to see the same idea in several mathematical languages." },
  ],
} as const;

export function getContent(locale: Locale) {
  if (locale === "en") return english;
  return {
    homeContent,
    researchFocus,
    learningSequence,
    timeline,
    aboutContent,
    teachingPrinciples,
  };
}

export const pageText = {
  ka: {
    home: {
      heroPublications: "ნაშრომების ნახვა",
      heroResearch: "კვლევითი მიმართულებები",
      heroCriterion: "ცენტრალური კრიტერიუმი",
      heroAreas: "კვლევითი მიმართულებები",
      researchEyebrow: "კვლევის ფოკუსი",
      researchTitle: "ერთი იდეა — რამდენიმე მათემატიკური ენა",
      researchDescription:
        "კვლევითი მიმართულებები აერთიანებს ალგებრულ სტრუქტურას, გეომეტრიულ ინტუიციას, ოპერატორულ კონსტრუქციას და სწავლების თანმიმდევრულ მოდელს.",
      learningEyebrow: "სასწავლო თანმიმდევრობა",
      learningTitle: "ცნობილი სტრუქტურიდან ანალიზურ ცნებამდე",
      learningDescription:
        "შვიდი დაკავშირებული ნაბიჯი ორმაგი ფესვიდან ზღვართან ანალიზურ კავშირამდე.",
      ideaEyebrow: "ცენტრალური იდეა",
      ideaTitle: "შეხება, რომელიც ფაქტორიზაციით იკითხება",
      ideaAction: "იდეის სრული განმარტება",
      geometricCondition: "გეომეტრიული პირობა",
      geometricText: "წრფე Tₐ ფუნქციის გრაფიკს x = a წერტილში ეხება.",
      algebraicTranslation: "ალგებრული თარგმანი",
      algebraicText: "ფუნქციისა და წრფის სხვაობას x = a წერტილში ორმაგი ფესვი აქვს.",
      factorisationCriterion: "ფაქტორიზაციის კრიტერიუმი",
      criterionText: "სხვაობაში გამოიყოფა მამრავლი (x − a)²:",
      publicationsEyebrow: "რჩეული ნაშრომები",
      publicationsTitle: "კვლევითი ტექსტები და ბიბლიოგრაფია",
      publicationsDescription:
        "ბოლოდროინდელი პრეპრინტები, ხელნაწერები და მონოგრაფია. თითოეულ ჩანაწერზე მითითებულია მისი გამოქვეყნების ამჟამინდელი სტატუსი.",
      bibliography: "სრული ბიბლიოგრაფია",
      timelineEyebrow: "აკადემიური ქრონოლოგია",
      timelineTitle: "თემების განვითარება დროში",
      timelineDescription: "ადრეული მეთოდური კვლევებიდან მიმდინარე ალგებრულ-გეომეტრიულ პროგრამამდე.",
      teachingEyebrow: "პედაგოგიური ხედვა",
      teachingTitle: "გაგება — ფორმულის გამოყენებამდე",
      teachingText:
        "სწავლების მოდელი მოსწავლეს ჯერ ცნების შიდა სტრუქტურას აჩვენებს, შემდეგ კი მას ფორმალურ წესებსა და ანალიზურ განსაზღვრებას უკავშირებს. მიზანია მათემატიკური ენის გაცნობიერებული გამოყენება და არა იზოლირებული ალგორითმების დამახსოვრება.",
      teachingAction: "სწავლების მიდგომის ნახვა",
      conceptualUnderstanding: "კონცეპტუალური გაგება",
      algebra: "ალგებრა",
      geometry: "გეომეტრია",
      analysis: "ანალიზი",
      interactiveEyebrow: "ინტერაქტიული სივრცე",
      interactiveTitle: "ნახეთ, როგორ მოძრაობს მხები",
      interactiveText:
        "შეცვალეთ შეხების წერტილი და დააკვირდით, როგორ განახლდება ერთდროულად მხები, მისი განტოლება და ორმაგი ფესვის ფაქტორიზაცია.",
      openDemo: "დემონსტრაციის გახსნა",
      tangentVisualisation: "მხები წრფის ვიზუალიზაცია",
      tangentDescription: "წერტილი, მხები და დახრილობა ერთიან გეომეტრიულ სურათში.",
      halfDerivative: "ნახევარწარმოებული",
      halfDerivativeDescription: "ოპერატორული კომპოზიციისა და რეკურენციის ვიზუალური იდეა.",
      projectsEyebrow: "პროექტები",
      projectsTitle: "ინტერაქტიული პროექტები",
      projectsDescription:
        "ორი დამოუკიდებელი პლატფორმა მათემატიკური მოდელების კვლევისა და ვიზუალური სწავლებისთვის.",
      contactEyebrow: "აკადემიური მიმოწერა",
      contactTitle: "კვლევითი დიალოგისთვის",
      contactText:
        "კვლევით თანამშრომლობასთან, გამოცემებთან ან მათემატიკის სწავლებასთან დაკავშირებული წერილებისთვის გამოიყენეთ აკადემიური საკონტაქტო არხი.",
      contactAction: "დაკავშირება",
      profileAction: "აკადემიური პროფილი",
    },
    about: {
      title: "დავით კაპანაძე",
      metaTitle: "აკადემიური პროფილი",
      eyebrow: "აკადემიური პროფილი",
      description:
        "დავით კაპანაძის აკადემიური პროფილი: კვლევითი ინტერესები, პედაგოგიური ხედვა, პროფესიული კავშირები და საკონტაქტო ინფორმაცია.",
      lede: "პედაგოგიკურ მეცნიერებათა დოქტორი, საქართველოს ეროვნული უნივერსიტეტი SEU-ს ბიზნესისა და ტექნოლოგიების ფაკულტეტის პროფესორი. კვლევითი ინტერესები: მათემატიკური ანალიზი, ფრაქციული აღრიცხვა და მათემატიკის განათლება.",
      biography: "მოკლე ბიოგრაფია",
      interests: "კვლევითი ინტერესები",
      activity: "აკადემიური საქმიანობა",
      bibliography: "ნაშრომების ბიბლიოგრაფია",
      teaching: "პედაგოგიური ხედვა",
      teachingAction: "სწავლების მიდგომა",
      connections: "პროფესიული კავშირები",
      connectionsText:
        "აკადემიური კავშირი: საქართველოს ეროვნული უნივერსიტეტი SEU, თბილისი, საქართველო. დავით კაპანაძე ასევე არის Institute of Mathematics and its Applications-ის ასოცირებული წევრი (AMIMA), გაერთიანებული სამეფო.",
      profiles: "ORCID და აკადემიური პროფილები",
      profilesText: "საჯარო აკადემიური და პროფესიული პროფილები: ORCID, Academia.edu, LinkedIn და Facebook.",
      summaryLabel: "აკადემიური პროფილის მოკლე მონაცემები",
    },
    research: {
      title: "კვლევა",
      eyebrow: "კვლევითი პროგრამა",
      description:
        "დავით კაპანაძის კვლევითი მიმართულებები: წარმოებული ზღვრის გარეშე, ნახევარწარმოებულის ოპერატორი და მათემატიკის სწავლების კონსტრუქტივისტული მოდელი.",
      lede: "კვლევის საერთო ღერძია ალგებრული სტრუქტურის, გეომეტრიული ინტერპრეტაციისა და მათემატიკური ცნების სწავლების თანმიმდევრული დაკავშირება.",
      areasTitle: "კვლევითი მიმართულებები",
      connections: "კვლევითი კავშირები",
      connectionsText:
        "კვლევითი მიმართულებები ერთმანეთისგან განცალკევებული არ არის: წარმოებულის კონსტრუქცია საფუძვლად უდევს სწავლების მოდელს, ხოლო ოპერატორული აზროვნება ანალიზის გაფართოებულ სტრუქტურებს ეხება.",
      related: "ყველა ნაშრომი",
      relatedPublications: "დაკავშირებული ნაშრომები",
      explore: "მიმართულების ვრცლად ნახვა",
      teachingExplore: "სწავლების მოდელის ნახვა",
      modelEyebrow: "სასწავლო მოდელი",
      modelTitle: "ორმაგი ფესვიდან ზღვართან კავშირამდე",
      modelDescription:
        "კვლევითი კონსტრუქცია თანმიმდევრულ სასწავლო გზად გარდაიქმნება.",
    },
    derivative: {
      title: "წარმოებული ზღვრის გარეშე",
      description:
        "წარმოებულის ზღვრის გარეშე ალგებრულ-გეომეტრიული კონსტრუქცია — ორმაგი ფესვი, მხები წრფე და მრავალწევრის ფაქტორიზაცია.",
      eyebrow: "კვლევითი მიმართულება · 01",
      lede: "წარმოებულის საწყისი აგება მრავალწევრი ფუნქციებისთვის — ორმაგი ფესვის, მხები წრფისა და ალგებრულ-გეომეტრიული კრიტერიუმის საფუძველზე.",
      idea: "საწყისი იდეა",
      ideaText:
        "მრავალწევრი ფუნქციის გრაფიკთან x = a წერტილში მხები წრფის არსებობა შეიძლება გამოიხატოს ფუნქციასა და წრფეს შორის სხვაობის ალგებრული თვისებით. თუ სხვაობას ამ წერტილში ორმაგი ფესვი აქვს, მაშინ მასში გამოიყოფა მამრავლი (x − a)².",
      quadratic: "კვადრატული მოდელი",
      quadraticText:
        "ფუნქციისთვის f(x) = x² და წერტილისთვის a მხები წრფის განტოლებაა Tₐ(x) = 2ax − a². სხვაობის გამოთვლა უშუალოდ იძლევა სრულ კვადრატს:",
      meaning: "ალგებრული და გეომეტრიული მნიშვნელობა",
      meaningText:
        "ორმაგი ფესვი აღწერს არა უბრალოდ გადაკვეთის წერტილს, არამედ შეხებას. ამგვარად, დახრილობა შეიძლება გამოვლინდეს ფაქტორიზაციის პირობიდან, სანამ ზღვრის ფორმალური განსაზღვრება შემოვა.",
      scope: "მიდგომის ფარგლები",
      scopeText:
        "საწყისი კონსტრუქცია განკუთვნილია მრავალწევრი ფუნქციებისთვის. ელემენტარულ ფუნქციებზე გაფართოება წარმოდგენილია ცალკე პრეპრინტში. მიდგომა არ უარყოფს ზღვრის როლს ანალიზში; ის ცვლის ცნების სწავლების საწყის მარშრუტს.",
      related: "დაკავშირებული ნაშრომები",
      relatedText: "მიმართულება განვითარებულია შემდეგ ნაშრომებში:",
      interactive: "ინტერაქტიული დემონსტრაცია",
      interactiveText:
        "ინტერაქტიულ სივრცეში შეგიძლიათ შეცვალოთ შეხების წერტილი და ერთდროულად ნახოთ გრაფიკი, მხები და ფაქტორიზაცია.",
      action: "დემონსტრაციის გახსნა",
      contents: "ამ გვერდზე",
    },
    half: {
      title: "ნახევარწარმოებულის ოპერატორი",
      heading: "ნახევარწარმოებულის ოპერატორული კონსტრუქცია",
      description:
        "ნახევარწარმოებულის ალგებრულ-ოპერატორული კონსტრუქცია გრადუირებულ მონომურ სივრცეზე, რეკურენტული კოეფიციენტებითა და კომპოზიციის პირობით.",
      eyebrow: "კვლევითი მიმართულება · 02",
      lede: "ნახევარი რიგის დიფერენცირების ალგებრული აგება გრადუირებულ მონომურ სივრცეზე — კომპოზიციის, რეკურენტული კოეფიციენტებისა და ნორმალიზაციის საშუალებით.",
      operator: "ოპერატორული პირობა",
      operatorText:
        "კონსტრუქციის მიზანია ისეთი ოპერატორის განსაზღვრა, რომლის კომპოზიცია საკუთარ თავთან ჩვეულებრივ დიფერენცირებას იძლევა.",
      space: "გრადუირებული მონომური სივრცე",
      spaceText:
        "ოპერატორი განიხილება მონომების გრადუირებულ ოჯახზე. მოქმედების კოეფიციენტები უნდა აკმაყოფილებდეს კომპოზიციის პირობას, რაც რეკურენტულ დამოკიდებულებას წარმოშობს.",
      recurrence: "რეკურენცია და ნორმალიზაცია",
      recurrenceText:
        "ნაშრომის პირველი ნაწილი განიხილავს კოეფიციენტების რეკურენტულ თანაფარდობას და მის კავშირს ორმაგ ფაქტორიალებთან, უოლისის ნამრავლთან და ნორმალიზაციასთან. ამ გვერდზე მოცემულია მხოლოდ ძირითადი თანაფარდობები; სრული არგუმენტაცია წარმოდგენილია ნაშრომში.",
      publication: "დაკავშირებული ნაშრომი",
      publicationText: "ნაშრომი ხელმისაწვდომია arXiv პრეპრინტის სახით.",
      contents: "ამ გვერდზე",
      monomial: "მონომური სივრცე",
      recurrenceShort: "რეკურენცია",
      publicationShort: "ნაშრომი",
      action: "ნაშრომის ნახვა",
    },
    publications: {
      title: "ნაშრომები",
      eyebrow: "აკადემიური ბიბლიოგრაფია",
      description:
        "დავით კაპანაძის ნაშრომების ბიბლიოგრაფია — მათემატიკური ანალიზი, მათემატიკის განათლება, ფრაქციული აღრიცხვა და ადრეული მეთოდური ნაშრომები.",
      lede: "პრეპრინტები, ხელნაწერები, მონოგრაფია და ადრეული მეთოდური სტატიები. თითოეულ ჩანაწერზე მითითებულია მისი გამოქვეყნების ამჟამინდელი სტატუსი.",
      featuredBook: "მონოგრაფია",
      listTitle: "ნაშრომების ჩამონათვალი",
      filterLabel: "ნაშრომების ფილტრი კატეგორიის მიხედვით",
      empty: "ამ კატეგორიაში ნაშრომები ჯერ არ არის.",
    },
    teaching: {
      title: "სწავლება",
      eyebrow: "მათემატიკის განათლება",
      description:
        "დავით კაპანაძის მათემატიკის სწავლების ხედვა — ცნობილიდან უცნობისკენ, ალგებრისა და გეომეტრიის კავშირი, კონცეპტუალური გაგება და ვიზუალიზაცია.",
      lede: "რთული ანალიზური ცნების სწავლება იწყება მოსწავლისთვის ნაცნობი ალგებრული და გეომეტრიული სტრუქტურებით, შემდეგ კი ცნება თანმიმდევრულად უკავშირდება ფორმალურ ენას.",
      philosophy: "სწავლების ფილოსოფია",
      philosophyTitle: "მათემატიკური აზრი — წესების ჩამონათვალამდე",
      philosophyText:
        "მიდგომის სიძლიერე ცნების აგების ნათელ, შემოწმებად და თანმიმდევრულ გზაშია, სადაც ყოველი ახალი ნაბიჯი წინამორბედს ეყრდნობა.",
      path: "კოგნიტური გზა",
      pathTitle: "ორმაგი ფესვიდან ზღვართან კავშირამდე",
      pathText: "თანმიმდევრობა აჩვენებს, სად შემოდის თითოეული ახალი ცნება და როგორ ეყრდნობა წინამორბედ სტრუქტურას.",
      resources: "სასწავლო რესურსები",
      resourcesTitle: "სტუდენტებისა და მასწავლებლებისთვის",
      resourcesText:
        "მასალები სტუდენტებისა და მასწავლებლებისთვის მზადდება და აქ გამოქვეყნდება, როგორც კი ხელმისაწვდომი გახდება.",
      inPreparation: "მზადდება",
      notes: "კონცეპტუალური ჩანაწერები",
      notesText: "მოკლე ტექსტები, რომლებიც ფორმულას მის ალგებრულ და გეომეტრიულ მნიშვნელობას უკავშირებს.",
      demos: "ვიზუალური დემონსტრაციები",
      demosText: "მხები წრფის, ორმაგი ფესვისა და ოპერატორული კომპოზიციის ინტერაქტიული წარმოდგენა.",
      guide: "მასწავლებლის გზამკვლევი",
      guideText: "გაკვეთილის შესაძლო თანმიმდევრობა და კითხვები კონცეპტუალური დიალოგისთვის.",
      action: "ინტერაქტიული დემონსტრაციის ნახვა",
    },
    interactive: {
      title: "ინტერაქტიული სივრცე",
      eyebrow: "მათემატიკური ლაბორატორია",
      description:
        "ინტერაქტიული მათემატიკური სივრცე: წარმოებული ზღვრის გარეშე, მხები წრფის ვიზუალიზაცია, ორმაგი ფესვის პირობა და ნახევარწარმოებულის ოპერატორი.",
      lede: "ცოცხალი ვიზუალიზაციები ალგებრულ ფორმულასა და გეომეტრიულ მნიშვნელობას შორის კავშირის დასანახად.",
      topicsLabel: "თემები",
      topics: [
        { title: "წარმოებული ზღვრის გარეშე", description: "ალგებრული პირობიდან წერტილოვანი ცვლილებისკენ.", icon: "derivative" },
        { title: "მხები წრფის ვიზუალიზაცია", description: "შეხების წერტილისა და წრფის ერთდროული მოძრაობა.", icon: "tangent" },
        { title: "ორმაგი ფესვის პირობა", description: "ფაქტორიზაცია, რომელიც გეომეტრიულ შეხებას აღწერს.", icon: "double-root" },
        { title: "ნახევარწარმოებულის ოპერატორი", description: "ოპერატორული კომპოზიციის კონცეპტუალური სქემა.", icon: "operator" },
      ],
      projectsEyebrow: "გარე პლატფორმები",
      projectsTitle: "ინტერაქტიული პროექტები",
      projectsText:
        "დამოუკიდებელი ციფრული სივრცეები მათემატიკური ექსპერიმენტის, ვიზუალიზაციისა და სწავლებისთვის. თითოეული ბმული იხსნება გარე პლატფორმაზე.",
    },
    contact: {
      title: "დაკავშირება",
      eyebrow: "აკადემიური მიმოწერა",
      description:
        "დავით კაპანაძესთან დაკავშირება — კვლევითი თანამშრომლობა, სარედაქციო მიმოწერა, ORCID და აკადემიური ელფოსტა.",
      lede: "კვლევითი თანამშრომლობის, მათემატიკის სწავლების, გამოცემებისა და სარედაქციო საკითხებისთვის გამოიყენეთ აკადემიური ელფოსტა ან ქვემოთ მოცემული ფორმა.",
      info: "საკონტაქტო ინფორმაცია",
      infoText:
        "წერილში სასურველია მოკლედ მიუთითოთ საკითხის სფერო და თანამშრომლობის ან მიმოწერის სასურველი ფორმა.",
      email: "აკადემიური ელფოსტა",
      copyEmail: "ელფოსტის კოპირება",
      affiliation: "აკადემიური კავშირი",
      location: "მდებარეობა",
      areas: "მიმოწერის სფეროები",
      areasText: "კვლევითი თანამშრომლობა · სარედაქციო და აკადემიური საკითხები",
      form: "შეტყობინების გაგზავნა",
    },
    notFound: {
      title: "გვერდი ვერ მოიძებნა",
      text: "მისამართი შესაძლოა შეიცვალა ან გვერდი აღარ არსებობს. სცადეთ ერთ-ერთი ძირითადი განყოფილება:",
      home: "მთავარ გვერდზე დაბრუნება",
    },
  },
  en: {
    home: {
      heroPublications: "View publications",
      heroResearch: "Research areas",
      heroCriterion: "Central criterion",
      heroAreas: "Research areas",
      researchEyebrow: "Research focus",
      researchTitle: "One idea, several mathematical languages",
      researchDescription:
        "The research brings together algebraic structure, geometric intuition, operator construction, and a progressive model of teaching.",
      learningEyebrow: "Learning sequence",
      learningTitle: "From familiar structures to an analytic concept",
      learningDescription:
        "Seven connected steps from the double root to the analytic connection with the limit.",
      ideaEyebrow: "Central idea",
      ideaTitle: "Tangency, read through factorisation",
      ideaAction: "Read the full exposition",
      geometricCondition: "Geometric condition",
      geometricText: "The line Tₐ is tangent to the graph of the function at x = a.",
      algebraicTranslation: "Algebraic translation",
      algebraicText: "The difference between the function and the line has a double root at x = a.",
      factorisationCriterion: "Factorisation criterion",
      criterionText: "The difference contains the factor (x − a)²:",
      publicationsEyebrow: "Selected publications",
      publicationsTitle: "Research texts and bibliography",
      publicationsDescription:
        "Recent preprints, manuscripts, and the monograph. Each entry states its current publication status.",
      bibliography: "Full bibliography",
      timelineEyebrow: "Academic timeline",
      timelineTitle: "How the themes developed",
      timelineDescription: "From early methodological studies to the current algebraic–geometric programme.",
      teachingEyebrow: "Teaching perspective",
      teachingTitle: "Understanding before formulas",
      teachingText:
        "The teaching model first reveals the internal structure of a concept and only then connects it to formal rules and the analytic definition. The aim is a conscious use of mathematical language rather than the memorisation of isolated algorithms.",
      teachingAction: "Explore the teaching approach",
      conceptualUnderstanding: "Conceptual understanding",
      algebra: "Algebra",
      geometry: "Geometry",
      analysis: "Analysis",
      interactiveEyebrow: "Interactive space",
      interactiveTitle: "See how the tangent moves",
      interactiveText:
        "Move the point of contact and watch the tangent, its equation, and the double-root factorisation update together.",
      openDemo: "Open the demonstration",
      tangentVisualisation: "Tangent-line visualisation",
      tangentDescription: "The point, tangent, and slope in one geometric view.",
      halfDerivative: "Half-derivative",
      halfDerivativeDescription: "A visual idea of operator composition and recurrence.",
      projectsEyebrow: "Projects",
      projectsTitle: "Interactive projects",
      projectsDescription: "Two independent platforms for exploring mathematical models and learning visually.",
      contactEyebrow: "Academic correspondence",
      contactTitle: "For research dialogue",
      contactText:
        "For research collaboration, publications, or questions about mathematics education, please get in touch through the academic contact channel.",
      contactAction: "Get in touch",
      profileAction: "Academic profile",
    },
    about: {
      title: "Davit Kapanadze",
      metaTitle: "Academic profile",
      eyebrow: "Academic profile",
      description:
        "The academic profile of Davit Kapanadze: research interests, teaching perspective, professional affiliations, and contact information.",
      lede: "Doctor of Pedagogical Sciences and Professor at the Faculty of Business and Technology, Georgian National University SEU. Research interests: mathematical analysis, fractional calculus, and mathematics education.",
      biography: "Short biography",
      interests: "Research interests",
      activity: "Academic activity",
      bibliography: "Publication bibliography",
      teaching: "Teaching perspective",
      teachingAction: "The teaching approach",
      connections: "Professional affiliations",
      connectionsText:
        "Davit Kapanadze is affiliated with Georgian National University SEU in Tbilisi, Georgia. He is also an Associate Member of the Institute of Mathematics and its Applications (AMIMA), United Kingdom.",
      profiles: "ORCID and academic profiles",
      profilesText: "Public academic and professional profiles: ORCID, Academia.edu, LinkedIn, and Facebook.",
      summaryLabel: "Academic profile summary",
    },
    research: {
      title: "Research",
      eyebrow: "Research programme",
      description:
        "Davit Kapanadze’s research areas: the derivative without limits, the half-derivative operator, and a constructivist model for mathematics education.",
      lede: "The common thread of this research is a progressive connection between algebraic structure, geometric interpretation, and the teaching of mathematical concepts.",
      areasTitle: "Research areas",
      connections: "How the areas connect",
      connectionsText:
        "These research areas are not isolated: the construction of the derivative underpins a teaching model, while operator thinking addresses extended structures of analysis.",
      related: "All publications",
      relatedPublications: "Related publications",
      explore: "Explore this area",
      teachingExplore: "View the teaching model",
      modelEyebrow: "Teaching model",
      modelTitle: "From the double root to the connection with the limit",
      modelDescription:
        "The research construction becomes a progressive learning path.",
    },
    derivative: {
      title: "The derivative without limits",
      description:
        "A limit-free algebraic–geometric construction of the derivative through the double root, the tangent line, and polynomial factorisation.",
      eyebrow: "Research area · 01",
      lede: "An initial construction of the derivative for polynomial functions, based on the double root, the tangent line, and an algebraic–geometric criterion.",
      idea: "Starting idea",
      ideaText:
        "The existence of a tangent line to a polynomial graph at x = a can be expressed through an algebraic property of the difference between the function and the line. If that difference has a double root at the point, it contains the factor (x − a)².",
      quadratic: "The quadratic model",
      quadraticText:
        "For f(x) = x² and a point a, the tangent line is Tₐ(x) = 2ax − a². Computing the difference directly produces a perfect square:",
      meaning: "Algebraic and geometric meaning",
      meaningText:
        "A double root describes contact, not merely a point of intersection. Slope can therefore emerge from a factorisation condition before the formal definition of the limit is introduced.",
      scope: "Scope of the approach",
      scopeText:
        "The initial construction is intended for polynomial functions. Its extension to elementary functions is presented in a separate preprint. The approach does not reject the role of the limit in analysis; it changes the initial route by which the concept is taught.",
      related: "Related publications",
      relatedText: "This direction is developed in the following works:",
      interactive: "Interactive demonstration",
      interactiveText:
        "In the interactive space you can move the point of contact and see the graph, the tangent, and the factorisation together.",
      action: "Open the demonstration",
      contents: "On this page",
    },
    half: {
      title: "Half-derivative operator",
      heading: "An operator construction of the half-derivative",
      description:
        "An algebraic-operator construction of the half-derivative on a graded monomial space, using recurrent coefficients and a composition condition.",
      eyebrow: "Research area · 02",
      lede: "An algebraic construction of half-order differentiation on a graded monomial space through composition, recurrent coefficients, and normalisation.",
      operator: "The operator condition",
      operatorText:
        "The aim is to define an operator whose composition with itself yields ordinary differentiation.",
      space: "The graded monomial space",
      spaceText:
        "The operator is considered on a graded family of monomials. Its coefficients must satisfy the composition condition, which gives rise to a recurrence relation.",
      recurrence: "Recurrence and normalisation",
      recurrenceText:
        "Part I of the paper develops the recurrence for the coefficients and its connection with double factorials, the Wallis product, and normalisation. This page presents only the central relations; the complete argument is given in the paper.",
      publication: "Related publication",
      publicationText: "The paper is available as an arXiv preprint.",
      contents: "On this page",
      monomial: "Monomial space",
      recurrenceShort: "Recurrence",
      publicationShort: "Publication",
      action: "View the publication",
    },
    publications: {
      title: "Publications",
      eyebrow: "Academic bibliography",
      description:
        "A bibliography of Davit Kapanadze’s work in mathematical analysis, mathematics education, fractional calculus, and earlier methodological studies.",
      lede: "Preprints, manuscripts, a monograph, and earlier methodological articles. Each entry states its current publication status.",
      featuredBook: "Monograph",
      listTitle: "List of publications",
      filterLabel: "Filter publications by category",
      empty: "There are no publications in this category yet.",
    },
    teaching: {
      title: "Teaching",
      eyebrow: "Mathematics education",
      description:
        "Davit Kapanadze’s approach to mathematics education: from the known to the unknown, connecting algebra and geometry, conceptual understanding, and visualisation.",
      lede: "Teaching an advanced analytic concept begins with algebraic and geometric structures familiar to the learner, and then connects them step by step to formal language.",
      philosophy: "Teaching philosophy",
      philosophyTitle: "Mathematical thought before a list of rules",
      philosophyText:
        "Its strength lies in a clear, checkable path along which each new step rests on the one before.",
      path: "Cognitive path",
      pathTitle: "From the double root to the limit",
      pathText: "The sequence shows where each new concept enters and how it rests on the structure that precedes it.",
      resources: "Learning resources",
      resourcesTitle: "For students and teachers",
      resourcesText:
        "Materials for students and teachers are in preparation and will be published here as they become available.",
      inPreparation: "In preparation",
      notes: "Conceptual notes",
      notesText: "Short texts connecting a formula with its algebraic and geometric meaning.",
      demos: "Visual demonstrations",
      demosText: "Interactive representations of the tangent line, the double root, and operator composition.",
      guide: "Teacher’s guide",
      guideText: "A possible lesson sequence and questions for conceptual dialogue.",
      action: "View the interactive demonstration",
    },
    interactive: {
      title: "Interactive mathematics",
      eyebrow: "Mathematics laboratory",
      description:
        "An interactive mathematics space for the derivative without limits, tangent-line visualisation, the double-root condition, and the half-derivative operator.",
      lede: "Live visualisations that reveal the connection between an algebraic formula and its geometric meaning.",
      topicsLabel: "Themes",
      topics: [
        { title: "The derivative without limits", description: "From an algebraic condition to pointwise change.", icon: "derivative" },
        { title: "Tangent-line visualisation", description: "The point of contact and the line move together.", icon: "tangent" },
        { title: "The double-root condition", description: "Factorisation that describes geometric contact.", icon: "double-root" },
        { title: "The half-derivative operator", description: "A conceptual scheme of operator composition.", icon: "operator" },
      ],
      projectsEyebrow: "External platforms",
      projectsTitle: "Interactive projects",
      projectsText:
        "Independent digital spaces for mathematical experimentation, visualisation, and learning. Each link opens an external platform.",
    },
    contact: {
      title: "Contact",
      eyebrow: "Academic correspondence",
      description:
        "Contact Davit Kapanadze about research collaboration or editorial matters — academic email, ORCID, and a contact form.",
      lede: "For research collaboration, mathematics education, publications, and editorial matters, write to the academic email address or use the form below.",
      info: "Contact information",
      infoText:
        "Please briefly indicate the subject of your message and the kind of collaboration or correspondence you have in mind.",
      email: "Academic email",
      copyEmail: "Copy email",
      affiliation: "Academic affiliation",
      location: "Location",
      areas: "Areas of correspondence",
      areasText: "Research collaboration · editorial and academic matters",
      form: "Send a message",
    },
    notFound: {
      title: "Page not found",
      text: "The address may have changed, or the page no longer exists. You may find what you need in one of the main sections:",
      home: "Return to the home page",
    },
  },
} as const;

export function getPageText(locale: Locale) {
  return pageText[locale];
}
