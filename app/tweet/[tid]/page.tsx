import Image from 'next/image';
import type { Tables } from 'supabase';
import { OtherGNB } from '@components/GNB';
import { getTweet } from '@utils/actions';
import { DEFAULT_PIC } from '@utils/env';

const Existing = ({ tweet }: { tweet: Tables<'tweets'> }) => {
  const d = new Date(tweet.created_at);

  const 시 = d.getHours().toString().padStart(2, '0');
  const 분 = d.getMinutes().toString().padStart(2, '0');
  const 년 = d.getFullYear();
  const 월 = (d.getMonth() + 1).toString().padStart(2, '0');
  const 일 = d.getDate().toFixed().padStart(2, '0');
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
        {`${parseInt(시) >= 12 ? '오후' : '오전'} ${
          [parseInt(시)].map((시) =>
            시 === 0 ? 12 : 시 > 12 ? 시 - 12 : 시
          )[0]
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
