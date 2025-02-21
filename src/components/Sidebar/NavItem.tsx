import {FC} from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';

const NavItem: FC<NavLinkProps> = ({to, children}) => (
    <li className="flex text-blue-500 hover:text-blue-800 hover:bg-sky-50 py-2 pl-10">
        <NavLink to={to} className="w-full">
            {children}
        </NavLink>
    </li>
);

export default NavItem;
