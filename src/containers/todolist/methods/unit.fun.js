function expect (result) {
    return {
        toBe: function (actual) {
            if (result !== actual) {
                throw new Error(`预期值与实际值不相等 预期${actual} 结果为${result}`);
            }
        }
    }
}

export { expect };