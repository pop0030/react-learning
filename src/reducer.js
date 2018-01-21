import { combineReducers } from 'redux';

const TodoItems = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return Object.assign({}, state, action.items);
    case 'DEL_TODO':
        delete state[action.item.id];
        return Object.assign({}, state);
    case 'EDIT_TODO':
        state[action.item.id] = action.item;
        return Object.assign({}, state);
    default:
        return state;
    }
};

const TodoListFilter = (state = 'ALL', action) => {
    switch (action.type) {
    case 'SET_FILTER':
        return action.filterType;
    default:
        return state;
    }
};

const TodoApp = combineReducers({
    TodoItems,
    TodoListFilter
});

export default TodoApp;
