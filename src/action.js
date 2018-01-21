let nextTodoId = 0;

export const addTodoItem = item => {
    let stamp = (new Date()).getTime();
    let items = {};
    let id = nextTodoId++;
    items[id] = {
        id: id,
        text: item.text,
        isDone: false,
        edit: false,
        update: stamp
    };
    return {
        type: 'ADD_TODO',
        items: items
    };
};

export const delTodoItem = id => {
    return {
        type: 'DEL_TODO',
        item: {
            id: id
        }
    };
};

export const editTodoItem = item => {
    item.update = (new Date()).getTime();
    return {
        type: 'EDIT_TODO',
        item: item
    };
};

export const setFilter = text => ({
    type: 'SET_FILTER',
    filterType: text
});
