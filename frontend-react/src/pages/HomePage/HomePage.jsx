import './HomePage.styles.scss';
import Form from '../../components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list.component';
import axios from 'axios';
import ErrorCard from '../../components/error-card/error.component';
import AppBar from '../../components/app-bar/AppBar';
import { useCookies } from "react-cookie";
import { IsUserLoggedIn, USER_COOKIE, GetUsername } from '../../utils';
import { useNavigate } from 'react-router-dom';
import NoDataCard from '../../components/NoDataCard/NoDataCard';

const HomePage = () => {
    const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const basePath = "http://localhost:3001";
  const [refreshCount, setRefreshCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([USER_COOKIE]);
  const navigate = useNavigate();

  // Go to login page if user not logged in
  useEffect(() => {
    if(!IsUserLoggedIn(cookies)) {
      navigate('/login');
    }
  },[])

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

      const username = GetUsername(cookies);

      const config = {
        headers: {
          username: username
        }
      }
      
      const response = await axios.get(basePath+"/todos", config);
      
      // Network Error
      if(response.status !== 200 || !response.data.status) {
        setIsError(true);
        return;
      }
      console.log(response.data);
      const jsonData = response.data;

      // API Error
      if(!jsonData.status) {
        setIsError(true);
        return;
      }
      
      // Set Data
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
      return todo._id === id;
    })) 
    {
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
      return todo._id != id;
    });
    setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
  };

  // API request to add new todo
  const addTodoAPI = async (todoJson) => {
    try {

      const config = {
        headers: {
          username: GetUsername(cookies),
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
      const updatedTodoList = [...state.todoJsonArr, jsonData.data];
      setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
      
    } catch (error) {
      fetchData();
      console.log(error);
    }
  };
  
  // API to delete todo
  const deleteTodoAPI = async (id) => {
    try {
      const config = {
        headers: {
          username: GetUsername(cookies),
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.delete(basePath+"/todos/"+id, config);

      // If error - refresh data
      if(response.status !== 200 || !response.data.status) {
        fetchData();
      }
      updateTodoListAfterDelete(id);
      setIsError(false);
    } catch (error) {
        fetchData();
        console.log(error);
    }
  };

  // Udpate Todo API
  const updateTodoAPI = async(todoJson) => {
    try {

      const config = {
        headers: {
          username: GetUsername(cookies),
          'Content-Type': 'application/json'
        }
      }
      const body = {title:todoJson.title, description:todoJson.description, isDone:todoJson.isDone};

      const response = await axios.put(basePath+"/todos/"+todoJson._id, JSON.stringify(body), config);

      // If error - refresh data
      if(response.status !== 200 || !response.data.status) {
        fetchData();
      }
      
      let updatedArr = state.todoJsonArr.map((value) => {
        if(value._id === todoJson._id) {
          return todoJson;
        }
        return value
      });
      setState(prevState => ({...prevState, todoJsonArr:updatedArr}));

    } catch (error) {
      fetchData();
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

  const handleLogout = () => {
    if(IsUserLoggedIn(cookies)){ 
      removeCookie('username', { path: '/' });
      navigate('/login');
    }
  }

  let AppCard;
  // Error Card
  if(isError) {
    AppCard = <ErrorCard 
      errorButtonClick={handleTryAgainClick}
    />
  }
  // No Data
  else if (state.todoJsonArr.length === 0){
    AppCard = <NoDataCard 
              addTodoClick={toggleAddTodoForm}/>
  }
  // Todo Card List
  else {
    AppCard = (
    <div className='todo-list-cnt'>
      <CardList 
        toDoList={state.todoJsonArr}
        onDeleteClick={handleDelete}
        onEditClick={handleEdit}
        onStatusChange={updateTodoAPI}
      />
    </div>);
  }
  
  if(IsUserLoggedIn(cookies)) {
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
          onLogoutClick={handleLogout}
        />
  
        {/* Content */}
        <div className='m-5'>
          {AppCard}
        </div>
  
      </div>
    );
  }
  else {
    navigate('/login');
    return <></>
  }

}

export default HomePage;