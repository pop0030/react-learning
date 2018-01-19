import { combineReducers } from 'redux';

const TodoItems = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return Object.assign({}, state, action.items);
    case 'DEL_TODO':
        delete state[action.item.id];
        return Object.assign({}, state);
    case 'EDIT_TODO':
        let newState = Object.assign({}, state);
        newState[action.item.id] = action.item;
        return Object.assign({}, newState);
    default:
        return state;
    }
};

/*const TodoForm = (state = '', action) => {
    switch (action.type) {
    case 'INPUT':
        return action.text;
    default:
        return state;
    }
};*/

const TodoApp = combineReducers({
    TodoItems
});

export default TodoApp;
