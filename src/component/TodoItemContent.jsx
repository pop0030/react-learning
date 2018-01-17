import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import '../../node_modules/font-awesome/css/font-awesome.min.css';


class TodoItemContent extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        handleTodoItem: PropTypes.func.isRequired
    }
    onClickDel = (e) => {
        this.props.handleTodoItem('DEL', this.props.item);
    }

    onEditToggle = (e) => {
        let { item } = this.props;
        item.edit = !item.edit;
        this.props.handleTodoItem('EDIT', item);
    }

    onStateChange = (e) => {
        let { item } = this.props;
        item.isDone = !item.isDone;
        this.props.handleTodoItem('EDIT', item);
    }

    render() {
        return (
            <div>
                <div className="todoState">
                    <FontAwesome
                        className="btn-chkbox"
                        onClick={this.onStateChange}
                        name={this.props.item.isDone ? 'check-square-o' : 'square-o'}
                    />
                </div>
                <span
                    className="todoText"
                    onDoubleClick={this.onEditToggle}
                >{ this.props.item.text }
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
    }
}

export default TodoItemContent;
