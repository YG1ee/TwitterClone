import Image from 'next/image';
import { Fragment } from 'react';

import { HomeGNB } from '@components/GNB';
import { MyLink } from '@components/MyLink';
import { getTweets } from '@utils/actions';
import { DEFAULT_PIC } from '@utils/env';

export default async function Home() {
  const { tweets, error } = await getTweets();
  return (
    <>
      <HomeGNB />

      <main className="m-12 rounded overflow-clip max-w-2xl mx-auto">
        {error ? (
          <p className="text-center">트윗을 가져오는 중 오류가 발생했습니다.</p>
        ) : (
          tweets?.map((tweet, i) => {
            const d = new Date(tweet.created_at);

            const 시 = d.getHours().toString().padStart(2, '0');
            const 분 = d.getMinutes().toString().padStart(2, '0');
            const 년 = d.getFullYear();
            const 월 = (d.getMonth() + 1).toString().padStart(2, '0');
            const 일 = d.getDate().toFixed().padStart(2, '0');

            return (
              <Fragment key={tweet.id}>
                <MyLink href={`/tweet/${tweet.id}`}>
                  <div className="p-4 hover:bg-current-line transition-colors duration-300">
                    <div className="flex gap-x-4">
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
                      <div className="text-d-yellow">
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
                </MyLink>
                {i !== tweets.length - 1 && <hr className="border-comment" />}
              </Fragment>
            );
          })
        )}
      </main>
    </>
  );
}
