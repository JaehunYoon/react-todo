import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div>
        <TodoTemplate form={<Form/>}>
          Test
        </TodoTemplate>
      </div>
    )
  }
}

export default App;
