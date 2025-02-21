import {normalize, schema} from 'normalizr';
import {omit} from 'ramda';
import {PagingParam, ApiResponseJson, Todo} from '../../types';
import {delay, randInt, encodeRestfulError, pageToOffset} from '../../utils';
import * as Mock from '../mock';

const TodoSchema = new schema.Entity('todo');
const UserSchema = new schema.Entity('user');

TodoSchema.define({
    creator: UserSchema,
    assignee: UserSchema,
});

type GetManyParam = PagingParam & {
    $page: number;
    $size: number;
};

export const getMany = ({$page = 1, $size = 5}: GetManyParam) => delay(randInt(1, 2)).then(() => {
    const todos = Mock.getManyTodo(pageToOffset($page, $size), $size);

    return {
        request: {
            query: {$page, $size},
        },
        response: {
            $total: Mock.todo.length,
            ...normalize(todos, [TodoSchema]),
        },
    };
});

export const patchOne = (todo: Partial<Todo>): Promise<ApiResponseJson> => delay(randInt(2, 3))
    .then(() => {
        const mock: Partial<Todo> = {
            id: todo.id!,
        };

        if (!(Number(todo.id) % 3)) {
            throw encodeRestfulError({
                status: 400,
                statusText: 'Bad Request',
                body: '收藏失败',
            });
        }

        return {
            request: {
                params: {
                    id: todo.id,
                },
                body: {
                    ...omit(['id'], todo),
                },
            },
            response: {
                ...normalize(mock, TodoSchema),
            },
        };
    });
