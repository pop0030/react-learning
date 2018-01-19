import React from 'react';
import PropTypes from 'prop-types';
import TodoEditForm from './TodoEditForm';
import TodoItemContent from './TodoItemContent';

const TodoItem = (props) => {
    return (
        <div className="todoItem">
            {props.item.edit ? (
                <TodoEditForm item={props.item} />
            ) : (
                <TodoItemContent item={props.item} />
            )}
        </div>
    );
};

TodoItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default TodoItem;
