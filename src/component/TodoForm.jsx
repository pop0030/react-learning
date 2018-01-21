import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodoItem } from '../action';

class TodoForm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }
    onSubmit = (e) => {
        e.preventDefault();
        let text = this.inputText.value.trim();
        if (text.length !== 0) {
            this.props.dispatch(addTodoItem({ text: text }));
            this.inputText.value = '';
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="todoControl">
                <input
                    type="text"
                    ref={(input) => {
                        this.inputText = input;
                    }}
                />
                <input type="submit" value="Add" />
            </form>
        );
    }
}

export default connect()(TodoForm);
