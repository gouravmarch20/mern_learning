// --- npm inculuding
const mongooose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//---  Schema
const UserSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    required: true
  },
  work: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        require: true
      },
      phone: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})
// --- mongooose methord

UserSchema.pre('save', async function (next) {
  // if only password field get modified then only we will = ---> HASH & SAVE THE  PASSWORD
  if (this.isModified('password')) {
    // we need to await, bcz it return the promises
    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = await bcrypt.hash(this.cpassword, 12)
  }
  next()
})

// generate the token for the user when login
UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    // console.log(token)
    return token
  } catch (error) {
    console.log(`jwt inside error ` + error)
  }
}

//user when fills the Message Contact form

UserSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message })
    await this.save()
    return this.messages
  } catch (error) {
    console.log(error)
  }
}
//--- collection name : User
const User = mongooose.model('User', UserSchema)

module.exports = User
