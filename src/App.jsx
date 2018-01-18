import React, { Component } from 'react';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';
import TodoStateNav from './component/TodoStateNav';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            filterType: 'ALL'
        };
    }

    componentDidMount() {
        this.exportLocalStroage();
    }

    componentDidUpdate() {
        this.storeToLocalStroage();
    }

    handleTodoItem = (type, item) => {
        switch (type) {
        case 'ADD': this.addTodoItem(item); break;
        case 'DEL': this.delTodoItem(item); break;
        case 'EDIT': this.editTodoItem(item); break;
        default: break;
        }
    }

    addTodoItem = (item) => {
        this.setState(prevState => {
            let stamp = (new Date()).getTime();
            let { items } = prevState;
            let itemLength = Object.keys(items).length;
            let itemId = (itemLength > 0) ? parseInt(Object.keys(items)[itemLength - 1], 0) + 1 : 1;
            items[itemId] = {
                id: itemId,
                text: item.text,
                isDone: false,
                edit: false,
                update: stamp
            };
            return { items: items };
        });
    }

    delTodoItem = (item) => {
        this.setState(prevState => {
            let { items } = prevState;
            delete items[item.id];
            return { items: items };
        });
    }

    editTodoItem = (item) => {
        this.setState(prevState => {
            item.update = (new Date()).getTime();
            let { items } = prevState;
            items[item.id] = item;
            return { items: items };
        });
    }

    setFilterType = (filterType) => {
        this.setState({ filterType: filterType });
    }

    setFilterItems = () => {
        let filterType = this.state.filterType;
        let newItems = {};
        let { items } = this.state;
        switch (filterType) {
        case 'ALL': Object.assign(newItems, items); break;
        case 'TODO':
            for (let key in items) {
                if (items[key]) {
                    let _t = {};
                    _t[key] = items[key];
                    if (!items[key].isDone) {
                        newItems = Object.assign(newItems, _t);
                    }
                }
            }
            break;
        case 'DONE':
            for (let key in items) {
                if (items[key]) {
                    let _t = {};
                    _t[key] = items[key];
                    if (items[key].isDone) {
                        newItems = Object.assign(newItems, _t);
                    }
                }
            }
            break;
        default: break;
        }
        return newItems;
    }

    storeToLocalStroage = () => {
        let store = window.localStorage;
        store.setItem('todoList', JSON.stringify(this.state.items));
    }

    exportLocalStroage = () => {
        let store = window.localStorage;
        let storeList = store.getItem('todoList');
        if (storeList) {
            this.setState({ items: JSON.parse(storeList) });
        }
    }

    //for test
    test = () => {
        for (let i = 0; i < 1001; i++) {
            this.addTodoItem({ text: '廢物' });
        }
    }

    delAll = () => {
        this.setState({ items: {} });
    }

    render() {
        return (
            <div className="App">
                <div className="Container">
                    <input type="button" value="+1000" onClick={this.test} />
                    <input type="button" value="fuck all" onClick={this.delAll} />
                    <TodoForm handleTodoItem={this.handleTodoItem} />
                    <TodoStateNav items={this.state.items} setFilterType={this.setFilterType} />
                    <TodoList items={this.setFilterItems()} handleTodoItem={this.handleTodoItem} />
                </div>
            </div>
        );
    }
}

export default App;
