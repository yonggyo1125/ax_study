'use server';
import { getCurrentUser } from '@/domains/auth/queries/getCurrentUser.query';
import { createServerClient } from '@/shared/lib/supabase';
import { ActionState } from '@/shared/types/action.types';
import { revalidatePath } from 'next/cache';
import type { TodoStatus } from '../types/todo.types';
import { validateTodoInput } from '../utils/todoValidation';

export async function addTodoAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const title = (formData.get('title') as string) ?? '';
    const content = (formData.get('content') as string) ?? '';

    const user = await getCurrentUser();
    if (!user) {
        return {
            success: false,
            message: '로그인이 필요한 서비스 입니다.',
        };
    }

    // 필드별 유효성 검사
    const errors = validateTodoInput({ title, content });

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    const supabase = createServerClient();

    // 할일 등록
    const { data: todo, error: todoError } = await supabase
        .from('todos')
        .insert({
            status: 'READY',
            title,
            content,
            user_id: user.id,
            user_name: user.name,
        })
        .select('id')
        .single();

    if (todoError) {
        return {
            success: false,
            message: `할일 등록에 실패했습니다: ${todoError.message}`,
        };
    }

    revalidatePath('/', 'page');

    return {
        success: true,
        message: '할일이 등록되었습니다.',
        data: { id: todo.id },
    };
}

export async function changeTodoStatus(
    id: string,
    status: TodoStatus,
): Promise<void> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('인증되지 않은 사용자입니다.');
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
        .from('todos')
        .update({
            status,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .select('id')
        .single();

    if (error || !data) {
        throw new Error(
            error?.message ??
                `할일을 찾을 수 없거나 수정 권한이 없습니다. - ID: ${id}`,
        );
    }
}
