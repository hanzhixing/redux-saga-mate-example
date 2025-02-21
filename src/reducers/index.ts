import {mergeDeepRight} from 'ramda';
import {AnyAction, combineReducers} from '@reduxjs/toolkit';
import {
    createActionsReducer,
    createEntitiesReducer,
    groupByComposeByEntityType,
    isSuccessfulAction,
} from '../redux-saga-mate';
import {ApiResponseJson, Todo} from '../types';
import * as ActionType from '../constants/actionType';
import ui from './ui';

type TodoSector = {
    [k in number]?: Todo;
};

const todoReducer = (
    state: TodoSector = {} as TodoSector,
    action: AnyAction,
): TodoSector => {
    if (isSuccessfulAction<typeof ActionType.ASYNC_GET_MANY_TODO, ApiResponseJson>(action)) {
        const {response: {entities: {todo}}} = action.payload;
        return mergeDeepRight(state, todo) as TodoSector;
    }
    return state;
};

const ENTITY_ACTION_MAP = {
    todo: {
        [ActionType.ASYNC_GET_MANY_TODO]: todoReducer,
        [ActionType.ASYNC_DELETE_ONE_TODO]: 'DELETE',
        [ActionType.ASYNC_PATCH_ONE_TODO]: 'UPDATE',
    },
    user: {
        [ActionType.ASYNC_GET_MANY_TODO]: 'UPDATE',
        [ActionType.ASYNC_GET_ONE_USER_BY_TODO_ID]: 'UPDATE',
    },
} as const;

const locators = {
    UPDATE: [
        ['response', 'entities'],
    ],
    DELETE: [
        ['request', 'param', 'id'],
    ],
};

export default combineReducers({
    actions: createActionsReducer({
        shouldCleanup: ({type}) => (type === ActionType.CLEANUP),
        shouldTrack: ({type}) => (/^ASYNC_/.test(type)),
    }),
    session: (state = {}) => state,
    entities: combineReducers(
        groupByComposeByEntityType(
            createEntitiesReducer(locators, ENTITY_ACTION_MAP),
            {},
        ),
    ),
    ui,
});
