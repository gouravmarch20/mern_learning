import React, {useState, useEffect} from 'react'

const Contact = () => {
  const [userMessage, setUserMessage] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const getData = async () => {
    const response = await fetch('/getUserDetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log('this is from the contact ' + data)
    // we are filling the db data
    setUserMessage({
      ...userMessage,
      name: data.name,
      email: data.email,
      phone: data.phone
    })
  }

  useEffect(() => {
    getData()
  }, [])

  let name, value
  const handleContact = e => {
    name = e.target.name
    value = e.target.value
    console.log(`${name} and ${value}`)
    setUserMessage({ ...userMessage, [name]: value })
  }

  const contactForm = async e => {
    e.preventDefault()

    const { name, email, phone, message } = userMessage

    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message
      })
    })

    const data = await response.json()

    if (!data) {
      console.log(`message not saved`)
    } else {
      alert(`Message send`)
      setUserMessage({ ...userMessage, message: '' })
    }
  }

  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between'>
                <div className='contact_info_item d-flex flex-row align-items-center justify-content-start'>
                  <div className='contact_info_image'>
                    <img
                      src='https://img.icons8.com/office/24/000000/iphone.png'
                      alt=''
                    />
                  </div>
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Phone</div>
                    <div className='contact_info_text'>+91 1111 543 2198</div>
                  </div>
                </div>
                <div className='contact_info_item d-flex flex-row align-items-center justify-content-start'>
                  <div className='contact_info_image'>
                    <img
                      src='https://img.icons8.com/ultraviolet/24/000000/filled-message.png'
                      alt=''
                    />
                  </div>
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Email</div>
                    <div className='contact_info_text'>contact@gmail.com</div>
                  </div>
                </div>
                <div className='contact_info_item d-flex flex-row align-items-center justify-content-start'>
                  <div className='contact_info_image'>
                    <img
                      src='https://img.icons8.com/ultraviolet/24/000000/map-marker.png'
                      alt=''
                    />
                  </div>
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Address</div>
                    <div className='contact_info_text'>Delhi, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Contact Form --> */}
      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact_form_container py-5'>
                <div className='contact_form_title'>Get in Touch</div>
                <form id='contact_form'>
                  <div className='contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between'>
                    <input
                      type='text'
                      id='contact_form_name'
                      className='contact_form_name input_field'
                      name='name'
                      value={userMessage.name}
                      onChange={handleContact}
                      placeholder='Your name'
                      required='required'
                    />
                    <input
                      type='text'
                      id='contact_form_email'
                      className='contact_form_email input_field'
                      name='email'
                      value={userMessage.email}
                      onChange={handleContact}
                      placeholder='Your email'
                      required='required'
                    />
                    <input
                      type='text'
                      id='contact_form_phone'
                      className='contact_form_phone input_field'
                      name='phone'
                      value={userMessage.phone}
                      onChange={handleContact}
                      placeholder='Your phone number'
                    />
                  </div>
                  <div className='contact_form_text'>
                    <textarea
                      className='text_field contact_form_message'
                      rows='4'
                      placeholder='Message'
                      required='required'
                      name='message'
                      value={userMessage.message}
                      onChange={handleContact}
                    ></textarea>
                  </div>
                  <div className='contact_form_button'>
                    <button
                      type='submit'
                      className='button contact_submit_button'
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='panel'></div>
      </div>
    </>
  )
}

export default Contact
