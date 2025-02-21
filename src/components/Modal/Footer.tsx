import {MouseEventHandler} from 'react';
import Button from '../Button';

type Props = {
    onConfirm: MouseEventHandler;
    onCancel: MouseEventHandler;
};

const Footer = ({onConfirm, onCancel}: Props) => (
    <div className="flex justify-center gap-4 bg-gray-100 px-4 py-3">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel}>Cancel</Button>
    </div>
);

export default Footer;
