'use server';

import { createServerClient } from "@/shared/lib/supabase";
import type { ActionState } from "@/shared/types/action.types";
import { revalidatePath } from "next/cache";

export async function logoutAction(): Promise<ActionState> {
    const supabase = createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return {
            success: false,
            message: `로그아웃 처리 중 오류가 발생했습니다: ${error.message}`
        };
    }

    revalidatePath('/', 'layout');

    return {
        success: true
    };
}