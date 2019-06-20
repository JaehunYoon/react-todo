import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;

        return (
            <div>
                <TodoItem text="foo"/>
                <TodoItem text="bar"/>
                <TodoItem text="baz"/>
                <TodoItem text="한글은 어떨까?"/>
            </div>
        );
    }
}

export default TodoItemList;