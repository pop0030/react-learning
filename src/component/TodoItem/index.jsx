import React from 'react';
import TodoEditForm from './TodoEditForm';
import TodoItemContent from './TodoItemContent';

const TodoItem = ({ item }) => {
    return (
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
};

export default TodoItem;
