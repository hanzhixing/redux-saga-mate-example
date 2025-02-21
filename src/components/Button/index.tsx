import {forwardRef, useMemo, ReactNode, MouseEventHandler} from 'react';
import {CgSpinner} from 'react-icons/cg';
import classNames from 'classnames';

type Props = {
    onClick: MouseEventHandler;
    children: ReactNode;
    color?: 'success' | 'error';
    loading?: boolean;
    disabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(({
    onClick,
    children,
    color,
    loading,
    disabled,
}, ref) => {
    const colorName = useMemo(
        () => {
            if (disabled) {
                return 'bg-gray-400';
            }

            if (color === 'success') {
                return 'bg-green-700';
            }

            if (color === 'error') {
                return 'bg-red-700';
            }

            return 'bg-blue-700';
        },
        [color, disabled],
    );

    const className = useMemo(
        () => classNames([
            'flex items-center',
            'text-white px-4 py-2 rounded-md',
            `${colorName} hover:${colorName}`,
            'hover:shadow-lg',
        ]),
        [colorName],
    );

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {loading && <CgSpinner className="animate-spin mx-1" />}
            {children}
        </button>
    );
});

export default Button;
