import './App.css';
import Form from './components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import MyButton from './components/button/button.component';
import axios from 'axios';
import ErrorCard from './components/error-card/error.component';
import AppBar from './components/app-bar/AppBar';

function App() {

  const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const basePath = "http://localhost:3001";
  const [refreshCount, setRefreshCount] = useState(0);
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

      const config = {
        headers: {
          username:'swapnil@gmail.com'
        }
      }
      
      const response = await axios.get(basePath+"/todos", config);
      
      // Network Error
      if(response.status !== 200) {
        setIsError(true);
        return;
      }

      const jsonData = response.data;

      // API Error
      if(!jsonData.status) {
        setIsError(true);
        return;
      }
      
      // Set Data
      console.log(jsonData.data);
      // const response = await fetch(basePath+"/todos", {method:"GET"}); 
      // const jsonData = await response.json();
      setState(prevState => ({ ...prevState, todoJsonArr: jsonData.data, hello:true }));
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  // Fetch Data API
  useEffect(()=> {
    fetchData();
  }, [refreshCount]);

  // Refresh data at intervals of 5 seconds
  setTimeout(() => {
    setRefreshCount(refreshCount+1);
  }, 10000);

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

      const config = {
        headers: {
          username:'swapnil@gmail.com',
          'Content-Type': 'application/json'
        }
      }
      
      const response = await axios.post(basePath+"/todos", JSON.stringify(todoJson), config);
      
      // If error - refresh data
      if(response.status !== 200 || !response.data.status) {
        fetchData();
      }

      // On success update original array by adding the new jsondata
      const jsonData = response.data;
      const updatedTodoList = [...state.todoJsonArr, jsonData];
      setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
      
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

      const response = await fetch(basePath+"/todos/"+todoJson.id, {
        method:"PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({title:todoJson.title, description:todoJson.description})
      }); 
      
      if(response.ok) {
        let updatedArr = state.todoJsonArr.map((value) => {
          if(value.id == todoJson.id) {
            value.title = todoJson.title;
            value.description = todoJson.description;
          }
          return value
        });
        setState(prevState => ({...prevState, todoJsonArr:updatedArr}));
      }
      else {
        alert("Something went wrong");
      }

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

  const handleTryAgainClick = () => {
    fetchData();
  };

  let AppCard;
  // Error Card
  if(isError) {
    AppCard = <ErrorCard 
      errorButtonClick={handleTryAgainClick}
    />
  }
  // Todo Card List
  else {
    AppCard = (
    <div className='todo-list-cnt'>
      <CardList 
        toDoList={state.todoJsonArr}
        onDeleteClick={handleDelete}
        onEditClick={handleEdit}
      />
    </div>);
  }
  
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
          okayBtnText="Add Todo"
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
          okayBtnText="Update"
        />
      }
      
      {/* App Bar */}
      <AppBar 
        toggleAddTodoForm = {toggleAddTodoForm}
      />

      {/* Content */}
      <div className='m-5'>
        {AppCard}
      </div>

    </div>
  );
}

export default App;
