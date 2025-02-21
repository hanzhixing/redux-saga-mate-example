import {compose, path, assocPath} from 'ramda';
import {AnyAction} from '@reduxjs/toolkit';
import {isSuccessfulAction} from '../../redux-saga-mate';
import {ApiResponseJson} from '../../types';
import {forceInteger} from '../../utils';
import * as ActionType from '../../constants/actionType';

type State = {
    $total: number;
    pages: {
        [k in number]?: {
            buffer: number[];
            ids: number[];
        };
    }
};

const intialState: State = {
    $total: 0,
    pages: {},
};

export default (state: State = intialState, action: AnyAction): State => {
    if (isSuccessfulAction<typeof ActionType.ASYNC_GET_MANY_TODO, ApiResponseJson>(action)) {
        const {payload: {request: {query}, response: {$total, result}}} = action;

        const $page = forceInteger(query?.$page);

        const setTotal = assocPath(['$total'], $total);

        const setPage = (() => {
            const pathOfBuffer = ['pages', $page, 'buffer'];
            const pathOfIds = ['pages', $page, 'ids'];

            if ($page > 3 && (path(pathOfIds, state) as number[] || []).length > 0) {
                return assocPath(pathOfBuffer, result);
            }
            return assocPath(pathOfIds, result);
        })();

        return compose(setTotal, setPage)(state) as State;
    }

    if (action.type === ActionType.ACCEPT_UPDATE_TODO_LIST) {
        const {payload: {$page}} = action;

        const pathOfBuffer = ['pages', $page, 'buffer'];
        const pathOfIds = ['pages', $page, 'ids'];

        const moveBufferToIds = compose(
            assocPath(pathOfBuffer, []),
            assocPath(pathOfIds, path(pathOfBuffer, state)),
        );

        return moveBufferToIds(state) as State;
    }

    return state;
};
