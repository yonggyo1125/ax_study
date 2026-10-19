import { createBrowserClient, createServerClient as createSSRServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

if (!supabaseUrl ||!supabasePublishableKey) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHIABLE_KEY가 설정되지 않았습니다.');
}

// CSR supbase 연결 객체
export const supabase = createBrowserClient(
    supabaseUrl,
    supabasePublishableKey
);


// SSR supabase 연결 객체 
export function createServerClient(): SupabaseClient {
    return createSSRServerClient(supabaseUrl, supabasePublishableKey, {
        cookies: {
            async getAll() {
                const { cookies } = await import('next/headers');
                const cookieStore = await cookies();
                return cookieStore.getAll();
            },
            async setAll(cookiesToSet) {
                try {
                    const { cookies } = await import('next/headers');
                    const cookieStore = await cookies();
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch {
                    // 서버 컴포넌트(RSC) 렌더링 중 쿠키 쓰기 시도는 무시하고
                    // Server Actions 및 Middleware에서 쿠키 갱신을 처리합니다.
                }
            },
        },
    });
}