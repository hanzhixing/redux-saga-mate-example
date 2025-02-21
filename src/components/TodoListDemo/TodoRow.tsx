import {path} from 'ramda';
import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {RootState} from '../../store';
import {Todo} from '../../types';

type Props = {
    id: number;
    checked: boolean;
    onToggleCheck: (arg: number) => void;
};

const TodoRow = ({id, checked, onToggleCheck}: Props) => {
    const todo = useSelector<RootState, Todo | undefined>(path(['entities', 'todo', id]));

    const handleToggleCheck = useCallback(
        () => onToggleCheck(id),
        [id, onToggleCheck],
    );

    if (!todo) {
        return null;
    }

    const {
        title,
        creator,
        assignee,
        due,
        ctime,
        utime,
        status,
    } = todo;

    return (
        <tr>
            <th className="text-center flex gap-2 items-center">
                <input type="checkbox" checked={checked} onChange={handleToggleCheck} className="rounded p-1" />
                {id}
            </th>
            <td className="text-left">{title}</td>
            <td className="text-center">{creator}</td>
            <td className="text-center">{assignee}</td>
            <td className="text-center">{due}</td>
            <td className="text-center">{format(new Date(ctime), 'yyyy-MM-dd HH:mm')}</td>
            <td className="text-center">{format(new Date(utime), 'yyyy-MM-dd HH:mm')}</td>
            <td className="text-center">{status}</td>
        </tr>
    );
};

export default TodoRow;
