import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { Tweet } from "TW";
import { HomeGNB } from "./components/GNB";

export default async function Home() {
  const res = await fetch(
    "http://my-json-server.typicode.com/yg1ee/tweet-shop-db/tweets",
    { next: { revalidate: 30 } }
  );
  const tweets: Tweet[] = ((await res.json()) as Tweet[]).reverse();

  return (
    <>
      <HomeGNB />

      <main className="m-12 rounded overflow-clip">
        {tweets.map((tweet, i, T) => {
          const 시 = parseInt(tweet.DATE.slice(11, 13) + 9) % 24;
          const 분 = tweet.DATE.slice(14, 16);
          const 년 = tweet.DATE.slice(0, 4);
          const 월 = tweet.DATE.slice(5, 7);
          const 일 = tweet.DATE.slice(8, 10);

          return (
            <Fragment key={i}>
              <Link href={`/tweet/${T.length - i}`}>
                <div className="p-4 hover:bg-current-line transition-colors duration-300">
                  <div className="flex gap-x-4">
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
                    {`${시 >= 12 ? "오후" : "오전"} ${
                      시 === 0 ? 12 : 시 > 12 ? 시 - 12 : 시
                    }시 ${분}분, ${년}년 ${월}월 ${일}일`}
                  </p>
                </div>
              </Link>
              {i !== tweets.length - 1 && <hr className="border-comment" />}
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
