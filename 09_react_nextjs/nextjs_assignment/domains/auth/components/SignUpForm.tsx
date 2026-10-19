'use client';

import { useActionState } from 'react';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { signUpAction } from '../actions/signup.actions';

export default function SignUpForm(): React.JSX.Element {
    const [state, formAction, isPending] = useActionState(
        signUpAction,
        INITIAL_ACTION_STATE,
    );

    console.log('state:', state, 'isPending:', isPending);

    return (
        <form action={formAction} noValidate autoComplete="off">
            <div className="flex mb-2 items-center">
                <label className="basis-30">이메일</label>
                <Input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력하세요."
                />
            </div>
            <div className="flex mb-2 items-center">
                <label className="basis-30">회원명</label>
                <Input
                    type="text"
                    name="name"
                    placeholder="회원명을 입력하세요."
                />
            </div>
            <div className="flex mb-2 items-center">
                <label className="basis-30">비밀번호</label>
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                />
            </div>
            <div className="flex mb-2 items-center">
                <label className="basis-30">비밀번호 확인</label>
                <Input
                    type="password"
                    name="passwordConfirm"
                    placeholder="비밀번호를 입력하세요."
                />
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? '처리중...' : '가입하기'}
            </Button>
        </form>
    );
}
