import React, { Component } from 'react';
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
    constructor(props) {
        super(props);
        this.onClickDel = this.onClickDel.bind(this);
        this.onEditToggle = this.onEditToggle.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.handleTodoItem = this.props.handleTodoItem.bind(this);
    }

    onClickDel(e) {
        this.handleTodoItem("DEL", this.props.item)
    }

    onEditToggle(e) {
        let _item = this.props.item;
        _item.edit = !_item.edit;
        this.handleTodoItem("EDIT", _item);
    }

    onStateChange(e) {
        let _item = this.props.item;
        _item.isDone = !_item.isDone;
        this.handleTodoItem("EDIT", _item);
    }

    render() {
        return (
            <div>
                <div className="todoState" onClick={ this.onStateChange }>
                    <FontAwesome className="btn-chkbox" name={ this.props.item.isDone?"check-square-o":"square-o"} />
                </div>
                <span className="todoText" onClick={ this.onEditToggle }>{ this.props.item.text }</span>
                <span className="rightCtrl">
                    <FontAwesome className="btn-del" name="trash-o" onClick={ this.onClickDel } />
                </span>
            </div>
        )
    }
}

class TodoEditForm extends Component {
    constructor(props) {
        super(props);
        this.onEditSave = this.onEditSave.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.handleTodoItem = this.props.handleTodoItem.bind(this);
    }

    componentDidMount() {
        this.refs.editInput.focus()
    }

    onEditChange(e) {
        let _item = this.props.item;
        _item.text = e.target.value;
        this.handleTodoItem("EDIT", _item);
    }

    onEditSave(e) {
        e.preventDefault();
        let _item = this.props.item;
        _item.edit = !_item.edit;
        this.handleTodoItem("EDIT", _item);
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

const TodoList = (props) =>  (
    <ul className="todoList">
        <MapTodoListItem 
            items={ props.items }
            handleTodoItem={ props.handleTodoItem }>
        </MapTodoListItem>
    </ul>
)

const MapTodoListItem = (props) => props.items.map( (item) => (
    <li key={ item.id }>
        <TodoItem 
            item={ item } 
            handleTodoItem={ props.handleTodoItem }>
        </TodoItem>
    </li>
))

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTodoItem = this.props.handleTodoItem.bind(this);
        this.state = {
            TodoText: ""
        }
    }

    onChange(e) {
        this.setState({TodoText: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let text = this.state.TodoText;
        if (text.length > 0) {
            this.handleTodoItem('ADD', {text: text});
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
    render() {
        return (
            <div className="todoStateNav">
                Total: {this.props.items.length} |
                Todo: { this.props.items.filter( (item) => !item.isDone ).length } |
                Done: { this.props.items.filter( (item) => item.isDone ).length }
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.addTodoItem = this.addTodoItem.bind(this);
        this.delTodoItem = this.delTodoItem.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);
        this.resetTodoList = this.resetTodoList.bind(this);
        this.handleTodoItem = this.handleTodoItem.bind(this);
    }

    handleTodoItem(type, item) {
        switch (type) {
            case 'ADD' : this.addTodoItem(item); break
            case 'DEL' : this.delTodoItem(item); break
            case 'EDIT': this.editTodoItem(item); break
            case 'RESET': this.resetTodoList(item); break
            default: break
        }
    }

    addTodoItem(item) {
        let stamp = (new Date()).getTime();
        let newItem = { 
            id: this.state.items.length + 1,
            text: item.text,
            isDone: false,
            edit: false,
            update: stamp
        }
        let _items = this.state.items.concat(newItem);
        this.setState({items: _items})
    }

    delTodoItem(item) {
        let delId = item.id
        let _items = this.state.items.filter( (item) => item.id !== delId);
        this.setState({items: _items})
    }

    editTodoItem(item) {
        let newItem = item;
        newItem.update = (new Date()).getTime();
        let _items = this.state.items.map( (item) => {
            if (item.id === newItem.id) {
                return newItem;
            } else {
                item.edit = false;
                return item
            }
        });
        this.setState({items: _items})
    }

    resetTodoList(e) {
        let _items = this.state.items.map( (item) => {
            item.edit = false;
            return item
        });
        this.setState({items: _items})
    }

    render() {
        return (
            <div className="App">
                <div className="Container">
                    <TodoForm handleTodoItem={ this.handleTodoItem }></TodoForm>
                    <TodoStateNav items={ this.state.items }></TodoStateNav>
                    <TodoList items={ this.state.items } handleTodoItem={ this.handleTodoItem }></TodoList>
                </div>
            </div>
        )
    }
}

export default App;
