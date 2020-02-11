import { generateConfig, generateConfig2 } from "./demo";

test("测试", () => {
    expect(generateConfig()).toMatchInlineSnapshot(
        {
            time: expect.any(Date)
        },
        `
    Object {
      "domain": "local",
      "port": 8083,
      "server": "http://0.0.0.0",
      "time": Any<Date>,
    }
  `
    );
});
