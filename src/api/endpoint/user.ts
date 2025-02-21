import {normalize, schema} from 'normalizr';
import {faker} from '@faker-js/faker';
import {ApiResponseJson} from '../../types';
import {delay, iso8601, randInt, encodeRestfulError} from '../../utils';

const UserSchema = new schema.Entity('users');

export const noop = ({to}: {to: string}): Promise<void> => delay(3).then(() => {
    if (to === 'success') {
        return;
    }
    throw encodeRestfulError({
        status: 400,
        statusText: 'Bad Request',
        body: '收藏失败',
    });
});

export const getOne = (id: number): Promise<ApiResponseJson> => delay(randInt(1, 3)).then(() => {
    const mock = {
        id,
        name: faker.name.firstName(),
        utime: iso8601(),
    };

    return {
        request: {
            param: {id},
        },
        response: {
            ...normalize(mock, UserSchema),
        },
    };
});
