import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { Tweet } from "TW";

export default async function Home() {
  const res = await fetch(
    "http://my-json-server.typicode.com/yg1ee/tweet-shop-db/tweets",
    { next: { revalidate: 30 } }
  );
  const tweets: Tweet[] = (await res.json()).reverse();

  return (
    <>
      <nav className="sticky top-0">
        <p className="my-4 text-2xl text-center text-d-cyan">트위터 클론코딩</p>
        <hr className="border border-d-cyan my-4" />
      </nav>

      <main className="m-12 rounded overflow-clip">
        {tweets.map((tweet, i, T) => (
          <Fragment key={i}>
            <Link href={`/tweet/${T.length - i}`}>
              <div className="p-4 hover:bg-current-line transition-colors duration-300">
                <div className="flex gap-x-4 relative">
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
                  <div className="text-d-yellow">
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
                  )}`}년 ${parseInt(
                    tweet.DATE.slice(5, 7)
                  )}월 ${tweet.DATE.slice(8, 10)}일`}
                </p>
              </div>
            </Link>
            {i !== tweets.length - 1 && <hr className="border-comment" />}
          </Fragment>
        ))}
      </main>
    </>
  );
}
