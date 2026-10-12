'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import TodoItem from '@/domains/todo/components/TodoItem';

export interface Todo {
    id?: number;
    title?: string;
    checked?: boolean;
}

export default function TodoPage(): React.JSX.Element {
    const [form, setForm] = useState<Todo>({});
    const [items, setItems] = useState<Todo[]>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, title: e.target.value});
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        
    };
    return (
        <>
            <form>
                <input type="text" name="title" className="border" onChange={onChange} value={form.title} />
                <button type="submit" className="border">
                    할일 등록
                </button>
            </form>
        </>
    );
}
