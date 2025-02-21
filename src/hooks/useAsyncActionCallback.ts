import {path} from 'ramda';
import {useMemo, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isStarted, isFinished, createAction, createAsyncAction, idOfAction, AsyncAction} from 'redux-hyper-action';
import {RootState} from '../store';

const useAsyncActionCallback = (type: string, payload: any, cleanupType?: string) => {
    const dispatch = useDispatch();

    const [actionId, setActionId] = useState<string>('');

    const action = useSelector<RootState, undefined | AsyncAction>(path(['actions', actionId]));

    const started = useMemo(
        () => !!action && isStarted(action),
        [action],
    );

    const finished = useMemo(
        () => !!action && isFinished(action),
        [action],
    );

    const process = useCallback(
        () => setActionId(idOfAction(dispatch(createAsyncAction(type, payload)))),
        [dispatch, setActionId, type, payload],
    );

    const cleanup = useCallback(
        () => {
            if (!cleanupType) {
                return;
            }
            dispatch(createAction(cleanupType, actionId));
            setActionId('');
        },
        [dispatch, actionId, setActionId, cleanupType],
    );

    return {
        actionId,
        started,
        finished,
        error: action?.error,
        payload: action?.payload,
        process,
        cleanup,
    };
};

export default useAsyncActionCallback;
