import { GetServerSideProps } from "next";
import { Orbit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

type Tweet = {
  idx: number;
  USERNAME: string;
  NICKNAME: string;
  CONTENT: string;
  DATE: string;
};

const orbit = Orbit({ weight: "400", subsets: ["latin"] });

const TweetDetail = (tweet: Tweet) => (
  <>
    <nav className={`${orbit.className} sticky top-0`}>
      <div className="px-12 my-4 flex items-center text-2xl">
        <Link href="/" className="absolute left-8 p-4">
          &lt;
        </Link>
        <p className="text-2xl text-d-cyan mx-auto">
          <Link href="/">트위터 클론코딩</Link>
        </p>
      </div>
      <hr className="border border-d-cyan my-4" />
    </nav>

    <div className={`mx-12 ${orbit.className}`}>
      <div className="mt-10 flex gap-x-4">
        <p>
          <Image
            src="https://pbs.twimg.com/profile_images/789790925614481408/HimqUeEp_400x400.jpg"
            className="rounded-full"
            alt="Profile Image"
            width={64}
            height={64}
            priority
          />
        </p>
        <div className="text-d-yellow grid">
          <p>{tweet.NICKNAME}</p>
          <p>@{tweet.USERNAME}</p>
        </div>
      </div>
      <p className="mt-4">{tweet.CONTENT}</p>
      <p className="mt-6">
        {`${
          parseInt(tweet.DATE.slice(11, 13)) === 0
            ? "오전"
            : parseInt(tweet.DATE.slice(11, 13)) >= 12
            ? "오후"
            : "오전"
        } ${
          parseInt(tweet.DATE.slice(11, 13)) === 0
            ? 12
            : parseInt(tweet.DATE.slice(11, 13)) > 12
            ? parseInt(tweet.DATE.slice(11, 13)) - 12
            : parseInt(tweet.DATE.slice(11, 13))
        }시 ${tweet.DATE.slice(14, 16)}분, ${`${tweet.DATE.slice(
          0,
          4
        )}`}년 ${parseInt(tweet.DATE.slice(5, 7))}월 ${tweet.DATE.slice(
          8,
          10
        )}일`}
      </p>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:7443/api/GET_TWEET/${context.params?.tid}`
  )
    .then((r) => r.json())
    .catch((e) => console.log(e));
  const tweet = await res;
  return { props: tweet[0] };
};

export default TweetDetail;
