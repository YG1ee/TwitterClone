import { GetServerSideProps } from "next";
import { Orbit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const orbit = Orbit({ weight: "400", subsets: ["latin"] });

type Tweet = {
  idx: number;
  USERNAME: string;
  NICKNAME: string;
  CONTENT: string;
  DATE: string;
};

export default function Home({ tweets }: { tweets: Tweet[] }) {
  return (
    <main className={`m-12 ${orbit.className}`}>
      <p className={`${orbit.className} text-3xl mb-4 text-d-cyan`}>
        트위터 클론코딩
      </p>
      <hr className="border border-d-cyan my-4" />

      {tweets.map((tweet, i) => (
        <Fragment key={i}>
          <Link href={`/tweet/${i}`}>
            <div className="p-4 hover:bg-current-line">
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
                {`${tweet.DATE.slice(11, 13)}시`}
                &nbsp;
                {`${tweet.DATE.slice(14, 16)}분`},&nbsp;
                {`${tweet.DATE.slice(0, 4)}`}년&nbsp;
                {`${parseInt(tweet.DATE.slice(5, 7))}월`}&nbsp;
                {`${tweet.DATE.slice(8, 10)}일`}
              </p>
            </div>
          </Link>
          {i !== tweets.length - 1 && <hr className="border-comment" />}
        </Fragment>
      ))}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/GET_ALL_TWEET`);
  const tweets = (await res.json()).reverse();

  return { props: { tweets } };
};
