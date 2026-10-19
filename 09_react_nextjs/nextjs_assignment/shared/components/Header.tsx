import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
export default function Header(): React.JSX.Element {
    return (
        <header className="flex justify-between p-3 bg-indigo-100 mb-4 item-center">
            <div>로고로 채워주세요.</div>
            <div>
                <Link href="/sign_in">
                    <Button variant="outline" className="cursor-pointer">
                        <FaSignInAlt /> 로그인
                    </Button>
                </Link>
                <Link href="/sign_up">
                    <Button variant="secondary" className="ml-1 cursor-pointer">
                        <FaUserPlus /> 회원가입
                    </Button>
                </Link>
            </div>
        </header>
    );
}
