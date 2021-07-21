import React, { useEffect, createContext, useReducer, useContext } from 'react'
// npm
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
// coustom module
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Secret from './components/Secret'
import Contact from './components/Contact'
import Signout from './components/Signout'

// Reducer
import { initialState, reducer } from './reducer/userReducer'

export const UserContext = createContext() //Context

const Routing = () => {
  const { state, dispatch } = useContext(UserContext)

  const getUserName = async () => {
    try {
      const response = await fetch('/getUserDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      const data = await response.json()
      console.log(`My Home data Login ` + data.name)
      if (data) {
        dispatch({ type: 'USER', payload: data })
        console.log(`login ka useffect ` + data)
      }
    } catch (error) {
      console.log(`My Home page error ` + error)
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/secret'>
        <Secret />
      </Route>

      <Route path='/contact'>
        <Contact />
      </Route>

      <Route path='/signin'>
        <Signin />
      </Route>

      <Route path='/signup'>
        <Signup />
      </Route>

      <Route path='/signout'>
        <Signout />
      </Route>
    </Switch>
  )
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
