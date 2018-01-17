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

const MapTodoListItem = (props) => Object.keys(props.items).map( (item) => (
    <li key={ item }>
        <TodoItem 
            item={ props.items[item] } 
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
    constructor(props) {
        super(props);
        this.clickFilterTag = this.clickFilterTag.bind(this);
    }

    clickFilterTag(type) {
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
        this.addTodoItem = this.addTodoItem.bind(this);
        this.delTodoItem = this.delTodoItem.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);
        this.setFilterType = this.setFilterType.bind(this);
        this.handleTodoItem = this.handleTodoItem.bind(this);
        this.state = {
            items: {},
            filterType: "ALL"
        }
    }

    handleTodoItem(type, item) {
        switch (type) {
            case 'ADD' : this.addTodoItem(item); break
            case 'DEL' : this.delTodoItem(item); break
            case 'EDIT': this.editTodoItem(item); break
            default: break
        }
    }

    addTodoItem(item) {
        let stamp = (new Date()).getTime();
        let _items = this.state.items;
        let itemLength = Object.keys(_items).length;
        let itemId = (itemLength > 0)?parseInt(Object.keys(_items)[itemLength - 1],0) + 1:1;
        _items[itemId] = { 
            id: itemId,
            text: item.text,
            isDone: false,
            edit: false,
            update: stamp
        }
        this.setState({items: _items});
    }

    delTodoItem(item) {
        let _items = this.state.items;
        delete _items[item.id];
        this.setState({items: _items});
    }

    editTodoItem(item) {
        item.update = (new Date()).getTime();
        let _items = this.state.items;
        _items[item.id] = item;
        this.setState({items: _items});
    }

    setFilterType(filterType) {
        this.setState({filterType: filterType})
    }

    setFilter(items) {
        let filterType = this.state.filterType;
        let _items = {};
        switch(filterType) {
            case "ALL":  Object.assign(_items, items); break
            case "TODO": 
                for (let key in items) {
                    let _t = {};
                    _t[key] = items[key];
                    if (!items[key].isDone) _items = Object.assign(_items, _t );
                }
            break
            case "DONE": 
                for (let key in items) {
                    let _t = {};
                    _t[key] = items[key];
                    if (items[key].isDone) _items = Object.assign(_items, _t );
                }
            break
            default: break
        }
        return _items
    }

    render() {
        return (
            <div className="App">
                <div className="Container">
                    <TodoForm handleTodoItem={ this.handleTodoItem }></TodoForm>
                    <TodoStateNav items={ this.state.items } setFilterType={ this.setFilterType }></TodoStateNav>
                    <TodoList items={ this.setFilter(this.state.items) } handleTodoItem={ this.handleTodoItem }></TodoList>
                </div>
            </div>
        )
    }
}

export default App;
