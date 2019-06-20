import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from "./components/Form";
import TodoItemList from './components/TodoItemList';

class App extends Component {
  render() {
    return (
      <div>
        <TodoTemplate form={<Form/>}>
          <TodoItemList/>
        </TodoTemplate>
      </div>
    )
  }
}

export default App;
