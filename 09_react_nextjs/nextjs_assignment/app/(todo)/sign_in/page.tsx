import SignInForm from '@/domains/auth/components/SignInForm';
import { Suspense } from 'react';
import Loading from '@/shared/components/Loading';

export default function SignInPage(): React.JSX.Element {
    return (
        <>
            <h1>로그인</h1>
            <Suspense fallback={<Loading />}>
                <SignInForm />
            </Suspense>
        </>
    );
}
