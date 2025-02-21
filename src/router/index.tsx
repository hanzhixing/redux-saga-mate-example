import {createBrowserRouter} from 'react-router-dom';
import Homepage from '../components/Homepage';
import ButtonsDemo from '../components/ButtonsDemo';
import TodoListDemo from '../components/TodoListDemo';
import {loadManyTodoByPage} from './loaders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
        children: [
            {
                path: 'button/list',
                element: <ButtonsDemo />,
            },
            {
                path: 'todo/list',
                loader: loadManyTodoByPage,
                element: <TodoListDemo />,
            },
        ],
    },
]);

export default router;
