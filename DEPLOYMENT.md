# Production deployment

ეს დოკუმენტი აღწერს საიტის GitHub-სა და Vercel-ზე განთავსების რეკომენდებულ პროცესს. DNS ან production გარემო ავტომატურად არ იცვლება.

## 1. GitHub რეპოზიტორია

1. შექმენით ახალი კერძო ან საჯარო რეპოზიტორია.
2. შეამოწმეთ, რომ `.env*`, build არტეფაქტები და ლოკალური ლოგები `.gitignore`-შია.
3. ატვირთვამდე გაუშვით:

   ```bash
   npm install
   npm run lint
   npm run build
   ```

4. დაამატეთ remote და ატვირთეთ `main` branch ორგანიზაციის წესების შესაბამისად.

## 2. Vercel პროექტი

1. Vercel Dashboard-ში აირჩიეთ **Add New → Project**.
2. დააკავშირეთ GitHub რეპოზიტორია.
3. Framework Preset-ად აირჩიეთ **Next.js**.
4. Root Directory დატოვეთ რეპოზიტორიის root-ზე.
5. Install Command: `npm install`
6. Build Command: `npm run build`
7. განახორციელეთ პირველი preview deployment და შეამოწმეთ ყველა მარშრუტი.

არსებული პროექტი შეიცავს Sites/Vinext ადაპტერს. თუ საბოლოო ჰოსტინგად Vercel გამოიყენება, deployment-მდე გადაამოწმეთ არჩეული პლატფორმის build preset და საჭიროების შემთხვევაში ინფრასტრუქტურის პასუხისმგებელ პირთან შეათანხმეთ სტანდარტული Next.js build მარშრუტი.

## 3. `dkapanadze.ge`-ის დამატება

Vercel პროექტის **Settings → Domains** ნაწილში დაამატეთ:

- `dkapanadze.ge`
- `www.dkapanadze.ge`

ძირითად დომენად რეკომენდებულია `dkapanadze.ge`; `www` უნდა გადამისამართდეს მთავარ დომენზე.

## 4. DNS ვერიფიკაცია

Vercel აჩვენებს კონკრეტულ DNS ჩანაწერებს. გამოიყენეთ მხოლოდ მათ მიერ მოცემული მნიშვნელობები — წინასწარ ნუ გამოიგონებთ IP ან CNAME მისამართებს.

ჩვეულებრივ საჭიროა:

- apex დომენის A ან ALIAS/ANAME ჩანაწერი
- `www`-ს CNAME ჩანაწერი
- საჭიროების შემთხვევაში დომენის საკუთრების TXT ჩანაწერი

ცვლილებების შემდეგ დაელოდეთ DNS გავრცელებას და Vercel-ში დაადასტურეთ ორივე დომენი.

## 5. გარემოს ცვლადები

საკონტაქტო ფორმისთვის Vercel-ის Project Settings-ში დაამატეთ:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=d.kapanadze@seu.edu.ge
CONTACT_FROM_EMAIL=website@dkapanadze.ge
```

`RESEND_API_KEY` უნდა დარჩეს მხოლოდ server-side environment-ში. Production წერილების გაგზავნამდე Resend-ში დაადასტურეთ `dkapanadze.ge`. სრული ინსტრუქცია მოცემულია [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md)-ში.

## 6. production შემოწმება

deployment-ის შემდეგ შეამოწმეთ:

- `https://dkapanadze.ge`
- ყველა ძირითადი და დინამიკური publication მარშრუტი
- `robots.txt`, `sitemap.xml` და `manifest.webmanifest`
- canonical და Open Graph metadata
- `og.png` სოციალური preview
- მობილური მენიუ, კლავიატურით ნავიგაცია და focus states
- KaTeX ფორმულები
- ინტერაქტიული მხების დემო
- mailto ფორმის გამჭვირვალე ქცევა
- Resend contact API-ის წარმატების, შეცდომისა და არაკონფიგურირებული მდგომარეობები
- ORCID და arXiv გარე ბმულები
- არარსებული PDF/CV ბმულების არარსებობა
- `www`-დან ძირითად დომენზე გადამისამართება

საბოლოოდ გაუშვით Lighthouse ან ეკვივალენტური აუდიტი production URL-ზე და გადაამოწმეთ Search Console მხოლოდ მას შემდეგ, რაც დომენის საკუთრება დადასტურდება.
