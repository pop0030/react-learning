import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { delTodoItem, editTodoItem } from '../../action';

const mapStateToProps = state => ({
    TodoItems: state.TodoItems
});

const TodoItemContent = ({ item, dispatch }) => {
    this.onClickDel = (e) => {
        dispatch(delTodoItem(item.id));
    };
    this.onEditToggle = (e) => {
        let { item } = this.props;
        item.edit = !item.edit;
    };
    this.onStateChange = (e) => {
        item.isDone = !item.isDone;
        dispatch(editTodoItem(item));
    };
    return (
        <div>
            <div className="todoState">
                <FontAwesome
                    className="btn-chkbox"
                    onClick={this.onStateChange}
                    name={item.isDone ? 'check-square-o' : 'square-o'}
                />
            </div>
            <span
                className="todoText"
                onDoubleClick={this.onEditToggle}
            >{ item.text }
            </span>
            <span className="rightCtrl">
                <FontAwesome
                    className="btn-del"
                    name="trash-o"
                    onClick={this.onClickDel}
                />
            </span>
        </div>
    );
};

/*TodoItemContent.propTypes = {
    props: PropTypes.object.isRequired
}*/

export default connect(mapStateToProps)(TodoItemContent);
