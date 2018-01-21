import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTodoItem } from '../../action';

const mapStateToProps = (state, ownProps) => ({
    TodoItem: Object.assign({}, state.TodoItems[ownProps.item.id])
});

const mapDispatchToProps = dispatch => ({
    editTodoItem: item => {
        dispatch(editTodoItem(item));
    }
});

class TodoEditForm extends Component {
    static propTypes = {
        TodoItem: PropTypes.object.isRequired
    }
    componentDidMount() {
        this.Input.focus();
    }
    onEditChange = (e) => {
        let item = this.props.TodoItem;
        item.text = e.target.value;
        this.props.editTodoItem(item);
    }
    onEditSave = (e) => {
        e.preventDefault();
        let item = this.props.TodoItem;
        item.edit = !item.edit;
        this.props.editTodoItem(item);
    }
    render() {
        return (
            <form
                className="todoEdit"
                onSubmit={this.onEditSave}
            >
                <input
                    type="text"
                    ref={(node) => {
                        this.Input = node;
                    }}
                    value={this.props.TodoItem.text}
                    onChange={this.onEditChange}
                    onBlur={this.onEditSave}
                />
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditForm);
