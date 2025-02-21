import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
};

const ScrollContainer = ({children}: Props) => (
    <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 ">
            {children}
        </div>
    </div>
);

export default ScrollContainer;
