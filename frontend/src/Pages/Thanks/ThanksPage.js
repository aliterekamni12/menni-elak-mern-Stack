import React from 'react'
import "./ThanksPage.css"
import { Link } from 'react-router-dom'
const ThanksPage = () => {
  return (
    <div className='ThanksPage'>
     <h1>Thank You For The  Donation ❤️❤️❤️</h1>
     <Link to='/'><button>Back To Home</button></Link>
    </div>
  )
}

export default ThanksPage
