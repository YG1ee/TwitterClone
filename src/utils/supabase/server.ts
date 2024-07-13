// 240714 기준
// https://supabase.com/docs/guides/auth/server-side/nextjs
// 3 Write utility functions to create Supabase clients
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from 'supabase';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@utils/env';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
