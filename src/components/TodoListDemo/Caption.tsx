import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import Button from '../Button';

const Caption = () => {
    const buffer = ['a'];

    const handleAcceptNewData = useCallback(
        () => {
            // TODO
        },
        [],
    );

    if (buffer.length === 0) {
        return null;
    }

    return (
        <caption className="caption-bottom">
            <div className="flex justify-center items-center gap-4 py-6">
                {`There is ${buffer.length} new records.`}
                <Button onClick={handleAcceptNewData}>
                    Click to accpet!
                </Button>
            </div>
        </caption>
    );
};

export default Caption;
