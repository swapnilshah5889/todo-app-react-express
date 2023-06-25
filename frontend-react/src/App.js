import logo from './logo.svg';
import './App.css';
import Form from './components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';

function App() {

  const basePath = "http://localhost:3001";
  // Variables
  const [state, setState] = useState({
    isAddTodoOpen:false,
    todoJsonArr:[]
  });

  // Toggle visibility of the modal form
  function toggleAddTodoForm() {
    setState(prevState => ({ ...prevState, isAddTodoOpen: !state.isAddTodoOpen }));
  }

  const fetchData = async () => {
    try {
      const response = await fetch(basePath+"/todos", {method:"GET"}); 
      const jsonData = await response.json();
      setState(prevState => ({ ...prevState, todoJsonArr: jsonData }));
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch Data API
  useEffect(()=> {
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

  const addTodoAPI = async (todoJson) => {
    try {
      
      const response = await fetch(basePath+"/todos", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(todoJson)
      }); 
      if(response.ok) {
        fetchData();
      }
      else {
        alert("Something went wrong");
      }

    } catch (error) {
      console.log(error);
    }
  }

  function handleAddTodo(todoJson) {
    toggleAddTodoForm();
    addTodoAPI(todoJson);
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
          onAddClick={handleAddTodo}
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
