import React, { Component } from 'react';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';
import TodoStateNav from './component/TodoStateNav';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends Component {
    componentDidMount() {
        this.exportLocalStroage();
    }

    componentDidUpdate() {
        this.storeToLocalStroage();
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

    render() {
        return (
            <div className="App">
                <div className="Container">
                    <TodoForm />
                    <TodoStateNav />
                    <TodoList />
                </div>
            </div>
        );
    }
}

export default App;
