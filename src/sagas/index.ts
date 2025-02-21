import {all, takeEvery} from 'redux-saga/effects';
import {makeCreateDefaultWorker} from '../redux-saga-mate';
import * as ActionType from '../constants/actionType';
import * as Misc from '../api/misc';
import * as Todo from '../api/endpoint/todo';
import {decodeCustomError} from '../utils';

const createDefaultWorker = makeCreateDefaultWorker({
    shouldCatch: (error: unknown) => error instanceof Error,
    parseError: (e: unknown) => {
        if (e instanceof Error) {
            return decodeCustomError(e);
        }
        return 'unknown';
    },
});

// Notice!
// If you need more complicated logic controls then the default worker saga,
// you need to implement your own worker sagas.
export default function* () {
    yield all([
        takeEvery(ActionType.ASYNC_NOOP, createDefaultWorker(Misc.noop)),
        takeEvery(ActionType.ASYNC_GET_MANY_TODO, createDefaultWorker(Todo.getMany)),
        // takeEvery(ActionType.ASYNC_PATCH_ONE_TODO, createDefaultWorker(Api.patchOneTodo)),
        // takeEvery(ActionType.ASYNC_GET_ONE_USER_BY_TODO_ID, createDefaultWorker(
        //     Api.getOneUser,
        //     (state, action) => {
        //         const {todoId} = action.payload;
        //         const {author} = state.entities.todos[todoId];
        //         return {id: author};
        //     },
        //     // {autoclear: false},
        // )),
    ]);
}
