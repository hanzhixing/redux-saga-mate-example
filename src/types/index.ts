export * from './entity';

export type PlainPrimitive = undefined | null | string | number | boolean;
export type PlainObject = {[k in string]?: PlainValue};
export type PlainArray = PlainValue[];
export type PlainValue = PlainPrimitive | PlainObject | PlainArray;

export type ResultErrorEntry = {
    code: number;
    msg: string;
    var?: {
        [k in string]?: number | string;
    };
};

export type ResultErrorFieldEntry = ResultErrorEntry & {
    key: string[];
};

export type RestfulErrorBodyFields = ResultErrorFieldEntry[];

export type RestfulErrorBody = ResultErrorEntry & {
    fields?: ResultErrorFieldEntry[];
};

export type RestfulError = {
    status: number;
    statusText: string;
    body?: string | RestfulErrorBody;
};

export type PagingParam = {
    $page: number;
    $size: number;
};

export type OffsetPagingParam = {
    $offset: number;
    $limit: number;
};

export type CursorPagingParam = {
    $cursor: {
        [k: string]: string | number | boolean;
    };
    $count: number;
};

export type ApiResponseJson<
    T extends string = string,
    K extends (string | number) = number,
    O extends PlainValue = PlainValue,
> = {
    request: {
        param?: {
            [k: string]: number | string;
        };
        query?: {
            [k: string]: number | string | {
                [k: string]: number | string;
            };
        };
        body?: PlainValue;
    };
    response: {
        $total?: number;
        result: string[] | number[];
        entities: {
            [t in T]: {
                [k in K]: O;
            };
        };
    };
};
