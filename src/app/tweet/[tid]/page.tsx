import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Tweet } from "TW";

const TweetDetail = async ({
  params: { tid },
}: {
  params: { tid: number };
}) => {
  const res = await fetch(
    `http://my-json-server.typicode.com/yg1ee/tweet-shop-db/tweets/${tid}`,
    { next: { revalidate: 30 } }
  );
  const tweet: Tweet = await res.json();

  const compareTweet = (t: any): t is Tweet =>
    "id" in t &&
    "USERNAME" in t &&
    "NICKNAME" in t &&
    "CONTENT" in t &&
    "DATE" in t;

  !compareTweet(tweet) && redirect("/");

  return (
    <>
      <nav className="sticky top-0">
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

      <div className="mx-12">
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
};

export default TweetDetail;
