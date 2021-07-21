import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo2.png'
import { UserContext } from '../App'

const Navbar = () => {
  const [show, setShow] = useState(true)

  const getUserLoginDetails = async () => {
    const response = await fetch('/getUserDetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(`this is from the navabar ` + data)
    if (data) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    getUserLoginDetails()
  }, [])
  const { state, dispatch } = useContext(UserContext)
  console.log(`the navbar user ${state} and ${dispatch}`)
  const RenderList = () => {
    if (state) {
      return (
        <>
          <li className='nav-item active'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/'
            >
              Home{' '}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/secret'
            >
              AboutMe
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/contact'
            >
              Contact
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/signout'
            >
              Signout
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className='nav-item active'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/'
            >
              Home{' '}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/secret'
            >
              AboutMe
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/contact'
            >
              Contact
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/signin'
            >
              Signin
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink
              exact
              activeClassName='active-page'
              className='nav-link'
              to='/signup'
            >
              Signup
            </NavLink>
          </li>
        </>
      )
    }
  }
  return (
    <>
      <div className='container-fluid'>
        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
          <NavLink className='navbar-brand' to='/'>
            <img src={logo} alt='logo' />
          </NavLink>
          <button
            className='navbar-toggler d-lg-none'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavId'
            aria-controls='collapsibleNavId'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='collapsibleNavId'>
            <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
              <RenderList />
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
