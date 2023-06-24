import logo from './logo.svg';
import './App.css';

function App() {

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
      {/* Title */}
      <label for="todoTitle">To-Do title</label><br></br>
      <input type="text" id="todoTitle" placeholder="Title"></input>
      <br /><br />

      {/* Description */}
      <label for="todoDesc">To-Do Description</label><br/>
      <input type="text" id="todoDesc" placeholder="Description" />
      <br /><br />

      {/* Submit */}
      <input type="submit" value="Submit" onClick={getAllTodosAPI} />
      <br/><br/>

    </div>
  );
}

export default App;
