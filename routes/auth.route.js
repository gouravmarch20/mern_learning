const express = require('express')
const router = express.Router()
const {
  signup,
  signin,
  signout,
  contact,
  secret,
  getUserDetails
} = require('../controllers/auth.controller')
// middleware
const authenticate = require('../middleware/authenticate')

router.post('/signup', signup)

router.post('/signin', signin)
router.post('/contact', authenticate, contact)
router.get('/secret', authenticate, secret)
router.get('/getUserDetails', authenticate, getUserDetails)
router.post('/contact', authenticate, contact)
router.get('/signout', authenticate, signout)

module.exports = router
