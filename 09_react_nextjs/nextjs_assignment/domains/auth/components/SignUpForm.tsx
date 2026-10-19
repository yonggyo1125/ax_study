import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
export default function SignUpForm(): React.JSX.Element {
    return (
        <form method="post" noValidate autoComplete="off">
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
                    type="email"
                    name="email"
                    placeholder="이메일을 입력하세요."
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
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                />
            </div>
            <Button type="submit">가입하기</Button>
        </form>
    );
}
