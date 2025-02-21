import {parse} from 'qs';
import {LoaderFunction} from 'react-router-dom';
import {createAsyncAction, succeedWith} from 'redux-hyper-action';
import {store} from '../store';
import * as ActionType from '../constants/actionType';
import * as Todo from '../api/endpoint/todo';
import {PAGE_SIZE_OF_TODO_LIST} from '../constants/config';

export const loadManyTodoByPage: LoaderFunction = async ({request: {url}}) => {
    const {search} = new URL(url);

    const {$page, $size} = parse(search, {ignoreQueryPrefix: true});

    const result = await Todo.getMany({
        $page: $page as unknown as number || 1,
        $size: $size as unknown as number || PAGE_SIZE_OF_TODO_LIST,
    });

    const action = createAsyncAction(ActionType.ASYNC_GET_MANY_TODO);

    store.dispatch(succeedWith(result)(action));

    return null;
};
