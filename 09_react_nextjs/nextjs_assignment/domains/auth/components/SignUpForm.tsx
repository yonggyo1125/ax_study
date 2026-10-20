'use client';

import { ChangeEvent, useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { signUpAction } from '../actions/signup.actions';

interface FormType {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
}

const initialForm: FormType = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
};

export default function SignUpForm(): React.JSX.Element {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        signUpAction,
        INITIAL_ACTION_STATE,
    );

    const [form, setForm] = useState(initialForm);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        console.log('호출1');
        if (state.success) {
            console.log('호출2');
            alert(state.message);
            router.replace('/');
            router.refresh();
        }
    }, [state.success, state.message, router]);

    return (
        <div>
            {state.message && !state.success && (
                <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-600">
                    <span>{state.message}</span>
                </div>
            )}
            <form action={formAction} noValidate autoComplete="off">
                <div className="flex mb-2 items-center">
                    <label className="basis-30">이메일</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력하세요."
                        value={form.email}
                        onChange={onChange}
                    />
                </div>
                {state.errors?.email && (
                    <div className="text-red-200 mb-4">
                        {state.errors.email}
                    </div>
                )}

                <div className="flex mb-2 items-center">
                    <label className="basis-30">회원명</label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="회원명을 입력하세요."
                        value={form.name}
                        onChange={onChange}
                    />
                </div>
                {state.errors?.name && (
                    <div className="text-red-200 mb-4">{state.errors.name}</div>
                )}

                <div className="flex mb-2 items-center">
                    <label className="basis-30">비밀번호</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>
                {state.errors?.password && (
                    <div className="text-red-200 mb-4">
                        {state.errors.password}
                    </div>
                )}

                <div className="flex mb-2 items-center">
                    <label className="basis-30">비밀번호 확인</label>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>
                {state.errors?.passwordConfirm && (
                    <div className="text-red-200 mb-4">
                        {state.errors.passwordConfirm}
                    </div>
                )}

                <Button type="submit" disabled={isPending}>
                    {isPending ? '처리중...' : '가입하기'}
                </Button>
            </form>
        </div>
    );
}
