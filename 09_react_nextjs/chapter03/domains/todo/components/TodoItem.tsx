import { type Todo } from '@/app/todo/page';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';

export default function TodoItem({
    id,
    title,
    checked,
}: Todo): React.JSX.Element {
    return (
        <li className="flex">
            {checked ? <FaCheckCircle /> : <FaRegCheckCircle />}
            {title}
        </li>
    );
}
