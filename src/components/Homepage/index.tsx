import {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {ReactComponent as GithubCat} from './GithubCat.svg';
import Sidebar from '../Sidebar';

const Homepage: FC = () => (
    <div className="container mx-auto">
        <header className="flex justify-center mt-5 mb-20">
            <a
                href="https://github.com/hanzhixing/redux-saga-mate.git"
                target="_blank"
                rel="noopener noreferrer"
            >
                <GithubCat width="42" height="42" />
            </a>
        </header>
        <section className="flex">
            <Sidebar />
            <aside className="ml-10">
                <Outlet />
            </aside>
        </section>
    </div>
);

export default Homepage;
