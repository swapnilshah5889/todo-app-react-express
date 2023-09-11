import './App.css'
import { CookiesProvider } from 'react-cookie'
import { Route, Routes } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <p> HomePage </p>
    </div>
  );
}

const SignUpLoginPage = () => {
  return (
    <div>
      SignUpLoginPage
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
