import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpLoginPage from './pages/SignUpLoginPage/SignUpLoginPage';


function App() {
  return (
    <Routes>
      <Route index path='/' element={<HomePage />} />
      <Route path='/login' element={<SignUpLoginPage />} />
    </Routes>
  );
}

export default App;
