import { MyLink } from './MyLink';

import Create from '@assets/svgs/create.svg';

const HomeGNB = () => (
  <nav className="sticky top-0 bg-background">
    <div className="px-4 grid grid-cols-3 items-center text-d-cyan">
      <p>
        {/* <MyLink href={`/create`}> */}
        <button
          type="button"
          className="p-1 hover:text-foreground transition-colors duration-300"
          title="트윗 작성 미구현 T.T"
        >
          <Create width={24} height={24} />
        </button>
        {/* </MyLink> */}
      </p>
      <p className="py-4 text-2xl text-center">트위터 클론코딩</p>
      <p />
    </div>
    <hr className="border border-d-cyan" />
  </nav>
);

const OtherGNB = () => (
  <nav className="sticky top-0 bg-background">
    <div className="px-12 py-4 flex items-center text-2xl">
      <MyLink href="/" className="absolute left-8 p-4">
        &lt;
      </MyLink>
      <p className="text-2xl text-d-cyan mx-auto">
        <MyLink href="/">트위터 클론코딩</MyLink>
      </p>
    </div>
    <hr className="border border-d-cyan" />
  </nav>
);

export { HomeGNB, OtherGNB };
