import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../action';

const mapStateToProps = state => ({
    items: state.TodoItems
});

const mapDispatchToProps = dispatch => ({
    setFilter: (event) => {
        dispatch(setFilter(event.target.dataset.type || null));
    }
});

const TodoStateNav = ({ items, setFilter }) => {
    return (
        <div className="todoStateNav">
            Total:
            <span
                onClick={setFilter}
                data-type="ALL"
                role="button"
                aria-hidden
            >{Object.keys(items).length}
            </span>
            Todo:
            <span
                onClick={setFilter}
                data-type="TODO"
                role="button"
                aria-hidden
            >{Object.keys(items).filter(key => !items[key].isDone).length}
            </span>
            Done:
            <span
                onClick={setFilter}
                data-type="DONE"
                role="button"
                aria-hidden
            >{Object.keys(items).filter(key => items[key].isDone).length}
            </span>
        </div>
    );
};

TodoStateNav.propTypes = {
    items: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoStateNav);
