'use server';

import { cookies } from 'next/headers';

export async function createCookie(key: string, value: string) {
    const cookieStore = await cookies();

    // 기본 쿠키 설정
    cookieStore.set(key, value);

    // 보안 및 상세 옵션을 포함한 쿠키 설정 (권장)
    // cookieStore.set(key, value, {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
    //     maxAge: 60 * 60 * 24 * 7, // 유효기간 (초 단위, 예: 7일)
    //     path: '/', // 쿠키가 유효한 경로
    // });
}

export async function deleteCookie(key: string) {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}
