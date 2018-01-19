import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoEditForm extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        handleTodoItem: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.editInput.focus();
    }
    onEditChange = (e) => {
        let { item } = this.props;
        item.text = e.target.value;
        this.props.handleTodoItem('EDIT', item);
    }
    onEditSave = (e) => {
        e.preventDefault();
        let { item } = this.props;
        item.edit = !item.edit;
        this.props.handleTodoItem('EDIT', item);
    }
    render() {
        return (
            <form
                className="todoEdit"
                onSubmit={this.onEditSave}
            >
                <input
                    type="text"
                    ref={(input) => {
                        this.editInput = input;
                    }}
                    value={this.props.item.text}
                    onChange={this.onEditChange}
                    onBlur={this.onEditSave}
                />
            </form>
        );
    }
}

export default TodoEditForm;
