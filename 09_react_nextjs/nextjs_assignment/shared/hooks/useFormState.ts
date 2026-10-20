'use client';
import { ChangeEvent, useState } from 'react';

type ElementType = HTMLInputElement | HTMLSelectElement;

export default function useFormState<T>(
    initialState: T,
): [T, (e: ChangeEvent<ElementType>) => void] {
    const [form, setForm] = useState(initialState);

    const onChange = (e: ChangeEvent<ElementType>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return [form, onChange];
}
