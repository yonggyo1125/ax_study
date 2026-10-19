import Header from '@/shared/components/Header';
interface TodoLayoutProps {
    children: React.ReactNode;
}
export default function TodoLayout({
    children,
}: TodoLayoutProps): React.ReactNode {
    return (
        <div className="max-w-2xl w-full mx-auto min-w-xs px-4 ">
            <Header />
            <main>{children}</main>
        </div>
    );
}
