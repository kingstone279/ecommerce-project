import { Routes, Route } from 'react-router'
import './App.css'
import { HomePage } from './pages/HomePages'

function App() {

  return (
    <Routes>
       <Route path='/' element={<HomePage/>} />
       <Route path='checkout' />
    </Routes>
  )
}

export default App
