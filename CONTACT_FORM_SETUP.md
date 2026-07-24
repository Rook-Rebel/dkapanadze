# საკონტაქტო ფორმის გამართვა

საკონტაქტო ფორმა იყენებს Next.js Route Handler-სა და Resend-ს. API გასაღები მუშავდება მხოლოდ სერვერზე და კლიენტის JavaScript-ში არ ხვდება.

## 1. Resend ანგარიშის შექმნა

1. გახსენით [resend.com](https://resend.com/) და შექმენით ანგარიში.
2. Dashboard-ში გადადით **Domains** განყოფილებაში.

## 2. `dkapanadze.ge` დომენის დადასტურება

1. დაამატეთ `dkapanadze.ge`.
2. Resend-ის მიერ მოცემული SPF/DKIM DNS ჩანაწერები ზუსტად გადაიტანეთ დომენის DNS პანელში.
3. ნუ გამოიგონებთ ჩანაწერების მნიშვნელობებს — გამოიყენეთ მხოლოდ Resend-ის კონკრეტული მონაცემები.
4. დაელოდეთ ვერიფიკაციას და დარწმუნდით, რომ domain status არის verified.

`CONTACT_FROM_EMAIL=website@dkapanadze.ge` იმუშავებს მხოლოდ დომენის წარმატებული ვერიფიკაციის შემდეგ.

## 3. API გასაღების შექმნა

Resend Dashboard-ის **API Keys** განყოფილებაში შექმენით მხოლოდ ამ საიტისთვის განკუთვნილი გასაღები. გასაღები შეინახეთ password manager-ში და არასოდეს ჩასვათ GitHub-ში, საჯარო კოდში ან client component-ში.

## 4. ლოკალური environment variables

დააკოპირეთ `.env.example` როგორც `.env.local` და შეავსეთ:

```env
RESEND_API_KEY=re_your_private_key
CONTACT_TO_EMAIL=d.kapanadze@seu.edu.ge
CONTACT_FROM_EMAIL=website@dkapanadze.ge
```

`.env.local` Git-ში არ უნდა მოხვდეს.

## 5. Vercel-ის გამართვა

Vercel Dashboard-ში გახსენით **Project → Settings → Environment Variables** და დაამატეთ იგივე სამი ცვლადი Production, Preview და საჭიროების შემთხვევაში Development გარემოებისთვის. ცვლილების შემდეგ შექმენით ახალი deployment.

## 6. ტესტირება

1. გაუშვით საიტი `npm run dev` ბრძანებით.
2. შეავსეთ `/contact` ფორმა რეალური პასუხის მისაღები ელფოსტით.
3. შეამოწმეთ, რომ წერილი მივიდა `CONTACT_TO_EMAIL` მისამართზე.
4. გადაამოწმეთ, რომ **Reply** მოქმედება პასუხს ვიზიტორის ელფოსტაზე აგზავნის.
5. დროებით ამოიღეთ `RESEND_API_KEY` და დარწმუნდით, რომ ფორმა წარმატებას არ აჩვენებს, არამედ ქართულ კონფიგურაციის შეტყობინებასა და mailto fallback-ს სთავაზობს.
6. გადაამოწმეთ rate limit: ერთი IP-დან 15 წუთში დაშვებულია მაქსიმუმ 5 მოთხოვნა თითო serverless instance-ზე.

## უსაფრთხოება

API გასაღები საიდუმლოა: მისი საჯარო კოდში მოთავსება სხვა პირს თქვენი დომენიდან წერილების გაგზავნის საშუალებას მისცემს. ამიტომ route handler კითხულობს გასაღებს მხოლოდ server-side გარემოდან. ფორმა ასევე იყენებს honeypot ველს, შეყვანის სიგრძის შეზღუდვებს, სერვერულ ვალიდაციასა და საბაზისო rate limiting-ს.

