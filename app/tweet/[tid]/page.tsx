import Image from 'next/image';
import type { Tables } from 'supabase';
import { OtherGNB } from '@components/GNB';
import { getTweet } from '@utils/actions';
import { DEFAULT_PIC } from '@utils/env';

const Existing = ({ tweet }: { tweet: Tables<'tweets'> }) => {
  const 시 = parseInt(tweet.created_at.slice(11, 13) + 9) % 24;
  const 분 = tweet.created_at.slice(14, 16);
  const 년 = tweet.created_at.slice(0, 4);
  const 월 = tweet.created_at.slice(5, 7);
  const 일 = tweet.created_at.slice(8, 10);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mt-10 flex gap-x-4">
        <p>
          <Image
            src={tweet.profile_img || DEFAULT_PIC}
            className="rounded-full"
            alt="Profile Image"
            width={64}
            height={64}
            priority
          />
        </p>
        <div className="text-d-yellow grid">
          <p>{tweet.nickname}</p>
          <p>@{tweet.username}</p>
        </div>
      </div>
      <p className="mt-4">{tweet.content}</p>
      <p className="mt-6">
        {`${시 >= 12 ? '오후' : '오전'} ${
          시 === 0 ? 12 : 시 > 12 ? 시 - 12 : 시
        }시 ${분}분, ${년}년 ${월}월 ${일}일`}
      </p>
    </div>
  );
};

const TweetDetail = async ({
  params: { tid },
}: {
  params: { tid: number };
}) => {
  const { tweet, error } = await getTweet(tid);
  return (
    <>
      <OtherGNB />

      {error ? (
        <h3 className="pt-16 text-center text-lg">
          트윗을 가져오는 중 오류가 발생했습니다.
        </h3>
      ) : !tweet ? (
        <h3 className="pt-16 text-center text-lg">트윗이 존재하지 않습니다.</h3>
      ) : (
        <Existing tweet={tweet} />
      )}
    </>
  );
};

export default TweetDetail;
