import React from 'react';
import PropTypes from 'prop-types';
import TodoEditForm from './TodoEditForm';
import TodoItemContent from './TodoItemContent';

const TodoItem = ({ item }) => (
    <li>
        <div className="todoItem">
            {item.edit ? (
                <TodoEditForm item={item} />
            ) : (
                <TodoItemContent item={item} />
            )}
        </div>
    </li>
);

TodoItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default TodoItem;
