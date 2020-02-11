import React, { Component } from 'react';

class UndoList extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { list, deleteItem, changeStatus, handleBlur, valueChange } = this.props;
        return (
            <div className={"undo-list"}>
                <div className={"list-title"}>
                    TODO
                    <div data-test="count" className={"count"}>{list.length}</div>
                </div>
                <ul className={"list-ul"}>
                    {
                        list.map((item, index) => {
                            return <li
                                className={"list-item"}
                                data-test="list-item"
                                key={`${item}-${index}`}
                            >
                                {
                                    item.status === "input"
                                        ?
                                        <input
                                            data-test="list-item-input"
                                            className={"list-input"}
                                            value={item.value}
                                            onBlur={() => { handleBlur(index) }}
                                            onChange={(e) => { valueChange(index, e.target.value) }}
                                        />
                                        :
                                        <span data-test="list-item-text" onClick={() => { changeStatus(index); }}>
                                            {item.value}
                                        </span>

                                }
                                <div data-test="delete-btn" className="delete" onClick={() => { deleteItem(index); }}>×</div>
                            </li>
                        })
                    }
                </ul>
            </div >
        )
    }
}

export default UndoList;
