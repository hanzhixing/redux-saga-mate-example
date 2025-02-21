import {FC} from 'react';
import NavItem from './NavItem';

const navs = [
    {
        to: 'button/list',
        text: 'Simple Buttons',
    },
    {
        to: '/todo/list',
        text: 'Todo List',
    },
];

const Sidebar: FC = () => (
    <aside className="w-1/5 border-r border-gray-100 shrink-0">
        <nav>
            <menu>
                {navs.map(({to, text}) => (
                    <NavItem key={to} to={to}>{text}</NavItem>
                ))}
            </menu>
        </nav>
    </aside>
);

export default Sidebar;
