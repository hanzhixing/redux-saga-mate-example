import {path} from 'ramda';
import {FC, useMemo, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isStarted, createAsyncUniqueAction, idOfAction, AsyncAction} from 'redux-hyper-action';
import {RootState} from '../../store';
import * as ActionType from '../../constants/actionType';
import Button from '../Button';

const SharedStateDemoButton3: FC = () => {
    const dispatch = useDispatch();

    const [actionId, setActionId] = useState<string>('');

    const action = useSelector<RootState, undefined | AsyncAction>(path(['actions', actionId]));

    const clicked = !!actionId;

    const loading = useMemo(
        () => action && isStarted(action),
        [action],
    );

    const text = useMemo(
        () => {
            if (clicked && loading) {
                return 'Loading...';
            }

            return 'Click to Loding';
        },
        [clicked, loading],
    );

    const handleClick = useCallback(
        () => {
            const action = dispatch(createAsyncUniqueAction(ActionType.ASYNC_NOOP, {to: 'succeed', foo: 'bar'}));
            setActionId(idOfAction(action));
        },
        [dispatch, setActionId],
    );

    return (
        <Button
            onClick={handleClick}
            loading={loading}
            disabled={loading}
        >
            {`[3] ${text}`}
        </Button>
    );
};

export default SharedStateDemoButton3;
