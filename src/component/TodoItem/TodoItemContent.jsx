import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { delTodoItem, editTodoItem } from '../../action';

const mapStateToProps = (state, ownProps) => ({
    TodoItem: Object.assign({}, state.TodoItems[ownProps.item.id])
});

const mapDispatchToProps = dispatch => ({
    delTodoItem: id => {
        dispatch(delTodoItem(id));
    },
    editTodoItem: item => {
        dispatch(editTodoItem(item));
    }
});

const TodoItemContent = ({ TodoItem, delTodoItem, editTodoItem }) => {
    this.delTodoItem = (e) => {
        delTodoItem(TodoItem.id);
    };
    this.onEditToggle = (e) => {
        TodoItem.edit = !TodoItem.edit;
        editTodoItem(TodoItem);
    };
    this.onStateChange = (e) => {
        TodoItem.isDone = !TodoItem.isDone;
        editTodoItem(TodoItem);
    };
    return (
        <div>
            <div className="todoState">
                <FontAwesome
                    className="btn-chkbox"
                    onClick={this.onStateChange}
                    name={TodoItem.isDone ? 'check-square-o' : 'square-o'}
                />
            </div>
            <span
                className="todoText"
                onDoubleClick={this.onEditToggle}
            >{ TodoItem.text }
            </span>
            <span className="rightCtrl">
                <FontAwesome
                    className="btn-del"
                    name="trash-o"
                    onClick={this.delTodoItem}
                />
            </span>
        </div>
    );
};

/*TodoItemContent.propTypes = {
    props: PropTypes.object.isRequired
}*/

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemContent);
