import Link from 'next/link';

const Header = () => (
  <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
    <Link href="/">
      <a className="hover:underline">Next Blog</a>
    </Link>
  </h1>
);

export default Header;
