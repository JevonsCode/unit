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

## Jest

帮助我们完成**单元测试（模块）**、**集成测试（多个模块）**

### Jest 的配置

不用默认配置自行配置：

`npx jest --init`

为了让 Jest 支持 es6 语法，需要安装 

`@babel/core`, `@babel/preset-env`

配置 `.babelrc`

```
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```
[使用 TypeScript](https://jestjs.io/docs/en/getting-started.html#using-typescript)， 安装 `@babel/preset-typescript`，配置：

```
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

### Jest 的运行机制

当运行 `npm run jest` 时，  
jest 内部有一个插件 babel-jest 会检测当前环境下你是否安装了 babel-core，  
如果安装了则会去取 .babelrc 文件中的配置,  
取到后会在运行之前，结合 babel 把代码做一次转化，  
运行转化后的测试用例代码。  

### Jest 的[匹配器](https://jestjs.io/docs/en/expect#methods)

- toBe 匹配器  
    相当于全等（===）
    ```
    ...
        const a = { b: 1 }
        expect(a).toBe({ b: 1 }) // failed （引用地址不同）
    ...
    ```

- toEqual 匹配器  
    ```
    ...
        const a = { b: 1 }
        expect(a).toEqual({ b: 1 }) // passed
    ...
    ```

- toBeNull、toBeUndefined、toBeDefined、toBeTruthy、toBeFalsy 匹配器  
    匹配 null undefined defined true(1) false(0)

- not 匹配器  
    ```
    ...
        expect(1).not.toEqual(2) // passed
    ...
    ```

- toBeGreaterThan、toBeLessThan、toBeGreaterThanOrEqual、toBeLessThanOrEqual 匹配器  
    ```
    const count = 5;
    expect(count).toBeGreaterThan(6); // failed （5 是否大于 6）
    expect(count).toBeLessThanOrEqual(6); // passed （5 是否小于等于 6）
    ```

- toBeCloseTo 匹配器  
    ```
    const a = 0.1;
    const b = 0.1;
    expect(a + b).toBeEqual(0.3); // failed
    expect(a + b).toBeCloseTo(0.3); // passed
    ```

- toMatch 匹配器  
    ```
    const str = "qwertyuiop";
    expect(str).toMatch(/qwer/); // passed
    ```

- toContain 匹配器  
    ```
    const arr = ["q", "w", "e"];
    const data = new Set(arr);
    expect(data).toContain("w"); // passed
    ```

- toThrow 匹配器  
    ```
    const errorThrow = () => { throw new Error("error"); }
    ...
    expect(errorThrow).toThrow(); // passed
    expect(errorThrow).toThrow("error"); // passed
    ```






