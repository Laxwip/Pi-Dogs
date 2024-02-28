import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Details from './components/Details/Details'
import Form from './components/Form/Form'

function App() {

  const location = useLocation()
  
  return (
    <>
      {/*
        //+ NAVBAR
      */}
      {location.pathname === "/home" ? <NavBar></NavBar> : null}

      <Routes>

        {/*
          //+ LANDING
        */}
        <Route 
        path='/' 
        element={<Landing></Landing>}
        ></Route>
        
        {/*
          //+ HOME
        */}
        <Route
        path='/home'
        element={<Home></Home>}
        ></Route>
        
        {/*
          //+ DETAILS
        */}
        <Route
        path='/detail/:origen/:id'
        element={
        <div className='Details'>
          <div className='ButtonHome'>
            <Link to = {"/home"}>
              <button>⬅</button>
            </Link>
          </div>
          <Details></Details>
        </div>
        }
        ></Route>
        
        {/*
          //+ FORM
        */}
        <Route
        path='/form'
        element={
        <div className='Form'>
          <div className='ButtonHome'>
            <Link to = {"/home"}>
              <button>⬅</button>
            </Link>
          </div>
          <Form></Form>
        </div>
        }
        ></Route>

      </Routes>

    </>
  )
}

export default App 
