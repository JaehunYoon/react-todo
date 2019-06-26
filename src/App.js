import React, { Component } from 'react';
import axios from 'axios';

import TodoTemplate from './components/TodoTemplate';
import Form from "./components/Form";
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {
  constructor(state) {
    super(state);
    this.state = {
      input: '',
      todos: [],
      color: '#343a40'
    };
  }

  componentDidMount() {
    this.initialize();
  }

  initialize = async () => { 
    await axios
      .get(`http://localhost:8080/api/todos`)
      .then(res => {
        res.data.forEach(element => {
          this.getTodo(element);
        }
      )
    })
  };

  getTodo = (element) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.concat({
        id: element.id,
        text: element.text,
        checked: element.checked,
        color: element.color
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;

    if (input.trim() !== '') {
      axios.post("http://localhost:8080/api/todos", {
        text: input,
        checked: false,
        color: color
      }).then(res => {
        this.setState({
          input: '',
          todos: todos.concat({
            id: res.data.id,
            text: input,
            checked: false,
            color
          })
        });
      })
    }
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
    axios.patch(`http://localhost:8080/api/todos/${id}`)
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
    axios.delete(`http://localhost:8080/api/todos/${id}`)
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoTemplate
        palette={(
          <Palette
            colors={colors}
            selected={color}
            onSelect={handleSelectColor}
          />)}
        form={(
          <Form 
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            color={color}
          />
        )}>
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoTemplate>
    )
  }
}

export default App;
