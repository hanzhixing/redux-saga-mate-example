import {ReactNode} from 'react';
import {Dialog} from '@headlessui/react';

const {Title} = Dialog;

type Props = {
    children: ReactNode,
};

const Header = ({children}: Props) => (
    <Title as="h3" className="bg-gray-100 px-4 py-3 font-semibold leading-6 text-gray-900">
        {children}
    </Title>
);

export default Header;
