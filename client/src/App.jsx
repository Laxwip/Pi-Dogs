import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import { useState } from 'react'
import axios from "axios"

function App() {

  const [dogsResult, setDogsResult] = useState({apiResults:[], dbResults:[]})

  const onSearch = async(name) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
      setDogsResult(response.data)
      console.log(dogsResult);
    } catch (error) {
      console.error("Error en los datos:", error)
    }
  }

  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>

      {location.pathname === "/home" ? <NavBar onSearch = { onSearch }></NavBar> : null}

      <Routes>
        <Route 
        path='/' 
        element={<Landing></Landing>}
        ></Route>
        <Route
        path='/home'
        element={<Home dogsResult = { dogsResult }></Home>}
        ></Route>
      </Routes>

    </>
  )
}

export default App 
