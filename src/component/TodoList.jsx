import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoEditForm from './TodoEditForm';
import TodoItemContent from './TodoItemContent';

const TodoItem = (props) => {
    return (
        <div className="todoItem">
            {
                props.item.edit ? (
                    <TodoEditForm
                        item={props.item}
                        handleTodoItem={props.handleTodoItem}
                    />
                ) : (
                    <TodoItemContent
                        item={props.item}
                        handleTodoItem={props.handleTodoItem}
                    />
                )
            }
        </div>
    );
};

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleTodoItem: PropTypes.func.isRequired
};

class TodoList extends Component {
    static propTypes = {
        items: PropTypes.object.isRequired,
        handleTodoItem: PropTypes.func.isRequired
    }
    renderTodoItem(item) {
        return (
            <li key={item.id}>
                <TodoItem
                    item={item}
                    handleTodoItem={this.props.handleTodoItem}
                />
            </li>
        );
    }
    renderTodoItems() {
        return Object.keys(this.props.items).map((key) => {
            return this.renderTodoItem(this.props.items[key]);
        });
    }
    render() {
        return (
            <ul className="todoList">{ this.renderTodoItems() }</ul>
        );
    }
}

export default TodoList;
