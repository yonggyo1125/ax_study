'use server';

import { ActionState } from '@/shared/types/action.types';
import { validateSignUpInput } from '../utils/authValidations';
import { createServerClient } from '@/shared/lib/supabase';

export async function signUpAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const name = (formData.get('name') as string) ?? '';
    const email = (formData.get('email') as string) ?? '';
    const password = (formData.get('password') as string) ?? '';
    const passwordConfirm = (formData.get('passwordConfirm') as string) ?? '';

    // 필드별 유효성 검사
    const errors = validateSignUpInput({
        name,
        email,
        password,
        passwordConfirm,
    });

    if (Object.keys(errors).length > 0) {
        // 검증 실패
        return {
            success: false,
            errors,
        };
    }

    // 가입 처리
    const supabase = createServerClient();
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
    });

    if (signUpError || !authData.user) {
        const isDuplicate =
            signUpError?.message
                ?.toLowerCase()
                .includes('already registered') ||
            signUpError?.message?.toLowerCase().includes('already exists');

        return {
            success: false,
            message: isDuplicate
                ? '이미 가입된 이메일 주소입니다. 다른 이메일을 사용해 주세요.'
                : `회원가입에 실패했습니다: ${signUpError?.message || '알 수 없는 오류'}`,
        };
    }

    // profiles 테이블 추가 처리
    const userId = authData.user.id;
    const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        name: name.trim(),
    });

    if (profileError) {
        return {
            success: false,
            message: `회원 프로필 생성에 실패했습니다: ${profileError.message}`,
        };
    }

    return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: { userId },
    };
}
