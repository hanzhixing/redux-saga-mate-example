import {delay, encodeRestfulError} from '../utils';

type Param = {
    to: 'succeed' | 'fail',
    [k: string]: any,
};

export const noop = ({to}: Param): Promise<void> => delay(2).then(() => {
    if (to === 'succeed') {
        return;
    }
    throw encodeRestfulError({
        status: 400,
        statusText: 'Bad Request',
        body: '收藏失败',
    });
});
