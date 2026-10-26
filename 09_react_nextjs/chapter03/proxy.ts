import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createCookie, deleteCookie } from './actions';
export async function proxy(request: NextRequest) {
    await createCookie('test1', 'value1');

    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
