import { generateConfig, generateConfig2 } from "./demo";

test("测试", () => {
    expect(generateConfig()).toMatchSnapshot({
        time: expect.any(Date)
    });
});

test("测试", () => {
    expect(generateConfig2()).toMatchSnapshot({
        time: expect.any(Date)
    });
});