import {PlainValue, RestfulError} from '../types';

export const delay = (seconds: number, signal?: AbortSignal) => {
    if (signal?.aborted) {
        return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }

    return new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(resolve, seconds * 1000);

        if (!signal) {
            return;
        }

        signal.addEventListener('abort', () => {
            window.clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });
};

// @see https://stackoverflow.com/questions/30452263/is-there-a-mechanism-to-loop-x-times-in-es6-ecmascript-6-without-mutable-varia
type AnyFunction = (...args: any[]) => any;
type Recur = (...args: any[]) => {type: Recur, args: any[]};

const recur:Recur = (...args) => ({type: recur, args});

const loop = (f: AnyFunction): number => {
    let acc = f();
    while (acc.type === recur) {
        acc = f(...acc.args);
    }
    return acc;
};

export const repeat = (n: number) => (f: (a: number) => number) => (x: number) => loop(
    (i = n, acc = x) => (i === 0 ? acc : recur(i - 1, f(acc))),
);

// eslint-disable-next-line
export const times = (n: number) => (f: AnyFunction) => repeat(n)((i: number) => (f(i), i + 1))(0);

export const offsetToPage = (offset: number, limit = 10) => (offset / limit + 1);

export const pageToOffset = (page: number, size = 10) => (page > 1 ? (page - 1) * size : 0);

export const e2e = (tag: string) => `test-id-${tag}`;

export const encodeCustomError = (name: string, message: PlainValue) => (
    new Error(JSON.stringify({name, message}))
);

export const decodeCustomError = (error: Error) => {
    try {
        return JSON.parse(error.message);
    } catch (e) {
        const {name, message} = error;

        return {name, message};
    }
};

export const isRestfulError = (error: Error) => (error.name === 'RestfulError');

export const encodeRestfulError = (o: RestfulError) => encodeCustomError('RestfulError', o);

export const decodeRestfulError = (error: Error): RestfulError => {
    const {message} = decodeCustomError(error);

    return message;
};

export const randInt = (min: number, max: number) => {
    const a = Math.ceil(min);
    const b = Math.floor(max);
    return Math.floor(Math.random() * (a - b + 1) + b);
};

export const iso8601 = (
    v?: ConstructorParameters<DateConstructor>[0],
) => (v ? new Date(v) : new Date()).toISOString();

export const forceInteger = (mixed: unknown) => {
    const numberToInteger = (n: number) => {
        if (Number.isNaN(n)) {
            return 0;
        }
        if (Number.isFinite(n)) {
            return n < 0 ? Math.ceil(n) : Math.floor(n);
        }
        return Math.trunc(n);
    };

    if (typeof mixed === 'boolean') {
        return +mixed;
    }

    if (typeof mixed === 'number') {
        return numberToInteger(mixed);
    }

    if (typeof mixed === 'string') {
        return numberToInteger(Number.parseInt(mixed));
    }

    return 0;
};
