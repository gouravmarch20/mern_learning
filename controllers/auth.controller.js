// models import
const User = require('../models/User')
// npm
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// logic
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
      console.log(`error from the backend ${name}  ${password}  ${email}`)
      return res.json({ error: 'Plzz fill the data properly' })
    }

    const userEmail = await User.findOne({ email: email })

    if (userEmail) {
      console.log('email is already exists')
      return res.status(422).json({ error: 'Email alredy exists' })
    } else if (password != cpassword) {
      console.log('password are not matching ')
      return res.status(422).json({ error: 'passwords are not matching' })
    } else {
      // creating a new documents to be stored
      const user = new User({ name, email, phone, work, password, cpassword })

      // saving the data to the database
      await user.save()
      console.log(`${user.name} user Registered successfully`)

      res.status(201).json({ message: 'User Registered successfully' })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'INvalid Login Details' })
    }

    const userLogin = await User.findOne({ email: email })
    // console.log(userLogin)// whole object give

    if (userLogin) {
      //  first arg password is the user who enter while login and the 2nd arg is the password stored in our DB
      const isMatch = await bcrypt.compare(password, userLogin.password)
      // console.log(isMatch);// if true then token create & set in browser

      if (isMatch) {
        let token = await userLogin.generateAuthToken()
        // console.log(token)
        let verified = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verified)
        //? Save token in browser
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true
        })
        res.json({ message: 'user signin successfully' })
      } else {
        res.status(422).json({ error: 'Invalid Login Details' })
      }
    } else {
      return res.status(404).json({ error: 'INvalid Login Details' })
    }
  } catch (error) {
    console.log('our error ' + error)
  }
}
exports.secret = async (req, res) => {
  console.log('Hello from the secret page')
  res.send(req.rootUser)
}

exports.getUserDetails = async (req, res) => {
  console.log(`my detals: ${req.rootUser} `)
  res.send(req.rootUser)
}

exports.contact = async (req, res) => {
  try {
    // we will get the data from react form
    const { name, email, phone, message } = req.body

    // we will do validation
    if (!name || !email || !phone || !message) {
      console.log(`eroro from the backend ${name}  ${password}  ${email}`)
      return res.json({ error: 'Plzz fill the data properly' })
    }

    // we need to check weather the user already exists or not
    const userContact = await User.findOne({ _id: req.userID })

    if (userContact) {
      // creating a new documents to be stored
      // const userMessage = new User({ name, email, phone, message });

      userMessage = await userContact.addMessage(name, email, phone, message)
      console.log(userMessage)
      // saving the data to the database
      const userMessageAdded = await userContact.save()
      // console.log(`${userMessageAdded} user Registered successfully`);
      // return userRegister;
      // res.status(201).render('sigin');
      res.status(201).json({ message: 'User Contact successfully' })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.signout = async (req, res) => {
  res.clearCookie('jwtoken', { path: '/' })
  // can't send empty respone :: it show error
  res.status(200).send('signout sucessfully')
}
