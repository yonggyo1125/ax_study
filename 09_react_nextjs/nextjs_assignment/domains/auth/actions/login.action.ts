import { createServerClient } from '@/shared/lib/supabase';
import { ActionState } from '@/shared/types/action.types';

export async function signInAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    
    return {
        success: true,
        message: '로그인 되었습니다.',
    };
}
