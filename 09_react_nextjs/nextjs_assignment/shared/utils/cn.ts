import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// clsx로 조건부 클래스 배열을 생성하고, tailwind-merge로 충돌하는 Tailwind 속성을 정리하는 함수
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
