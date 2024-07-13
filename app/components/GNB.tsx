import Link from 'next/link';

const HomeGNB = () => (
  <nav className="sticky top-0 bg-background">
    <p className="py-4 text-2xl text-center text-d-cyan">트위터 클론코딩</p>
    <hr className="border border-d-cyan" />
  </nav>
);

const OtherGNB = () => (
  <nav className="sticky top-0 bg-background">
    <div className="px-12 py-4 flex items-center text-2xl">
      <Link href="/" scroll={false} className="absolute left-8 p-4">
        &lt;
      </Link>
      <p className="text-2xl text-d-cyan mx-auto">
        <Link href="/" scroll={false}>
          트위터 클론코딩
        </Link>
      </p>
    </div>
    <hr className="border border-d-cyan" />
  </nav>
);

export { HomeGNB, OtherGNB };
