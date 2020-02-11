# 开发前了解

## TDD 的开发流程（Red-Green Develement)

1. 编写测试用例
2. 运行测试，测试用例无法通过测试。
3. 编写代码，使测试用例通过测试。
4. 优化代码，完成开发。
5. 重复上述步骤。

## TDD 的优势

1. 长期减少回归 bug。
2. 代码质量更好（组织，可维护性）。
3. 测试覆盖率高。
4. 错误测试代码不容易出现。（先写业务代码再写测试代码，测试代码是按照业务代码而写的，而业务代码本来就是有问题的，导致不能检测出问题。）



# 测试 React 代码

写 jest 测试前需要对 [jest config](https://jestjs.io/docs/zh-Hans/configuration) 进行了解

## [Enzyme](https://airbnb.io/enzyme/)

### [安装](https://github.com/airbnb/enzyme#installation)

`npm i --save-dev enzyme enzyme-adapter-react-16`

### 使用

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

对于：

```react
import React from 'react';

function App () {
    return (
        <div className="App">
            <div className="App"></div>
            jest
        </div>
    );
}

export default App;
```

我们如果不用 enzyme 测试 dom 应该是以下的代码，在 App 中找 className 然后查看是否存在。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    const container = div.getElementsByClassName("App");
    console.log("--> ", (container));
    expect(container.length).toBe(2)
});
```

如果使用 enzyme：

```react
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = shallow(<App />) // <==
    expect(wrapper.find('.App').length).toBe(2);
});
```

其中 [shallow](https://airbnb.io/enzyme/docs/api/shallow.html) 这个方法是”浅渲染“（只渲染这个层级的 DOM 不会测试深层次的 DOM）。

如果需要对 DOM 节点上的属性测试：

```html
<div className="app" title="jest enzyme">
    jest
</div>
```

与之对应的“深度渲染” mount，集成测试适合使用 mount

```react
import Enzyme, { shallow, mount } from 'enzyme';
...
const wrapper = mount(<App />);
```



使用 `.prop` 对其属性 (title, name ...) 测试：

```js
expect(wrapper.find(".app").prop("title")).toBe("jest enzyme");
```

用 debug 可以快速知道问题所在（会将 DOM 打印在控制台）

```js
console.log(wrapper.debug());
```

### 与代码解耦

建议在写 DOM 的时候写一个给 test 用例的属性，如：

```html
<div className="app" title="jest enzyme" data-test="app-container">
    jest
</div>
```

这样测试的时候：

```js
expect(wrapper.find("[data-test='app-container']").prop("title")).toBe("jest enzyme");
```

### [jest-enzyme 匹配器](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#jest-enzyme)

#### 安装

`npm install jest-enzyme --save-dev`

#### [配置](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#setup)

在使用前要进行配置，在 jest.config.js 文件中，有一个 `setupFilesAfterEnv` 配置项，用于在 jest 环境启动后做一些初始化。将 jest-enzyme 的目录放进去。

```json
"setupFilesAfterEnv": [
    './node_modules/jest-enzyme/lib/index.js'
],
```

使用：

```js
// .toExist .toHaveProp
const container = wrapper.find("[data-test='app-container']");

expect(container).toExist();
expect(container).toHaveProp("title", "jest enzyme");
```

Snapshot 的使用

```js
// .toMatchSnapshot

...
expect(wrapper).toMatchSnapshot();
```

更新快照时：按 w → 按 u 来更新快照

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press u to update failing snapshots. // <== this
 › Press i to update failing snapshots interactively.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```



