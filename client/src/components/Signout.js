import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const Signout = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
//   ! By Promise 
  useEffect(() => {
    fetch('/signout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        dispatch({ type: 'USER', payload: false })
        history.push('/signin', { replace: true })
        if (res.status !== 200) {
          const error = new Error(res.error)
          throw error
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return <span> Logout sucessfully </span>
}

export default Signout
