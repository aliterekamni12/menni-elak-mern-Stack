import React,{useEffect, useState} from 'react'

const PostCart = ({datas})=>{

  const [data, setData] = useState()

  useEffect(()=>{
    const getUser = async()=>{
      const response = await fetch(`http://localhost:4000/api/admin/getUser/${datas.author}`)
      .then(async(res)=>{
        const json = await res.json();
        setData(json)
        console.log(json);
        
      })
    }
    getUser()
  },[])
  return (
    <div>
      <p>{data?.firstName} {data?.lastName}</p>
      <h3>{datas.title}</h3>
      <p>{datas.description}</p>
      <h5>{datas.amount}</h5>
      <p>{data?.email}</p>
    </div>
  )
}

export default PostCart
