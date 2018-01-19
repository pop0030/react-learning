import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodoItem } from '../action';

const TodoForm = ({ dispatch }) => {
    this.onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodoItem({ text: this.inputText.value }));
        this.inputText.value = '';
    };
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
};

TodoForm.propTypes = {
    dispatch: PropTypes.func
};

export default connect()(TodoForm);
