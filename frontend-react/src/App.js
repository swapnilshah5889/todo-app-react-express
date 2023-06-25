import logo from './logo.svg';
import './App.css';
import Form from './components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';

function App() {

  // Variables
  const [state, setState] = useState({
    isAddTodoOpen:false,
    todoJsonArr:[]
  });

  // Toggle visibility of the modal form
  function toggleAddTodoForm() {
    setState(prevState => ({ ...prevState, isAddTodoOpen: !state.isAddTodoOpen }));
  }

  // Fetch Data API
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/todos", {method:"GET"}); 
        const jsonData = await response.json();
        setState(prevState => ({ ...prevState, todoJsonArr: jsonData }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  
  const deleteTodoAPI = async () => {
    try {
                
    } catch (error) {
        console.log(error);
    }
  }

  function handleDelete(id) {
    alert("Delete: "+id);
  }

  function handleEdit(todoJson) {
    alert("Edit: "+todoJson.title);
  }
  
  // Application
  return (
    <div className="App">

      {/* Add new todo modal form  */}
      {
        state.isAddTodoOpen && 
        <Form 
          isOpen={state.isAddTodoOpen}
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
      
      {/* Todo List */}
      <div className='todo-list-cnt'>
        <CardList 
          toDoList={state.todoJsonArr}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
        />
      </div>
      

    </div>
  );
}

export default App;
