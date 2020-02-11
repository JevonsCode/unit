import React, { Component } from 'react';
import Header from "./components/header";
import UndoList from "./components/undoList";
import "./style.css";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.addUndoItem = this.addUndoItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.valueChange = this.valueChange.bind(this);

        this.state = {
            undoList: [
                //     {
                //     status: "div",
                //     value: "a"
                // }
            ]
        }
    }

    render () {
        return (
            <div>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList
                    list={this.state.undoList}
                    changeStatus={this.changeStatus}
                    deleteItem={this.deleteItem}
                    handleBlur={this.handleBlur}
                    valueChange={this.valueChange}
                />
            </div>
        )
    }

    addUndoItem (value) {
        this.setState({
            undoList: [...this.state.undoList, {
                status: "div",
                value
            }]
        })
    }

    deleteItem (index) {
        const newUndoList = [...this.state.undoList];
        newUndoList.splice(index, 1);
        this.setState({
            undoList: newUndoList
        });
    }

    changeStatus (index, newValue) {
        const newUndoList = this.state.undoList.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    status: "input"
                }
            }
            return {
                ...item,
                status: "div"
            }
        });

        this.setState({
            undoList: newUndoList
        });
    }

    handleBlur (index) {
        const newUndoList = this.state.undoList.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    status: "div"
                }
            }
            return item;
        });

        this.setState({
            undoList: newUndoList
        });
    }

    valueChange (index, value) {
        const newUndoList = this.state.undoList.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    value
                }
            }
            return item;
        });

        this.setState({
            undoList: newUndoList
        });
    }
}

export default Todo;
