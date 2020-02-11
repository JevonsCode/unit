jest.mock("./util");
// jest.mock 发现 util 是一个类，会自动把类的构造函数和方法变成 jest.fn()
/**
 * const Util = jest.fn();
 * Util.a = jest.fn();
 * Util.b = jest.fn();
 */
import Util from "./util";

import demoFunction from "./demo";

test("demoFunction test", () => {
    // const Util = new Util();
    demoFunction();
    expect(Util).toHaveBeenCalled();
    console.log("--> ", Util.mock.instances[0])
})