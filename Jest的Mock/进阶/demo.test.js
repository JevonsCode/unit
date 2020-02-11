
jest.mock("./demo");
// unmock 取消用模拟的 mock 改用本地的 demo
// jest.unmock("./demo");

import { fetchData, /*getNumber 这样取的是 __mocks__ 中的文件*/ } from "./demo";

const { getNumber } = jest.requireActual("./demo");

test("mock test", () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual("123");
    })
})

test("getNumber", () => {
    expect(getNumber()).toEqual(100)
})