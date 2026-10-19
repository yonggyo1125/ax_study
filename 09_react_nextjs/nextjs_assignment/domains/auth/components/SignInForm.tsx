import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
export default function SignInForm(): React.JSX.Element {
    return (
        <form method="post" noValidate autoComplete="off">
            <div className="mb-2">
                <Input
                    type="email"
                    name="email"
                    placeholder="이메일"
                />
            </div>
            <div className="mb-2">
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                />
            </div>
            <Button type="submit">로그인</Button>
        </form>
    );
}
