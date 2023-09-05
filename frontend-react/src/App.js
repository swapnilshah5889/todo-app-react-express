import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpLoginPage from './pages/SignUpLoginPage/SignUpLoginPage';
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/login' element={<SignUpLoginPage />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
