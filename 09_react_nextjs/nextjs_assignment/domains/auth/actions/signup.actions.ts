'use server';

import { ActionState } from "@/shared/types/action.types";
import { validateSignUpInput } from "../utils/authValidation";

export async function signUpAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    
    const name = (formData.get('name') as string) ?? '';
    const email = (formData.get('email') as string) ?? '';
    const password = (formData.get('password') as string) ?? '';
    const passwordConfirm = (formData.get('passwordConfirm') as string) ?? '';

    // 필드별 유효성 검사
    const errors = validateSignUpInput({
        name, email, password, passwordConfirm
    });

    if (Object.keys(errors).length > 0) { // 검증 실패
        return {
            success: false,
            errors,
        }
    }

    return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: {}
    }
}