import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../action';

const mapStateToProps = state => ({
    items: state.TodoItems
});

const mapDispatchToProps = dispatch => ({
    setFilter: (filterType) => {
        dispatch(setFilter(filterType));
    }
});

class TodoStateNav extends Component {
    static propTypes = {
        items: PropTypes.object.isRequired,
        setFilter: PropTypes.func.isRequired
    }
    filterAll = () => {
        this.props.setFilter('ALL');
    }
    filterTodo = () => {
        this.props.setFilter('TODO');
    }
    filterDone = () => {
        this.props.setFilter('DONE');
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoStateNav);
