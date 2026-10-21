export type TodoStatus = 'READY' | 'PROGRESS' | 'DONE';

export interface Todo {
    id: string;
    status: TodoStatus;
    userId: string;
    userName: string;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AddTodoInput {
    title: string;
    content: string;
}

export interface ChangeTodoInput extends AddTodoInput {
    id: string;
    status?: TodoStatus;
}

export interface TodoResponse {
    id: string;
    user_id: string;
    user_name: string;
    status: TodoStatus;
    title: string;
    content: string;
    created_at: string;
    updated_at: string | null;
    deleted_at?: string | null;
}