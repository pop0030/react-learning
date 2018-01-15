import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.onClickDel = this.onClickDel.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
    this.onEditToggle = this.onEditToggle.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.handleTodoItem = this.props.handleTodoItem.bind(this);
    this.state = {
      item: this.props.item,
      edit: false
    }
  }

  onClickDel(e) {
    this.handleTodoItem("DEL", this.state.item)
  }

  onEditToggle(e) {
    this.setState({edit: !this.state.edit})
  }

  onEditChange(e) {
    let _item = this.state.item;
    _item.text = e.target.value;
    this.setState({item: _item})
  }

  onEditSave(e) {
    e.preventDefault();
    this.handleTodoItem("EDIT", this.state.item);
    this.onEditToggle();
  }

  onStateChange(e) {
    let _item = this.state.item;
    _item.isDone = !_item.isDone;
    this.setState({item: _item})
    this.handleTodoItem("EDIT", this.state.item);
  }

  transStamp(stamp) {
    let _time = new Date(stamp);
    return _time.toLocaleString()
  }

  render() {
    return (
      <div className="todoItem">
        <div style={{ display: (this.state.edit)?'none':'block' }}>
          <input
            type="button"
            value={ this.state.item.isDone?"V":"X" }
            onClick={ this.onStateChange } />
          <span>{ this.state.item.text }</span>
          <span>
            <input 
              type="button" 
              value="edit" 
              onClick={ this.onEditToggle } />
            <input 
              type="button" 
              value="delete" 
              onClick={ this.onClickDel } />
            </span>
        </div>
        <form 
          style={{ display: (this.state.edit)?'block':'none' }}
          onSubmit={ this.onEditSave }>
          <input 
            type="text" 
            value={ this.state.item.text } 
            onChange={ this.onEditChange } />
          <input type="submit" value="save" />
        </form>
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todoList">
        { this.props.items.map((item) => (
            <li key={ item.id }>
              <TodoItem 
                item={ item } 
                handleTodoItem={ this.props.handleTodoItem }>
              </TodoItem>
            </li>
          )) }
      </ul>
    )
  }
}

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoText: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTodoItem = this.props.handleTodoItem.bind(this)
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.addTodoItem = this.addTodoItem.bind(this);
    this.delTodoItem = this.delTodoItem.bind(this);
    this.editTodoItem = this.editTodoItem.bind(this);
    this.handleTodoItem = this.handleTodoItem.bind(this);
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
    let newItem = { 
      id: this.state.items.length + 1,
      text: item.text,
      isDone: false,
      update: stamp
    };
    let _items = this.state.items.concat(newItem);
    this.setState({items: _items})
  }

  delTodoItem(item) {
    let delId = item.id
    let _items = this.state.items.filter( (item) => item.id !== delId);
    this.setState({items: _items})
  }

  editTodoItem(item) {
    let stamp = (new Date()).getTime();
    let newItem = item;
    let _items = this.state.items.map( (item) => {
      if (item.id === newItem.id) {
        item.text = newItem.text;
        item.update = stamp;
      }
      return item
    });
    this.setState({items: _items})
  }

  render() {
    return (
      <div className="App">
        <TodoForm handleTodoItem={ this.handleTodoItem }></TodoForm>
        <TodoList items={ this.state.items } handleTodoItem={ this.handleTodoItem }></TodoList>
      </div>
    );
  }
}

export default App;
