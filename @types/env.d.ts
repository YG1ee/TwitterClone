declare namespace NodeJS {
  type s = string;
  type t = 'true';

  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: s;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: s;
  }
}
