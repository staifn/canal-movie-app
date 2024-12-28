import Link from "next/link";

export default async function NotFound() {
  return (
    <div className='not-found'>
      <h2>Oop!</h2>
      <Link href='/'>
        Home
      </Link>
    </div>
  );
}
