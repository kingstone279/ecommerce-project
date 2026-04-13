import { Routes, Route } from 'react-router'
import './App.css'
import { HomePage } from './pages/HomePages'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {

  return (
    <Routes>
       <Route path='/' element={<HomePage/>} />
       <Route path='/checkout.html' element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
