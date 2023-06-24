import logo from './logo.svg';
import './App.css';
import Form from './components/input-form/form/form.component';
import { useState } from 'react';

function App() {

  const [isAddTodoOpen, setAddTodoOpen] = useState(false);

  function toggleAddTodoForm() {
    setAddTodoOpen(!isAddTodoOpen);
  }

  async function getAllTodosAPI() {
    try {
      const response = await fetch("http://localhost:3001/todos", {method:"GET"}); 
      const jsonData = await response.json();
      console.log(jsonData);   
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">

      {/* Add new todo modal form  */}
      {
        isAddTodoOpen && 
        <Form 
          isOpen={isAddTodoOpen}
          onClose={toggleAddTodoForm}
        />
      }

      {/* Add New Todo */}

      <div className='app-title-container'> 
        <h1 className='h1-title'>My Todo App</h1>
        <div className='app-title-button-ctn'>
          <button className='app-title-button' onClick={toggleAddTodoForm}>Add New Todo</button>
        </div>
      </div>
      
      <br/><br/>

    </div>
  );
}

export default App;
