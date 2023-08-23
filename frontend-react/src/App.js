import logo from './logo.svg';
import './App.css';
import Form from './components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import MyButton from './components/button/button.component';

function App() {

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
      const response = await fetch(basePath+"/todos", {method:"GET"}); 
      const jsonData = await response.json();
      // const logs = {updates:0, deletes:0, inserts:0};
      // filteredjsonData.forEach((todo) => {
      //   const isAvailable = state.todoJsonArr.find((item) => {
      //     return item.id === todo.id;
      //   });
      //   if(!isAvailable) {
      //     state.todoJsonArr.push(todo);
      //     logs.inserts++;
      //   }
      //   else {
      //     state.todoJsonArr.map((item) => {
      //       if(item.id === todo.id && (item.title!== todo.title || item.description!== todo.description)) {
      //         item.title = todo.title;
      //         item.description = todo.description;
      //         logs.updates++;
      //       }
      //     })
      //   }
      // })

      // console.log(logs);
      setState(prevState => ({ ...prevState, todoJsonArr: jsonData, hello:true }));
    } catch (error) {
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
  }, 5000);

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
