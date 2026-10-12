import { type Todo } from '@/app/todo/page';

export default function TodoItem({
    id,
    title,
    checked,
}: Todo): React.JSX.Element {
    return <li>{title}</li>;
}
