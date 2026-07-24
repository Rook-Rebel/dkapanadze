import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-shell page-shell not-found-page">
      <p className="eyebrow">404</p>
      <h1>გვერდი ვერ მოიძებნა</h1>
      <p>
        მისამართი შესაძლოა შეიცვალა ან გვერდი ჯერ არ არსებობს.
      </p>
      <Link className="button button-primary" href="/">
        მთავარ გვერდზე დაბრუნება
      </Link>
    </div>
  );
}
