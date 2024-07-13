import { createClient } from '@utils/supabase/server';

const getTweets = async () => {
  const supabase = createClient();

  const res = await supabase.from('tweets').select();
  const { data: tweets, error } = res;

  return { tweets, error };
};

const getTweet = async (id: number) => {
  const supabase = createClient();

  const res = await supabase.from('tweets').select().eq('id', id).single();
  const { data: tweet, error } = res;

  return { tweet, error };
};

export { getTweets, getTweet };
