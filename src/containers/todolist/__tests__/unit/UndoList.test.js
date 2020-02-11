import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/undoList';
import { findTestWrapper } from "../../../../utils/testUtils";

describe("UndoList 组件", () => {
    const listData = [{
        status: "div",
        value: "JEST"
    }, {
        status: "div",
        value: "enzyme"
    }, {
        status: "div",
        value: "rn"
    }, {
        status: "div",
        value: "react"
    }];

    it("渲染样式快照", () => {
        const wrapper = shallow(<UndoList list={listData} />);
        expect(wrapper).toMatchSnapshot();
    });

    it("未完成列表当数据为空数组时，count 为 0， 列表无内容", () => {
        const wrapper = shallow(<UndoList list={[]} />);
        const countElem = findTestWrapper(wrapper, "count");
        const listItem = findTestWrapper(wrapper, "list-item");
        expect(countElem.text()).toEqual("0");
        expect(listItem.length).toEqual(0);
    });

    it("当数据有内容，count 显示数据个数，列表不为空", () => {
        const wrapper = shallow(<UndoList list={listData} />);
        const countElem = findTestWrapper(wrapper, "count");
        const listItem = findTestWrapper(wrapper, "list-item");
        expect(countElem.text()).toEqual("4");
        expect(listItem.length).toEqual(4);
    });

    it("删除功能：当有内容时 点击删除按钮，会调用删除方法", () => {
        const fn = jest.fn();
        const index = 1;
        const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />);
        const deleteBtn = findTestWrapper(wrapper, "delete-btn");
        deleteBtn.at(index).simulate("click");
        expect(fn).toHaveBeenLastCalledWith(index);
    });

    it("当某一项被点击时，触发执行 changeStatus 函数, 数据被修改", () => {
        const fn = jest.fn();
        const index = 1;
        const wrapper = shallow(<UndoList changeStatus={fn} list={listData} />);
        const deleteItems = findTestWrapper(wrapper, "list-item-text");
        deleteItems.at(index).simulate("click");
        expect(fn).toHaveBeenCalledWith(index);
    });

    it("当某一项状态是 input 时，展示输入框", () => {
        const wrapper = shallow(<UndoList list={[...listData, {
            value: "test",
            status: "input"
        }]} />);
        const inputItems = findTestWrapper(wrapper, "list-item-input");
        expect(inputItems.length).toBe(1);
    });

    it("当某一个输入框失去焦点时，触发执行 handleBlur 方法", () => {

        const fn = jest.fn();
        const wrapper = shallow(<UndoList handleBlur={fn} list={[{
            value: "test",
            status: "input"
        }, {
            value: "测试",
            status: "div"
        }]} />);
        const inputElem = findTestWrapper(wrapper, "list-item-input");
        inputElem.simulate("blur");
        expect(fn).toHaveBeenCalledWith(0);
    });

    it("当某一个输入框变更时，触发执行 valueChange 方法", () => {

        const fn = jest.fn();
        const wrapper = shallow(<UndoList valueChange={fn} list={[{
            value: "test",
            status: "input"
        }, {
            value: "测试",
            status: "div"
        }]} />);
        const value = "jest";
        const inputElem = findTestWrapper(wrapper, "list-item-input");
        inputElem.simulate("change", {
            target: {
                value
            }
        });
        expect(fn).toHaveBeenCalledWith(0, value);
    });
});