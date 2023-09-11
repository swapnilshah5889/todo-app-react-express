import './App.css'
import { CookiesProvider } from 'react-cookie'
import { Route, Routes } from 'react-router-dom'
import SignUpLoginPage from './pages/SignUpLoginPage/SignUpLoginPage'
import HomePage from './pages/HomePage/HomePage'

const TempCard = () => {

  return (
    <div className='w-10 h10 bg-red-500'>
      Hello
    </div>
  );
}
function App() {

  return (
    <CookiesProvider>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/login' element={<SignUpLoginPage />} />
      </Routes>
    </CookiesProvider>
  )
}

export default App
