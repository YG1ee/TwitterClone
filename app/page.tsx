import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { HomeGNB } from './components/GNB';
import { getTweets } from '@utils/actions';

export default async function Home() {
  const { tweets, error } = await getTweets();

  return (
    <>
      <HomeGNB />

      <main className="m-12 rounded overflow-clip">
        <p className="text-center">
          {error && '트윗을 가져오는 중 오류가 발생했습니다.'}
        </p>
        {tweets?.map((tweet, i, T) => {
          const 시 = parseInt(tweet.created_at.slice(11, 13) + 9) % 24;
          const 분 = tweet.created_at.slice(14, 16);
          const 년 = tweet.created_at.slice(0, 4);
          const 월 = tweet.created_at.slice(5, 7);
          const 일 = tweet.created_at.slice(8, 10);

          return (
            <Fragment key={i}>
              <Link href={`/tweet/${T.length - i}`} scroll={false}>
                <div className="p-4 hover:bg-current-line transition-colors duration-300">
                  <div className="flex gap-x-4">
                    <p>
                      <Image
                        src={
                          tweet.profile_img ||
                          'https://pyxis.nymag.com/v1/imgs/69f/cd7/263927bbe11de1db6477dd1ae48ae6d968-01-twitter-egg.rsquare.w330.jpg'
                        }
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
                    {`${시 >= 12 ? '오후' : '오전'} ${
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
