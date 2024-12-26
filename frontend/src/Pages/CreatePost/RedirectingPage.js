import React,{useEffect} from 'react'
import "./CreatePost.css"
import { useNavigate } from 'react-router-dom'
const RedirectingPage = () => {


  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate("/Posts"), 10000);
  }, [])
  return (

    

    <div className='redirecting-Page'>
      <h1>Please wait until the administrator accepts your Post</h1>
    </div>
  )
}

export default RedirectingPage
