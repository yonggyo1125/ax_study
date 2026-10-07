export default function MemberLayout({
    children,
}: LayoutProps<'/member'>): React.ReactNode {
    return (
        <div>
            <h1>회원 공통!!!</h1>
            {children}
        </div>
    );
}
