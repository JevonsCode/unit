import Demo from "./demo";

// beforeAll 相当于在最前面 const demo = new Demo();

let demo = null;

// 在测试用例之前
// beforeAll(() => {
//     demo = new Demo();
// });

// 在测试用例之之后
// afterAll(() => {
//     do sth
// });

// 在测试用例之前分别执行
beforeEach(() => {
    demo = new Demo();
});

// 在测试用例之后分别执行
// afterEach(() => {
//     do sth
// });

describe("测试关于四则运算的代码", () => {
    test("加法的测试", () => {
        demo.add();
        expect(demo.count).toBe(1); // passed
    });

    test("减法的测试", () => {
        demo.minus();
        expect(demo.count).toBe(-1); // passed 用 beforeAll 测试用例等于用同一个 `demo` 实例
    });
});
describe("测试关于四则运算的代码2", () => {
    test("加法的测试", () => {
        demo.add();
        expect(demo.count).toBe(1); // passed
    });

    test("减法的测试", () => {
        demo.minus();
        expect(demo.count).toBe(-1); // passed 用 beforeAll 测试用例等于用同一个 `demo` 实例
    });
});