interface BadgeType {
    theme: string;
    text: string;
}

export default function Badge({ theme, text }: BadgeType): React.JSX.Element {
    return (
        <span
            className={
                theme === 'dark'
                    ? 'bg-black-50 text-white'
                    : 'bg-gray-50 text-black'
            }
        >
            {text}
        </span>
    );
}
