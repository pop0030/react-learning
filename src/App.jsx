import React from 'react';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';
import TodoStateNav from './component/TodoStateNav';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const App = () => (
    <div className="App">
        <div className="Container">
            <TodoForm />
            <TodoStateNav />
            <TodoList />
        </div>
    </div>
);

export default App;
