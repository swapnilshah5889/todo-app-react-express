import './App.css'
import { CookiesProvider } from 'react-cookie'
import { Route, Routes } from 'react-router-dom'
import SignUpLoginPage from './pages/SignUpLoginPage/SignUpLoginPage'
import HomePage from './pages/HomePage/HomePage'

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
