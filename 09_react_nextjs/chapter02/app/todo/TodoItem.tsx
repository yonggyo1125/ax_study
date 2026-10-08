import { type TodoType } from './Todo';

export default function TodoItem({
    id,
    title,
    checked,
    ref
}: TodoType): React.JSX.Element {
    return <li ref={ref}>{title}</li>;
}
