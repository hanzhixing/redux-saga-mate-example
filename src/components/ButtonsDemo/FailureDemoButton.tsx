import {path} from 'ramda';
import {FC, useMemo, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isStarted, createAsyncAction, idOfAction, AsyncAction} from 'redux-hyper-action';
import {RootState} from '../../store';
import * as ActionType from '../../constants/actionType';
import Button from '../Button';

const FailureDemoButton: FC = () => {
    const dispatch = useDispatch();

    const [actionId, setActionId] = useState<string>('');

    const action = useSelector<RootState, undefined | AsyncAction>(path(['actions', actionId]));

    const clicked = !!actionId;

    const loading = useMemo(
        () => action && isStarted(action),
        [action],
    );

    const color = useMemo(
        () => (clicked && loading !== true ? 'error' : undefined),
        [clicked, loading],
    );

    const text = useMemo(
        () => {
            if (clicked) {
                if (loading) {
                    return ' Loading...';
                }
                return '\u{1F641} Click again to reset';
            }

            return 'Click -> Loading -> Fail';
        },
        [clicked, loading],
    );

    const handleClick = useCallback(
        () => {
            const action = dispatch(createAsyncAction(ActionType.ASYNC_NOOP, {to: 'fail'}));
            setActionId(idOfAction(action));
        },
        [dispatch, setActionId],
    );

    const handleReset = useCallback(
        () => {
            setActionId('');
        },
        [setActionId],
    );

    return (
        <Button
            onClick={clicked ? handleReset : handleClick}
            color={color}
            loading={loading}
            disabled={loading}
        >
            {text}
        </Button>
    );
};

export default FailureDemoButton;
