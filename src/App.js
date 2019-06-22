import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from "./components/Form";
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3
  state = {
    input : '',
    todos: [
      { id: 0, text: ' foo', checked: false },
      { id: 1, text: ' bar', checked: true},
      { id: 2, text: ' baz', checked: false }
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this;
    return (
      <TodoTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos}/>
      </TodoTemplate>
    )
  }
}

export default App;
