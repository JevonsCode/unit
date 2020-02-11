import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";

describe("TodoList 组件", () => {
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

    it("todo list 初始值为空", () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.state("undoList")).toEqual([]);
    });

    it("TodoList 给 Header 传递一个增加 undoList 内容的方法", () => {
        const wrapper = shallow(<TodoList />);
        const Header = wrapper.find("Header");

        expect(Header.prop("addUndoItem")).toBeTruthy();
    });

    it("addUndoItem 执行时，undoList 应该新增内容", () => {
        const wrapper = shallow(<TodoList />);
        // const Header = wrapper.find("Header");
        // const addFunc = Header.prop("addUndoItem");
        // addFunc("学习 Jest");
        wrapper.instance().addUndoItem("学习 Jest");

        expect(wrapper.state("undoList").length).toBe(1);
        expect(wrapper.state("undoList")[0]).toEqual({
            status: "div",
            value: "学习 Jest"
        });
    });

    it("TodoList 应该给未完成列表传递 list 数据，以及 deleteItem & changeStatus & handleBlur & valueChange 方法", () => {
        const wrapper = shallow(<TodoList />);
        const UndoList = wrapper.find("UndoList");
        expect(UndoList.prop("list")).toBeTruthy();
        expect(UndoList.prop("deleteItem")).toBeTruthy();
        expect(UndoList.prop("changeStatus")).toBeTruthy();
        expect(UndoList.prop("handleBlur")).toBeTruthy();
        expect(UndoList.prop("valueChange")).toBeTruthy();
    });

    it("deleteItem 被执行时 undoList 应该减去对应内容", () => {
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: listData
        });
        wrapper.instance().deleteItem(1);
        expect(wrapper.state("undoList")).toEqual([listData[0], listData[2], listData[3]])
    });

    it("changeStatus 被执行时 对应数据可编辑", () => {
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: listData
        });
        wrapper.instance().changeStatus(1);
        expect(wrapper.state("undoList")[1]).toEqual({
            ...listData[1],
            status: "input"
        })
    });

    it("handleBlur 被调用，undoList 数据项 status 被修改", () => {
        const wrapper = shallow(<TodoList />);
        const data = [
            {
                value: "test",
                status: "input"
            }, {
                value: "测试",
                status: "div"
            }
        ];
        wrapper.setState({
            undoList: data
        });
        wrapper.instance().handleBlur(0);
        expect(wrapper.state("undoList")[0]).toEqual({
            value: "test",
            status: "div"
        })
    });

    it("valueChange 被执行时 对应值改变", () => {
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: [{
                value: "test",
                status: "input"
            }, {
                value: "测试",
                status: "div"
            }]
        });
        wrapper.instance().valueChange(0, "qwe");
        expect(wrapper.state("undoList")[0]).toEqual({
            value: "qwe",
            status: "input"
        })
    });
});