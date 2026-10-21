import Header from '@/shared/components/Header';
import { Suspense } from 'react';
import Loading from '@/shared/components/Loading';

interface TodoLayoutProps {
    children: React.ReactNode;
}
export default function TodoLayout({
    children,
}: TodoLayoutProps): React.ReactNode {
    return (
        <div className="max-w-2xl w-full mx-auto min-w-xs px-4 ">
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <main>{children}</main>
        </div>
    );
}
