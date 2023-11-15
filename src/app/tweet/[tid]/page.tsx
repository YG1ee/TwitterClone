import { OtherGNB } from "@/app/components/GNB";
import Image from "next/image";
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

  const 시 = parseInt(tweet.DATE.slice(11, 13) + 9) % 24;
  const 분 = tweet.DATE.slice(14, 16);
  const 년 = tweet.DATE.slice(0, 4);
  const 월 = tweet.DATE.slice(5, 7);
  const 일 = tweet.DATE.slice(8, 10);

  return (
    <>
      <OtherGNB />

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
          {`${시 >= 12 ? "오후" : "오전"} ${
            시 === 0 ? 12 : 시 > 12 ? 시 - 12 : 시
          }시 ${분}분, ${년}년 ${월}월 ${일}일`}
        </p>
      </div>
    </>
  );
};

export default TweetDetail;
