import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value),
                );
                supabaseResponse = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options),
                );
            },
        },
    });

    // 현재 로그인 세션 유저 검증
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // 이미 로그인한 사용자가 /sign_in 또는 /sign_up 접근 시 메인 홈으로 리다이렉트
    if (
        user &&
        (pathname.startsWith('/sign_in') || pathname.startsWith('/sign_up'))
    ) {
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = '/';
        homeUrl.search = '';
        return NextResponse.redirect(homeUrl);
    }

    // 비회원이 메인 또는 /todo로 시작하는 페이지에 접속할 경우 /sign_in?redirectUrl=...으로 리다이렉트
    const isProtectedPath = pathname === '/' || pathname.startsWith('/todo');

    if (!user && isProtectedPath) {
        const signInUrl = request.nextUrl.clone();
        signInUrl.pathname = '/sign_in';
        signInUrl.searchParams.set('redirectUrl', pathname);
        return NextResponse.redirect(signInUrl);
    }

    return supabaseResponse;
}
