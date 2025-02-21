export type Denormalize<T, S> = Omit<T, keyof S> & {
    [P in keyof S]: P extends keyof T ? S[P] : never;
};

export type User = {
    id: number;
    name: string;
    deleted: boolean;
};

export type Todo = {
    id: number;
    title: string;
    creator: number;
    assignee: number;
    due: string;
    ctime: string;
    utime: string;
    status: 'TODO' | 'DOING' | 'DONE' | 'CANCEL';
    deleted: boolean;
};
