import {useMemo, useCallback} from 'react';
import classNames from 'classnames';

type Props = {
    active: boolean;
    children: number;
    onClick: (page: number) => void;
};

const PageButton = ({active = false, children, onClick}: Props) => {
    const className = useMemo(
        () => {
            const commonClassNames = [
                'inline-flex items-center',
                'first:rounded-l-md last:rounded-r-md',
                'first:pl-1 last:pr-1',
            ];

            const activeClassNames = [
                'text-white',
                'bg-blue-600',
                'border border-blue-600',
            ];

            const normalClassNames = [
                'text-gray-700',
                'border border-gray-300',
                'hover:bg-gray-100',
            ];

            return classNames(
                commonClassNames,
                active ? activeClassNames : normalClassNames,
            );
        },
        [active],
    );

    const handleClick = useCallback(
        () => onClick(children),
        [children, onClick],
    );

    return (
        <li className={className}>
            <button
                type="button"
                onClick={handleClick}
                className="px-3 py-2 text-sm font-semibold"
            >
                {children}
            </button>
        </li>
    );
};

export default PageButton;
