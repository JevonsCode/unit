import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/header';
import { findTestWrapper } from "../../../../utils/testUtils";

describe("Header 组件", () => {

    const wrapper = shallow(<Header />);

    it("渲染样式快照", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('包含一个 input', () => {
        const inputElem = findTestWrapper(wrapper, "input");
        expect(inputElem.length).toBe(1);
    });

    it("input 初始化应该为空", () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, "input");
        expect(inputElem.prop("value")).toEqual("");
    });

    it("input 当用户输入时，响应变化", () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, "input");
        const userInput = "enzyme!";
        inputElem.simulate("change", {
            target: { value: userInput }
        });
        expect(wrapper.state("value")).toEqual(userInput);
        // 测试 DOM 展示
        // const newInputElem = wrapper.find("[data-test='input']");
        // expect(newInputElem.prop("value")).toEqual(userInput);
    });

    it("input 输入回车时 没有内容 无操作", () => {
        const fn = jest.fn();
        const wrapper = shallow(<Header addUndoItem={fn} />);
        const inputElem = findTestWrapper(wrapper, "input");
        wrapper.setState({
            value: ""
        });
        inputElem.simulate("keyUp", {
            keyCode: 13
        });
        expect(fn).not.toHaveBeenCalled();
    });

    it("input 输入回车时 有内容 函数应该被调用 函数清空", () => {
        const fn = jest.fn();
        const wrapper = shallow(<Header addUndoItem={fn} />);
        const inputElem = findTestWrapper(wrapper, "input");
        wrapper.setState({
            value: "1"
        });
        inputElem.simulate("keyUp", {
            keyCode: 13
        });
        expect(fn).toHaveBeenCalled();
        expect(fn).toHaveBeenCalledWith("1");
        const inputElem2 = findTestWrapper(wrapper, "input");
        // 如果有内容最后清除掉
        expect(inputElem2.prop("value")).toBe("");
    });
});

