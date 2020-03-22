function add (a, b) {
    return a + b;
}

function minus (a, b) {
    return a - b;
}

function minusTrue (a, b) {
    let r1, r2, m, n;
    try {
        r1 = a.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = b.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((a * m - b * m) / m).toFixed(n);
}

export { add, minus, minusTrue };