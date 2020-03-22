import { add, minus, minusTrue } from "./calculator.js";


it.only('测试加法 3 + 7, 期望结果是 10', () => {
    expect(add(3, 7)).toEqual(10);
})

test('测试加法 0.1 + 0.2, 期望结果是 0.3', () => {
    expect(add(0.1, 0.2)).toBe(0.3);
});