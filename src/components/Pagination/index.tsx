import {useMemo, useCallback} from 'react';
import PageButton from './PageButton';

type Props = {
    total: number;
    pageSize: number;
    current: number;
    onChange: (page: number, pageSize: number) => void;
};

const Pagination = ({total, pageSize, current, onChange}: Props) => {
    const handleClickPageButton = useCallback(
        (page: number) => onChange(page, pageSize),
        [pageSize, onChange],
    );

    const pages = useMemo(
        () => Array.from((new Array(Math.ceil(total / pageSize))).keys()).map(n => n + 1),
        [total, pageSize],
    );

    return (
        <nav>
            <ul>
                {pages.map(n => (
                    <PageButton key={n} active={n === current} onClick={handleClickPageButton}>
                        {n}
                    </PageButton>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
