/* eslint-disable react-hooks/exhaustive-deps */
import './HomePage.styles.scss';
import Form from '../../components/input-form/form/form.component';
import { useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list.component';
import axios from 'axios';
import ErrorCard from '../../components/error-card/error.component';
import AppBar from '../../components/app-bar/AppBar';
import { useCookies } from "react-cookie";
import { IsUserLoggedIn, USER_COOKIE, GetUsername, BASE_URL } from '../../utils';
import { useNavigate } from 'react-router-dom';
import NoDataCard from '../../components/NoDataCard/NoDataCard';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { Cookies } from '../../utils/types';
import { Todo } from '../../types';

type HomePageState = {
  isAddTodoOpen: boolean,
  isEditTodoOpen: boolean,
  todoJsonArr: Todo[],
  updateJson: Partial<Todo>
}

const HomePage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [cookies, , removeCookie] = useCookies([USER_COOKIE]);
  const navigate = useNavigate();
  const [isAddTodoAPI, setIsAddTodoAPI] = useState(false);
  const [isUpdateTodoAPI, setIsUpdateTodoAPI] = useState(false);

  // Go to login page if user not logged in
  useEffect(() => {
    if(!IsUserLoggedIn(cookies as Cookies)) {
      navigate('/login');
    }
  },[])

  // Variables
  const [state, setState] = useState<HomePageState>({
    isAddTodoOpen:false,
    isEditTodoOpen:false,
    todoJsonArr:[],
    updateJson:{}
  });

  // Toggle visibility of the modal form
  function toggleAddTodoForm() {
    setState(prevState => ({ ...prevState, isAddTodoOpen: !state.isAddTodoOpen }));
  }

  function toggleUpdateTodoForm(){
    setState(prevState => ({ ...prevState, isEditTodoOpen: !state.isEditTodoOpen }));  
  }

  const fetchData = async () => {
    try {
      const username = GetUsername(cookies as Cookies);
      const config = {
        headers: {
          username: username
        }
      }
      
      const response = await axios.get(BASE_URL+"/todos", config);
      setIsLoading(false);
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

      jsonData.data.map((data: Todo, index: number) => {
        return jsonData.data[index].isLoading = false;
      })
      
      // Set Data
      setState(prevState => ({ ...prevState, todoJsonArr: jsonData.data}));
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

  function handleDelete(id: string) {
    
    // Check if id exists in the array
    if(state.todoJsonArr.some((todo: Todo) => {
      return todo._id === id;
    })) 
    {
      deleteTodoAPI(id);
    }
    else {
      alert("something went wrong");
    }
  }

  function handleEdit(todoJson: Todo) {
    toggleUpdateTodoForm();
    setState(prevState=>({ ...prevState, updateJson:todoJson }));
  }

  function updateTodoListAfterDelete(id: string) {
    const updatedTodoList = state.todoJsonArr.filter((todo: Todo) => {
      return todo._id !== id;
    });
    setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
  }

  // API request to add new todo
  const addTodoAPI = async (todoJson: Todo) => {
    try {
      setIsAddTodoAPI(true);
      const config = {
        headers: {
          username: GetUsername(cookies as Cookies),
          'Content-Type': 'application/json'
        }
      }
      
      const response = await axios.post(BASE_URL+"/todos", JSON.stringify(todoJson), config);
      setIsAddTodoAPI(false);
      toggleAddTodoForm();
      
      // If error - refresh data
      if(response.status !== 200 || !response.data.status) {
        fetchData();
      }

      // On success update original array by adding the new jsondata
      const jsonData = response.data;
      const updatedTodoList = [...state.todoJsonArr, jsonData.data];
      setState(prevState => ({ ...prevState, todoJsonArr: updatedTodoList }));
      
    } catch (error) {
      setIsAddTodoAPI(false);
      toggleAddTodoForm();
      fetchData();
      console.log(error);
    }
  };
  
  // API to delete todo
  const deleteTodoAPI = async (id: string) => {
    try {
      const config = {
        headers: {
          username: GetUsername(cookies as Cookies),
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.delete(BASE_URL+"/todos/"+id, config);

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

  const setTodoUpdateLoading = (todoJson: Todo, status: boolean) => {
    setIsUpdateTodoAPI(status);
    const todoArr: Todo[] = state.todoJsonArr;
    const updateTodoList = todoArr.map((todo) => {
      if(todo._id === todoJson._id) {
        todo.isLoading = status;
      }
      return todo;
    })
    setState(prevState => ({ ...prevState, todoJsonArr: updateTodoList}));
  }

  // Udpate Todo API
  const updateTodoAPI = async(todoJson: Todo) => {
    try {
      setTodoUpdateLoading(todoJson, true);
      const config = {
        headers: {
          username: GetUsername(cookies as Cookies),
          'Content-Type': 'application/json'
        }
      }
      const body = {title:todoJson.title, description:todoJson.description, isDone:todoJson.isDone};

      const response = await axios.put(BASE_URL+"/todos/"+todoJson._id, JSON.stringify(body), config);
      setTodoUpdateLoading(todoJson, false);

      // If error - refresh data
      if(response.status !== 200 || !response.data.status) {
        fetchData();
      }
      
      const updatedArr: Todo[] = state.todoJsonArr.map((value) => {
        if(value._id === todoJson._id) {
          return todoJson;
        }
        return value
      });
      setState(prevState => ({...prevState, todoJsonArr:updatedArr}));

    } catch (error) {
      setTodoUpdateLoading(todoJson, false);
      fetchData();
      console.log(error);
    }
  };

  function handleAddTodo(todoJson: Todo) {
    addTodoAPI(todoJson);
  }

  function handleUpdateTodo(todoJson: Todo) {
    toggleUpdateTodoForm();
    updateTodoAPI(todoJson);
  }

  const handleTryAgainClick = () => {
    fetchData();
  };

  const handleLogout = () => {
    if(IsUserLoggedIn(cookies as Cookies)){ 
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
  // Loading Card
  else if(isLoading) {
    AppCard = <LoadingCard/>
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
  
  if(IsUserLoggedIn(cookies as Cookies)) {
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
            isLoading = {isAddTodoAPI}
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
            isLoading={isUpdateTodoAPI}
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