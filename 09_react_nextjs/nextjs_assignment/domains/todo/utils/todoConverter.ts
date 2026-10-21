import type { Todo, TodoResponse } from '../types/todo.types';

export function toTodo(data: TodoResponse): Todo {
    return {
        id: data.id,
        userId: data.user_id,
        userName: data.user_name,
        status: data.status,
        title: data.title,
        content: data.content,
        createdAt: data.created_at,
        updatedAt: data.updated_at ?? undefined,
        deletedAt: data.deleted_at ?? undefined,
    };
}
