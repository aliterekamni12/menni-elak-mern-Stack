import React,{useEffect, useState} from 'react'

const PostCart = ({datas})=>{

  const [data, setData] = useState()

  useEffect(()=>{
    const getUser = async()=>{
      const response = await fetch(`https://menni-elak-mern-stack.onrender.com/api/admin/getUser/${datas.author}`)
      .then(async(res)=>{
        const json = await res.json();
        setData(json)
        
        
      })
    }
    getUser()
  },[])
  return (
    <div>
      <p>User: {data?.firstName} {data?.lastName}</p>
      <h3>Title: {datas.title}</h3>
      <p>description: {datas.description}</p>
      <h5>Amount: {datas.amount}</h5>
      <p>{data?.email}</p>
    </div>
  )
}

export default PostCart
