import { GetServerSideProps } from "next";
import Image from "next/image";

type Tweet = {
  idx: number;
  USERNAME: string;
  CONTENT: string;
};

const TweetDetail = (tweet: Tweet) => (
  <>
    <div className="mt-10 ml-10 flex items-center">
      <p>
        <Image
          src="https://i.imgur.com/57XOGVX.png"
          className="rounded-full"
          alt="Profile Image"
          width={100}
          height={100}
          priority
        />
      </p>
      <p className="ml-12 text-yellow-400">{tweet.USERNAME}</p>
    </div>
    <p className="ml-48">{tweet.CONTENT}</p>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/GET_TWEET/${context.params?.tid}`
  );
  const tweet = await res.json();
  return { props: tweet[0] };
};

export default TweetDetail;
