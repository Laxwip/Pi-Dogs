import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import { useState } from 'react'
import axios from "axios"
import Details from './components/Details/Details'

function App() {

  const [dogsResult, setDogsResult] = useState({apiResults: [], dbResults: []})

  const onSearch = async(name) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
      setDogsResult(response.data)
    } catch (error) {
      console.error("Error en los datos:", error)
    }
  }

  const [name, setName] = useState("")

  const handleChange = (event) => {
    const newName = event.target.value
    setName(newName)
    onSearch(newName)
  }

  const location = useLocation()
  
  return (
    <>

      {location.pathname === "/home" ? <NavBar name = {name} handleChange = {handleChange}></NavBar> : null}

      <Routes>

        <Route 
        path='/' 
        element={<Landing></Landing>}
        ></Route>

        <Route
        path='/home'
        element={<Home dogsResult = { dogsResult } name = {name}></Home>}
        ></Route>

        <Route
        path='/detail/:origen/:id'
        element={<div className='Details'>
          <div className='ButtonHome'>
            <Link to = {"/home"}>
              <button>⬅</button>
            </Link>
          </div>
          <Details></Details>
          </div>}
        ></Route>

      </Routes>

    </>
  )
}

export default App 
