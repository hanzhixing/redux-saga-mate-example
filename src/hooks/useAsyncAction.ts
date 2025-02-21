import {path} from 'ramda';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {isFinished, AsyncAction} from 'redux-hyper-action';

const useAsyncAction = (actionId: string = '') => {
    const action = useSelector<any, undefined | AsyncAction>(path(['actions', actionId]));

    const loading = useMemo(
        () => !!action && !isFinished(action),
        [action],
    );

    const error = useMemo(
        () => (action?.error ? action.payload : undefined),
        [action],
    );

    return {
        loading,
        error,
    };
};

export default useAsyncAction;
