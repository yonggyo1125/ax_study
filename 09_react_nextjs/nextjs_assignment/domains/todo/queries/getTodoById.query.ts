'use server';

import { getCurrentUser } from '@/domains/auth/queries/getCurrentUser.query';
import { createServerClient } from '@/shared/lib/supabase';
import { Todo } from '../types/todo.types';
import { toTodo } from '../utils/todoConverter';

export async function getTodoById(id: string): Promise<Todo | null> {
    const supabase = createServerClient();
    const { user } = await getCurrentUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .maybeSingle();

    if (error) {
        console.error(
            `할일을 조회하지 못했습니다. [id: ${id}]:`,
            error.message,
        );
        return null;
    }

    if (!data) return null;

    return toTodo(data);
}
