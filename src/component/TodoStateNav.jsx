import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoStateNav extends Component {
    static propTypes = {
        items: PropTypes.object.isRequired,
        setFilterType: PropTypes.func.isRequired
    }
    filterAll = () => {
        this.props.setFilterType('ALL');
    }
    filterTodo = () => {
        this.props.setFilterType('TODO');
    }
    filterDone = () => {
        this.props.setFilterType('DONE');
    }
    render() {
        return (
            <div className="todoStateNav">
                Total:
                <span
                    onClick={this.filterAll}
                    role="button"
                    aria-hidden
                >
                    {
                        Object.keys(this.props.items).length
                    }
                </span>
                Todo:
                <span
                    onClick={this.filterTodo}
                    role="button"
                    aria-hidden
                >
                    {
                        Object.keys(this.props.items).filter((item) => {
                            return !this.props.items[item].isDone;
                        }).length
                    }
                </span>
                Done:
                <span
                    onClick={this.filterDone}
                    role="button"
                    aria-hidden
                >
                    {
                        Object.keys(this.props.items).filter((item) => {
                            return this.props.items[item].isDone;
                        }).length
                    }
                </span>
            </div>
        );
    }
}

export default TodoStateNav;
