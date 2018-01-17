import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
    static propTypes = {
        handleTodoItem: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = { TodoText: '' };
    }

    onChange = (e) => {
        this.setState({ TodoText: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { TodoText } = this.state;
        if (TodoText.length > 0) {
            this.props.handleTodoItem('ADD', { text: TodoText });
            this.setState({ TodoText: '' });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="todoControl">
                <input type="text" onChange={this.onChange} value={this.state.TodoText} />
                <input type="submit" value="Add" />
            </form>
        );
    }
}

export default TodoForm;
