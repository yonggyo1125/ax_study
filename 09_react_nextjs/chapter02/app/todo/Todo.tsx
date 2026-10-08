'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

interface TodoType {
    title: string;
}

export default function Todo(): React.JSX.Element {
    const [items, setItems] = useState<TodoType[]>([]);
    const [title, setTitle] = useState<string>('');

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('기본 동작 차단?');
    };

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log('입력...');
        // // console.log('this', this);
        // console.log('e.target', e.target);
        // console.log('value:', e.target.value);
        setTitle(e.target.value);
    };

    return (
        <>
            <form onSubmit={formHandler}>
                <input
                    type="text"
                    name="title"
                    className="border"
                    onChange={titleHandler}
                />

                <button type="submit" className="border ml-1">
                    등록
                </button>
            </form>
            <ul>{items}</ul>
        </>
    );
}
