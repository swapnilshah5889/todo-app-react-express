import logo from './logo.svg';
import './App.css';
import Form from './components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import MyButton from './components/button/button.component';

function App() {

  const basePath = "http://localhost:3001";
  // Variables
  const [state, setState] = useState({
    isAddTodoOpen:false,
    isEditTodoOpen:false,
    todoJsonArr:[],
    updateJson:{}
  });

  // Toggle visibility of the modal form
  function toggleAddTodoForm() {
    setState(prevState => ({ ...prevState, isAddTodoOpen: !state.isAddTodoOpen }));
  };

  function toggleUpdateTodoForm(){
    setState(prevState => ({ ...prevState, isEditTodoOpen: !state.isEditTodoOpen }));  
  };

  const fetchData = async () => {
    try {
      const response = await fetch(basePath+"/todos", {method:"GET"}); 
      const jsonData = await response.json();
      setState(prevState => ({ ...prevState, todoJsonArr: jsonData }));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Data API
  useEffect(()=> {
    fetchData();
  }, []);


  function handleDelete(id) {
    
    // Check if id exists in the array
    if(state.todoJsonArr.some((todo) => {
      return todo.id === id;
    })) {
      deleteTodoAPI(id);
    }
    else {
      alert("something went wrong");
    }
  };

  function handleEdit(todoJson) {
    toggleUpdateTodoForm();
    setState(prevState=>({ ...prevState, updateJson:todoJson }));
  };

  function updateTodoListAfterDelete(id) {
    const updatedTodoList = state.todoJsonArr.filter((todo) => {
      return todo.id != id;
    });
    setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
  };

  // API request to add new todo
  const addTodoAPI = async (todoJson) => {
    try {
      
      const response = await fetch(basePath+"/todos", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(todoJson)
      }); 

      const jsonData = await response.json();

      // On success update original array by adding the new jsondata
      if(response.ok) {
        const updatedTodoList = [...state.todoJsonArr, jsonData];
        setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
      }
      // Refresh data
      else {
        fetchData();
      }

    } catch (error) {
      console.log(error);
    }
  };
  
  // API to delete todo
  const deleteTodoAPI = async (id) => {
    try {
      const response = await fetch(basePath+"/todos/"+id, {
        method:"DELETE"
      }); 

      if(response.ok) {
        updateTodoListAfterDelete(id);
      }
      else {
        alert("Something went wrong");
        fetchData();
      }
    } catch (error) {
        console.log(error);
    }
  };

  // Udpate Todo API
  const updateTodoAPI = async(todoJson) => {
    try {

      alert("Edit: "+todoJson.title);

    } catch (error) {
      console.log(error);
    }
  };

  function handleAddTodo(todoJson) {
    toggleAddTodoForm();
    addTodoAPI(todoJson);
  };

  function handleUpdateTodo(todoJson) {
    toggleUpdateTodoForm();
    updateTodoAPI(todoJson);
  };
  
  // Application
  return (
    <div className="App">

      {/* Add new todo modal form  */}
      {
        state.isAddTodoOpen && 
        <Form 
          isOpen={state.isAddTodoOpen}
          todoJson={{}}
          onClose={toggleAddTodoForm}
          onAddClick={handleAddTodo}
          formTitle="Add Todo"
        />
      }

      {/* Update todo modal form  */}
      {
        state.isEditTodoOpen && 
        <Form 
          isOpen={state.isEditTodoOpen}
          todoJson={state.updateJson}
          onClose={toggleUpdateTodoForm}
          onAddClick={handleUpdateTodo}
          formTitle="Udpate Todo"
        />
      }
      
      <div className='app-title-container'> 
        <h1 className='h1-title'>My Todo App</h1>
        <MyButton 
          btnClassName="app-title-button"
          buttonText="Add New Todo"
          onHandleClick={toggleAddTodoForm}
        />
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
