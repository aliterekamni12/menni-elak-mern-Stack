import React, { useContext, useEffect, useState } from 'react'
import ProjectIdContext from '../../context';
import PostCart from '../Posts/PostCart';


const User = () => {

    const [response , setResponse] = useState();

    const {userId, userData} = useContext(ProjectIdContext);

    const options={
        method : 'GET',
        headers :{
            'Authorization': `Bearer ${userData.token}`, 
            "Content-Type" : 'application/json'    
        },
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`http://localhost:4000/api/admin//getUser/${userId}`,options)
            .then(async(res)=>{
                const json = await res.json();
                setResponse(json)
                console.log(json.posts)
            })
        }
        fetchData()
    },[])

  return (
    <div>
      {response && response.status ===404 ? <p>{response.message} </p> : <div className='everyUser'>
            <div className='user-3'>
                <h1>Full Name: {response?.firstName} {response?.lastName}</h1>
                <p>Id: {response?._id}</p>
                <p>Email: {response?.email}</p>
                <p>Username: {response?.username}</p>
                <p>User Role : {response?.role}</p>
                {response?.isAdmin ? <p>Admin: Yes</p> : <p>Admin: No</p>}
                {response?.isVerified ? <p>Admin: Yes</p> : <p>Admin: No</p>}
                {response?.posts?.length !== 0 ?<h3>Posts:</h3>:<h3>No Post Yet</h3>}
                { response?.posts?.map((datas)=>(
                    <>
                    
                    <div className='post-cart-1' key={datas._id}>
                        <h3>Title: {datas?.title}</h3>
                        <p>description: {datas?.description}</p>
                        <h5>Amount: {datas?.amount}</h5>
                    </div></>
                ))}
                {response?.donations?.length !== 0 ?<h3>Donations:</h3>:<h3>No Donation Yet</h3>}
                { response?.donations?.map((datas)=>(
                    <>
                    
                    <div className='post-cart-1' key={datas._id}>
                        <h3>id: {datas?._id}</h3>
                        <p>donation value: {datas?.donationValue}</p>
                        {datas.isAccepted ? <p>Accepted: Yes</p> : <p>Accepted: No</p>}
                        <p>Project Id:  {datas.project}</p>
                    </div></>
                ))}
                
            </div>
      </div>}
    </div>
  )
}

export default User
