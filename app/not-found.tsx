import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="section-label">NSHD / ERROR</div>
      <h1>404</h1>
      <div>
        <h2>LOOKS LIKE THIS IDEA<br />DOESN&apos;T EXIST YET.</h2>
        <Link href="/#lab">RETURN TO THE LAB →</Link>
      </div>
    </main>
  );
}
