import {useState, useCallback} from 'react';
import Modal from '../Modal';

type Props = {
    name: string;
};

const AuthorModal = ({name}: Props) => {
    const [open, setOpen] = useState(false);

    const handleConfirm = useCallback(
        () => setOpen(false),
        [setOpen],
    );

    const handleCancel = useCallback(
        () => setOpen(false),
        [setOpen],
    );

    return (
        <Modal
            open={open}
            title={`Author: ${name}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <div className="w-[600px]">
                This action cannot be undone.
            </div>
        </Modal>
    );
};

export default AuthorModal;
