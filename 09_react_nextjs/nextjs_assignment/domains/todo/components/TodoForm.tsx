'use client';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import TiptabEditor from '@/shared/components/TiptabEditor';

interface FormState {
    title: string;
    content: string;
}

const initialState: FormState = {
    title: '',
    content: '',
};

export default function TodoForm() {
    const [form, setForm] = useState(initialState);
    const onChange = (e: ChangeEvent<HTMLInputElement> | string) => {
        setForm((prev) => {
            let key, value;
            if (typeof e === 'string') {
                key = 'content';
                value = e;
            } else {
                key = e.target.name;
                value = e.target.value;
            }

            return { ...prev, [key]: value };
        });
    };
    return (
        <div>
            <form noValidate autoComplete="off">
                <input type="hidden" name="content" value={form.content} />
                <div className="flex mb-2 items-center">
                    <label className="basis-30 shrink-0">할일</label>
                    <div className="grow">
                        <Input
                            type="text"
                            name="title"
                            placeholder="할일을 입력하세요..."
                            value={form.title}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="flex mb-2 items-center">
                    <label className="basis-30 shrink-0">내용</label>
                    <div className="grow">
                        <TiptabEditor
                            content={form.content}
                            onChange={onChange}
                            placeholder="할일의 상세 내용을 입력하세요..."
                        />
                    </div>
                </div>
                <Button type="submit">등록하기</Button>
            </form>
        </div>
    );
}
