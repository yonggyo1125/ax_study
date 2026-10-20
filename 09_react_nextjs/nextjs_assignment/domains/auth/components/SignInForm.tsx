'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useFormState from '@/shared/hooks/useFormState';
import { signInAction } from '../actions/login.action';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface FormType {
    email: string;
    password: string;
}

const initialForm: FormType = {
    email: '',
    password: '',
};
export default function SignInForm(): React.JSX.Element {
    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const [state, formAction, isPending] = useActionState(
        signInAction,
        INITIAL_ACTION_STATE,
    );

    const [form, onChange] = useFormState<FormType>(initialForm);

    useEffect(() => {
        if (state.success) {
            router.push(redirectUrl);
            router.refresh();
        }
    },[state.success, router, redirectUrl]);

    return (
        <div>
            {state.message && !state.success && (
                <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-600">
                    <span>{state.message}</span>
                </div>
            )}
            <form action={formAction} noValidate autoComplete="off">
                <div className="mb-2">
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={form.email}
                        onChange={onChange}
                    />
                </div>
                {state.errors?.email && (
                    <div className="text-red-200 mb-4">
                        {state.errors.email}
                    </div>
                )}
                <div className="mb-2">
                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={onChange}
                    />
                </div>
                {state.errors?.password && (
                    <div className="text-red-200 mb-4">
                        {state.errors.password}
                    </div>
                )}
                <Button type="submit" disabled={isPending}>
                    {isPending ? '처리중...' : '로그인'}
                </Button>
            </form>
        </div>
    );
}
