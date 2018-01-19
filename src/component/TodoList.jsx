import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const mapStateToProps = state => ({
    TodoItems: state.TodoItems
});

const TodoList = ({ TodoItems }) => {
    return (
        <ul className="todoList">
            {Object.keys(TodoItems).map((k) => (
                <li key={k}>
                    <TodoItem item={TodoItems[k]} />
                </li>
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    TodoItems: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(TodoList);
