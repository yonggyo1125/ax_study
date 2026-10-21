'use client';

import { ChangeEvent, useState } from 'react';

type ElementType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function useInputs<T>(
    initialState: T,
): [form: T, onChange: (e: ChangeEvent<ElementType>) => void] {
    const [form, setForm] = useState(initialState);

    const onChange = (e: ChangeEvent<ElementType>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    return [form, onChange];
}
