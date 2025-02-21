import {noop} from 'ramda-adjunct';
import {Fragment, ReactNode, MouseEventHandler} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import Backdrop from './Backdrop';
import ScrollContainer from './ScrollContainer';
import Header from './Header';
import Panel from './Panel';
import Content from './Content';
import Footer from './Footer';

type Props = {
    open: boolean;
    title: ReactNode;
    children: ReactNode;
    onConfirm: MouseEventHandler;
    onCancel: MouseEventHandler;
    onClose?: (open: boolean) => void;
};

const Modal = ({
    open,
    title,
    children,
    onConfirm,
    onCancel,
    onClose = noop,
}: Props) => (
    <Transition show={open} as={Fragment}>
        <Dialog onClose={onClose} className="relative z-10">
            <Backdrop />
            <ScrollContainer>
                <Panel>
                    <Header>{title}</Header>
                    <Content>{children}</Content>
                    <Footer onConfirm={onConfirm} onCancel={onCancel} />
                </Panel>
            </ScrollContainer>
        </Dialog>
    </Transition>
);

export default Modal;
