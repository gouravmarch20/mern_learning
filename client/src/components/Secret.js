import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import aboutpic1 from '../images/aboutpic1.png'
import aboutpic from '../images/aboutpic.png'

const Secret = () => {
  const history = useHistory()
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' })

  const callSecret = async () => {
    try {
      const res = await fetch('/secret', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()
      setUserData(data)

      console.log(data.name)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (error) {
      console.log('Not login user..!')
      history.push('/signout', { replace: true })
    }
  }

  useEffect(() => {
    callSecret()
  }, [])

  return (
    <>

      <div class='container emp-profile'>
        <form method='post'>
          <div class='row'>
            <div class='col-md-4'>
              <div class='profile-img'>
                <img
                  src={
                    userData.name === 'Vinod Bahadur Thapa'
                      ? aboutpic1
                      : aboutpic
                  }
                  alt={userData.name}
                />
                <div class='file btn btn-lg btn-primary'>
                  Change Photo
                  <input type='file' name='file' />
                </div>
              </div>
            </div>
            <div class='col-md-6'>
              <div class='profile-head'>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p class='proile-rating mt-3 mb-5'>
                  RANKINGS : <span>8/10</span>
                </p>
                <ul class='nav nav-tabs' id='myTab' role='tablist'>
                  <li class='nav-item'>
                    <a
                      class='nav-link active'
                      id='home-tab'
                      data-toggle='tab'
                      href='#home'
                      role='tab'
                      aria-controls='home'
                      aria-selected='true'
                    >
                      About
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a
                      class='nav-link'
                      id='profile-tab'
                      data-toggle='tab'
                      href='#profile'
                      role='tab'
                      aria-controls='profile'
                      aria-selected='false'
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class='col-md-2'>
              <input
                type='submit'
                class='profile-edit-btn'
                name='btnAddMore'
                value='Edit Profile'
              />
            </div>
          </div>
          <div class='row '>
            <div class='col-md-4 order-1 order-md-0'>
              <div class='profile-work'>
                <p>WORK LINK</p>
                <a
                  href='#'
                  target='_thapa'
                >
                  Youtuber
                </a>
                <br />
                <NavLink to='https://www.instagram.com/gouravmarch20/'>
                  Instagram
                </NavLink>
                <br />
                <NavLink to='https://www.trixoon.com/'>
                   Website
                </NavLink>
                <NavLink to='https://github.com/gouravmarch20/'>
                  GitHub
                </NavLink>
                <p>SKILLS</p>
                <NavLink to='#'>
                  MERN Developer
                </NavLink>
                <br />
                <NavLink to='#'>
                  Web Developer
                </NavLink>
                <br />
                <NavLink to='#'>
                  Figma
                </NavLink>
                <br />
                <NavLink to='#'>
                  Swing trader
                </NavLink>
                <br />
              </div>
            </div>
            <div class='col-md-8 pl-5 about-info'>
              <div class='tab-content profile-tab' id='myTabContent'>
                <div
                  class='tab-pane fade show active'
                  id='home'
                  role='tabpanel'
                  aria-labelledby='home-tab'
                >
                  <div class='row'>
                    <div class='col-md-6'>
                      <label>User Id</label>
                    </div>
                    <div class='col-md-6'>
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Name</label>
                    </div>
                    <div class='col-md-6 '>
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Email</label>
                    </div>
                    <div class='col-md-6'>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Phone</label>
                    </div>
                    <div class='col-md-6'>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Profession</label>
                    </div>
                    <div class='col-md-6'>
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div
                  class='tab-pane fade'
                  id='profile'
                  role='tabpanel'
                  aria-labelledby='profile-tab'
                >
                  <div class='row'>
                    <div class='col-md-6'>
                      <label>Experience</label>
                    </div>
                    <div class='col-md-6'>
                      <p>Expert</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Hourly Rate</label>
                    </div>
                    <div class='col-md-6'>
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Total Projects</label>
                    </div>
                    <div class='col-md-6'>
                      <p>230</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>English Level</label>
                    </div>
                    <div class='col-md-6'>
                      <p>Expert</p>
                    </div>
                  </div>
                  <div class='row mt-3'>
                    <div class='col-md-6'>
                      <label>Availability</label>
                    </div>
                    <div class='col-md-6'>
                      <p>6 months</p>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-md-12'>
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Secret
