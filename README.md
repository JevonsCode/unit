# UNIT
note of unit

---

## 前端自动化测试产生的背景及原理

作为一名**开发**会有各种各样的 BUG，为了不让 BUG 上线我们可以通过自测、测试、代码 review、灰度&白名单等进一步提升我们的代码可靠性，降低 BUG 到产线的概率。

作为一个前端来说，我们为了进一步降低我们的 BUG 上线的可能性，我们会使用 TypeScript、eslint 等工具提升我们的代码质量。但也难免还是会漏掉一些 BUG 以及测试同学需要每次都没有着重点的“泛”测试等一系列繁琐的问题，我们用自动化测试和单元测试来更进一步地解决这些问题。

## 自己编写一个类似 Jest 中方法的实现

main.js
```js
function add (a, b) {
    return a + b;
}

function minus (a, b) {
    return a - b;
}
```

main.test.js
```js
function expect (result) {
    return {
        toBe: function (actual) {
            if (result !== actual) {
                throw new Error(`预期值与实际值不相等 预期${actual} 结果为${result}`)
            }
        }
    }
}

function test (desc, fn) {
    try {
        fn();
        console.log(`${desc} 通过测试`);
    } catch (e) {
        console.log(`${desc} 没有通过测试 ${e}`)
    }
}

test('测试加法 3 + 7', () => {
    expect(add(3, 7)).toBe(10)
})

test('测试减法 7 - 3', () => {
    expect(add(7, 3)).toBe(4)
})
```


