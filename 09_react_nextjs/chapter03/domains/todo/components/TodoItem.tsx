import { type Todo } from '@/app/todo/page';
import { FaCheckCircle, FaRegCheckCircle, FaRegTrashAlt } from 'react-icons/fa';

type TodoItemProps = Todo & {
    onClick: (id?: number) => void;
    onRemove: (id?: number) => void;
};

export default function TodoItem({
    id,
    title,
    checked,
    onClick,
    onRemove,
}: TodoItemProps): React.JSX.Element {
    return (
        <li className="flex">
            <div className="flex" onClick={() => onClick(id)}>
                {checked ? <FaCheckCircle /> : <FaRegCheckCircle />}
                {title}
            </div>
            <span onClick={() => onRemove(id)}>
                <FaRegTrashAlt />
            </span>
        </li>
    );
}
