import {Fragment, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import classNames from 'classnames';

const {Child} = Transition;
const {Panel: DialogPanel} = Dialog;

type Props = {
    children: ReactNode;
};

const className = classNames([
    'relative overflow-hidden',
    'rounded-lg bg-white text-left shadow-xl',
    'transform  transition-all',
]);

const Panel = ({children}: Props) => (
    <Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
    >
        <DialogPanel className={className}>
            {children}
        </DialogPanel>
    </Child>
);

export default Panel;
