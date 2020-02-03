import { add, minus } from "./math";

test('测试加法 3 + 7', () => {
    expect(add(3, 7)).toBe(10)
})

test('测试加法 3 - 7', () => {
    expect(minus(3, 7)).toBe(-4)
})