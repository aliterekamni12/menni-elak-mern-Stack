import React,{useContext, useEffect, useState} from 'react'
import ProjectIdContext from '../../context'
import "./Posts.css"
import PostCart from './PostCart';
import { Link } from 'react-router-dom';

const Posts = () => {

    const {userData} = useContext(ProjectIdContext);

    const [response, setResponse] = useState({})

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch("http://localhost:4000/api/post")
            .then(async(res)=>{
                
                const json = await res.json()
                console.log(json);
                setResponse(json)
            })
            .catch((err)=>{console.log(err)})
        }
        fetchData()
        setTimeout(() => fetchData(), 60000);
    },[])

  return (
    
    <div className='posts-container'>
      <div className='createPost'>
          <label htmlFor='create'>Create Post: </label>
          <Link to='/CreatePost'><button>Post</button></Link>
        </div>
      {response && response.status === 201 ? <p>{response.message}</p>:
       <>
        
        <div className='posts'>
        {Array.isArray(response) && response?.map((datas) =>(
          <div className='post-cart' key={datas._id}>
            
            <PostCart  datas={datas}  />
          
            
          </div>
          
        ))}
        </div>
       </>}
    </div>
    
  )
}

export default Posts
