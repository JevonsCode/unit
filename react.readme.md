# 开发前了解

## TDD

先思考流程，再去写代码。

### TDD 的开发流程（Red-Green Develement)

1. 编写测试用例
2. 运行测试，测试用例无法通过测试。
3. 编写代码，使测试用例通过测试。
4. 优化代码，完成开发。
5. 重复上述步骤。

### TDD 的优势

1. 长期减少回归 bug。
2. 代码质量更好（组织，可维护性）。
3. 测试覆盖率高。
4. 错误测试代码不容易出现。（先写业务代码再写测试代码，测试代码是按照业务代码而写的，而业务代码本来就是有问题的，导致不能检测出问题。

## 单元测试 优 & 劣势

- 优势

  测试覆盖率高

- 劣势

  1. 单纯的单元测试业务耦合度高
  2. 代码量大
  3. 单纯的单元测试过于独立（测试完成并不能保证代码能正常运行）

## BDD

功能代码实现完成后，站在用户的角度编写测试代码，确保代码稳定性。更多使用集成测试。

### 与 TDD 的区别

- TDD 
  1. 先写测试再写代码
  2. 一般结合单元测试使用，是白盒测试（关心代码）
  3. 测试的重点在代码
  4. 速度快
- BDD
  1. 先写代码再写测试
  2. 一般结合集成测试使用，大多是黑盒测试（关心页面结果&预期）
  3. 测试重点在 DOM
  4. 速度慢

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

## 以 TDD 的流程来开发 React

假设需要开发一个 TodoList 项目，首先包含一个 Header 组件：

先写其测试文件，此时测试文件肯定会报错

```js
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/header';

Enzyme.configure({ adapter: new Adapter() });

it('Header 包含一个 input', () => {
    const wrapper = mount(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.length).toBe(1);
});
```

再写组件代码，让测试用例通过：

```react
import React, { Component } from 'react';

class Header extends Component {
    render () {
        return (
            <div>
                <input data-test="input" />
            </div>
        )
    }
}

export default Header;
```

然后我们根据需求再写一些用例：

```js
it("header input 初始化应该为空", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.prop("value")).toEqual("");
})

it("header input 当用户输入时，响应变化", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    const userInput = "enzyme!";
    inputElem.simulate("change", {
        target: { value: userInput }
    });
    expect(wrapper.state("value")).toEqual(userInput);
    // 测试 DOM 展示
    // const newInputElem = wrapper.find("[data-test='input']");
    // expect(newInputElem.prop("value")).toEqual(userInput);
})
```

再根据用例写代码，让代码通过：

```react
import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            value: ""
        }
    }

    render () {
        const { value } = this.state;
        return (
            <div>
                <input data-test="input" value={value} onChange={this.handleInputChange} />
            </div>
        )
    }

    handleInputChange (e) {
        this.setState({
            value: e.target.value
        });
    }
}

export default Header;
```

这样一步一步按照测试文件来写项目代码，就是 TDD 的开发流程。

### 提取复用性代码

react 的测试代码中，每个文件都要引入

```js
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

不如将其提取出来，在前面讲到的 jest.config.js 文件中的 setupFilesAfterEnv 字段中，添加这个提取出来的文件：

```json
"setupFilesAfterEnv": [
    "./node_modules/jest-enzyme/lib/index.js",
    "<rootDir>/src/utils/testSetup.js"
],
```

### 用 describe 将同文件的测试用例打包

```js
describe("Header 组件", () => {
    const wrapper = shallow(<Header />);
    
    it("渲染样式快照", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('包含一个 input', () => {
        const inputElem = findTestWrapper(wrapper, "input");
        expect(inputElem.length).toBe(1);
    });
    
    ...
});
```

这样写的好处是让描述分组更清晰，且可以把复用性的代码整合。

## 打开测试覆盖率

在 package.json 文件中写入：

```json
 "scripts": {
     ...
 	"coverage": "node scripts/test.js --coverage --watchAll=false"
 },
```

*其中 coverage 和 watchAll 不能同时打开*