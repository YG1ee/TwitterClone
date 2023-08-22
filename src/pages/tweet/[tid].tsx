import { GetServerSideProps } from "next";
import { Orbit } from "next/font/google";
import Image from "next/image";

type Tweet = {
  idx: number;
  USERNAME: string;
  NICKNAME: string;
  CONTENT: string;
  DATE: string;
};

const orbit = Orbit({ weight: "400", subsets: ["latin"] });

const TweetDetail = (tweet: Tweet) => (
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
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/GET_TWEET/${context.params?.tid}`
  );
  const tweet = await res.json();
  return { props: tweet[0] };
};

export default TweetDetail;
