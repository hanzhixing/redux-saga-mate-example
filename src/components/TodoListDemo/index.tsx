import {append, uniq, path, assocPath} from 'ramda';
import {parse, stringify} from 'qs';
import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {forceInteger} from '../../utils';
import {RootState} from '../../store';
import Pagination from '../Pagination';
import Caption from './Caption';
import AuthorModal from './AuthorModal';
import TodoRow from './TodoRow';

const TodoListDemo = () => {
    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = parse(search, {ignoreQueryPrefix: true});

    const $page = forceInteger(searchParams.get('$page'));

    const $total = useSelector<RootState, number | undefined>(path(['ui', 'todo', '$total'])) as number;
    const todos = useSelector<RootState, number[] | undefined>(path(['ui', 'todo', 'pages', $page, 'ids']));

    const [checked, setChecked] = useState<number[]>([]);

    const handleToggleCheck = useCallback(
        (id: number) => setChecked(uniq(append(id, checked))),
        [checked, setChecked],
    );

    const handleChangePage = useCallback(
        (page: number, pageSize: number) => setSearchParams(params => {
            params.set('$page', String(page));
            return params;
        }),
        [setSearchParams],
    );

    return (
        <>
            <div className="mx-auto">
                <table className="table-fixed w-full">
                    <Caption />
                    <thead className="bg-slate-400 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left w-[80px]">Id</th>
                            <th className="py-2 py-2 text-left">Title</th>
                            <th className="py-2 text-center w-[80px]">Creator</th>
                            <th className="py-2 text-center w-[80px]">Assignee</th>
                            <th className="py-2 text-center w-[100px]">Due Date</th>
                            <th className="py-2 text-center w-[170px]">Create At</th>
                            <th className="py-2 text-center w-[170px]">Update At</th>
                            <th className="py-2 text-center w-[80px]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(todos || []).map(id => (
                            <TodoRow
                                key={id}
                                id={id}
                                checked={checked.includes(id)}
                                onToggleCheck={handleToggleCheck}
                            />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    total={$total}
                    pageSize={5}
                    current={$page}
                    onChange={handleChangePage}
                />
            </div>
            <AuthorModal name="haha" />
        </>
    );
};

export default TodoListDemo;
