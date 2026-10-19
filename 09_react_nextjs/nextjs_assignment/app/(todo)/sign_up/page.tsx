import SignUpForm from '@/domains/auth/components/SignUpForm';

export default function signUpPage(): React.JSX.Element {
    return (
        <>
            <h1>회원가입</h1>
            <SignUpForm />
        </>
    );
}
