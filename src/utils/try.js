const A = (...p) => ({t: A, p});

const B = f => {
    let k = f();

    while (k.t === A) {
        k = f(...k.p);
    }

    return k;
};

const C = n => f => x => B(
    (i = n, k = x) => (i === 0 ? k : A(i - 1, f(k))),
);

// eslint-disable-next-line
const D = n => f => C(n)(i => (f(i), i + 1))(0);
