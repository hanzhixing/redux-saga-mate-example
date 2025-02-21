import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
};

const Content = ({children}: Props) => (
    <div className="bg-white p-5">
        {children}
    </div>
);

export default Content;
