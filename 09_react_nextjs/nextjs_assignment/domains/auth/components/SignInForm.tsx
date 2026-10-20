'use client';

import { useActionState } from 'react';
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
    const [state, formAction, isPending] = useActionState(
        signInAction,
        INITIAL_ACTION_STATE,
    );

   const [form, onChange] = useFormState<FormType>(initialForm);



    return (
        <form action={formAction} noValidate autoComplete="off">
            <div className="mb-2">
                <Input type="email" name="email" placeholder="이메일" value={form.email} onChange={onChange} />
            </div>
            <div className="mb-2">
                <Input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={onChange} />
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? '처리중...' : '로그인'}
            </Button>
        </form>
    );
}
