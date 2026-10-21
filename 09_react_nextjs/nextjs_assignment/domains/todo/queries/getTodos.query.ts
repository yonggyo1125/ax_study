'use server';

import { getCurrentUser } from '@/domains/auth/queries/getCurrentUser.query';
import { createServerClient } from '@/shared/lib/supabase';
import type { Todo, TodoResponse } from '../types/todo.types';
import { toTodo } from '../utils/todoConverter';

export async function getTodos(): Promise<Todo[]> {
    const supabase = createServerClient();
    const { user } = await getCurrentUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`할일을 조회하지 못했습니다.`, error.message);
        return [];
    }

    if (!data) return [];

    return (data as TodoResponse[]).map((item) => toTodo(item));
}
