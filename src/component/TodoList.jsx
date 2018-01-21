import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const getFilterTodoList = (items, filter) => {
    switch (filter) {
    case 'TODO':
        return Object.keys(items)
            .filter(key => !items[key].isDone)
            .reduce((res, key) => Object.assign(res, { [key]: items[key] }), {});
    case 'DONE':
        return Object.keys(items)
            .filter(key => items[key].isDone)
            .reduce((res, key) => Object.assign(res, { [key]: items[key] }), {});
    case 'ALL':
    default:
        return items;
    }
};

const mapStateToProps = state => ({
    TodoItems: getFilterTodoList(state.TodoItems, state.TodoListFilter)
});

const TodoList = ({ TodoItems }) => {
    return (
        <ul className="todoList">
            {Object.keys(TodoItems).map((k) => (
                <TodoItem key={k} item={TodoItems[k]}/>
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    TodoItems: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(TodoList);
