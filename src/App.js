import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome';

const TodoItem = (props) =>  (
    <div className="todoItem">
        {
            props.item.edit?(
                <TodoEditForm 
                    item={ props.item } 
                    handleTodoItem={ props.handleTodoItem }>
                </TodoEditForm>
            ):(
                <TodoItemContent
                    item={ props.item } 
                    handleTodoItem={ props.handleTodoItem }
                ></TodoItemContent>
            )
        }
    </div>
)

class TodoItemContent extends Component {
    onClickDel = (e) => {
        this.props.handleTodoItem("DEL", this.props.item)
    }

    onEditToggle = (e) => {
        let {item} = this.props;
        item.edit = !item.edit;
        this.props.handleTodoItem("EDIT", item);
    }

    onStateChange = (e) => {
        let {item} = this.props;
        item.isDone = !item.isDone;
        this.props.handleTodoItem("EDIT", item);
    }

    render() {
        return (
            <div>
                <div className="todoState" onClick={ this.onStateChange }>
                    <FontAwesome className="btn-chkbox" name={ this.props.item.isDone?"check-square-o":"square-o" } />
                </div>
                <span className="todoText" onDoubleClick={ this.onEditToggle }>{ this.props.item.text }</span>
                <span className="rightCtrl">
                    <FontAwesome className="btn-del" name="trash-o" onClick={ this.onClickDel } />
                </span>
            </div>
        )
    }
}

class TodoEditForm extends Component {
    componentDidMount() {
        this.refs.editInput.focus()
    }

    onEditChange = (e) => {
        let {item} = this.props;
        item.text = e.target.value;
        this.props.handleTodoItem("EDIT", item);
    }

    onEditSave = (e) => {
        e.preventDefault();
        let {item} = this.props;
        item.edit = !item.edit;
        this.props.handleTodoItem("EDIT", item);
    }

    render() {
        return (
            <form 
                className="todoEdit"
                onSubmit={ this.onEditSave }>
                <input 
                    type="text"
                    ref="editInput"
                    value={ this.props.item.text } 
                    onChange={ this.onEditChange } 
                    onBlur={ this.onEditSave } />
            </form>
        )
    }
}

class TodoList extends Component {
    renderTodoItem(item) {
        return (
            <li key={ item.id }>
                <TodoItem 
                    item={ item } 
                    handleTodoItem={ this.props.handleTodoItem }>
                </TodoItem>
            </li>
        )
    }
    renderTodoItems() {
        return Object.keys(this.props.items).map( (key) => this.renderTodoItem(this.props.items[key]))
    }
    render() {
        return (
            <ul className="todoList">{ this.renderTodoItems() }</ul>
        )
    }
} 

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { TodoText: "" }
    }

    onChange = (e) => {
        this.setState({TodoText: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {TodoText} = this.state;
        if (TodoText.length > 0) {
            this.props.handleTodoItem('ADD', {text: TodoText});
            this.setState({TodoText: ""});
        }
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit } className="todoControl">
                <input type="text" onChange={ this.onChange } value={ this.state.TodoText}/>
                <input type="submit" value="Add" /> 
            </form>
        )
    }
}

class TodoStateNav extends Component {
    static propTypes = {
        items: PropTypes.object.isRequired,
        setFilterType: PropTypes.func.isRequired
    }

    clickFilterTag = (type) => {
        this.props.setFilterType(type);
    }
    render() {
        return (
            <div className="todoStateNav">
                Total:<span onClick={ () => this.clickFilterTag("ALL")  }>{ Object.keys(this.props.items).length }</span>
                Todo: <span onClick={ () => this.clickFilterTag("TODO") }>{ Object.keys(this.props.items).filter( (item) => !this.props.items[item].isDone ).length }</span>
                Done: <span onClick={ () => this.clickFilterTag("DONE") }>{ Object.keys(this.props.items).filter( (item) =>  this.props.items[item].isDone ).length }</span>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            filterType: "ALL"
        }
    }

    componentDidMount() {
        let store = window.localStorage;
        let storeList = store.getItem("todoList");
        if (storeList) {
            this.setState({items: JSON.parse(storeList)});
        }
    }

    componentDidUpdate() {
        this.storeToLocalStroage();
    }

    handleTodoItem = (type, item) => {
        switch (type) {
            case 'ADD' : this.addTodoItem(item); break
            case 'DEL' : this.delTodoItem(item); break
            case 'EDIT': this.editTodoItem(item); break
            default: break
        }
    }

    addTodoItem = (item) => {
        let stamp = (new Date()).getTime();
        let { items } = this.state;
        let itemLength = Object.keys(items).length;
        let itemId = (itemLength > 0)?parseInt(Object.keys(items)[itemLength - 1],0) + 1:1;
        items[itemId] = { 
            id: itemId,
            text: item.text,
            isDone: false,
            edit: false,
            update: stamp
        }
        this.setState({items: items});
    }

    delTodoItem = (item) => {
        let { items } = this.state;
        delete items[item.id];
        this.setState({items: items});
    }

    editTodoItem = (item) => {
        item.update = (new Date()).getTime();
        let { items } = this.state;
        items[item.id] = item;
        this.setState({items: items});
    }

    setFilterType = (filterType) => {
        this.setState({filterType: filterType})
    }

    setFilterItems = () => {
        let filterType = this.state.filterType;
        let newItems = {};
        let { items } = this.state;
        switch(filterType) {
            case "ALL":  Object.assign(newItems, items); break
            case "TODO": 
                for (let key in items) {
                    let _t = {};
                    _t[key] = items[key];
                    if (!items[key].isDone) newItems = Object.assign(newItems, _t );
                }
            break
            case "DONE": 
                for (let key in items) {
                    let _t = {};
                    _t[key] = items[key];
                    if (items[key].isDone) newItems = Object.assign(newItems, _t );
                }
            break
            default: break
        }
        return newItems
    }

    storeToLocalStroage = () => {
        let store = window.localStorage;
        store.setItem('todoList', JSON.stringify(this.state.items));
    }

    render() {
        return (
            <div className="App">
                <div className="Container">
                    <TodoForm handleTodoItem={ this.handleTodoItem }></TodoForm>
                    <TodoStateNav items={ this.state.items } setFilterType={ this.setFilterType }></TodoStateNav>
                    <TodoList items={ this.setFilterItems() } handleTodoItem={ this.handleTodoItem }></TodoList>
                </div>
            </div>
        )
    }
}

export default App;
