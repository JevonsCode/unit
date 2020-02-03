import { runCallback } from "./demo";

test("runCallback test", () => {
    const func = jest.fn();
    func.mockReturnValueOnce(10).mockReturnValueOnce(20); // 第一次模拟返回结果是 10 可以链式调用
    // func.mockReturnValue(100); // 每次都返回 100
    runCallback(func);
    runCallback(func);
    expect(func).toBeCalled(); // 是否执行 => 方法执行成功
    expect(func.mock.calls.length).toBe(2); // 调用次数测试 func.mock
});