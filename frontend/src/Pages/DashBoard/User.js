import React, { useContext, useEffect, useState } from 'react'
import ProjectIdContext from '../../context';
import UserPostsFD from '../Posts/UserPostsFD';
import DonationCart from '../Donation/DonationCart';



const User = () => {

    const [response , setResponse] = useState();

    const {userId, userData, setPostId, setProjectIdToAcc, setDonationId} = useContext(ProjectIdContext);

    
    
    
        
    
        
  

    const options={
        method : 'GET',
        headers :{
            'Authorization': `Bearer ${userData.token}`, 
            "Content-Type" : 'application/json'    
        },
    }

    

    useEffect(()=>{

        const interval = setInterval(()=>{
            const fetchData = async()=>{
            const response = await fetch(`http://localhost:4000/api/admin/getUser/${userId}`,options)
            .then(async(res)=>{
                const json = await res.json();
                setResponse(json)
                console.log(json.posts)
            })
        }
        fetchData()
        }, 2000)
        return () => clearInterval(interval);
        
        
        
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
                {response?.isVerified ? <p>Verified: Yes</p> : <p>Verified: No</p>}
                {response?.posts?.length !== 0 ?<h3>Posts:</h3>:<h3>No Post Yet</h3>}
                { response?.posts?.map((datas)=>(
                    
                    
                    <div className='post-cart-1' key={datas._id}>
                        <UserPostsFD datas={datas} />
                        
                        
                    </div>
                ))}
                {response?.donations?.length !== 0 ?<h3>Donations:</h3>:<h3>No Donation Yet</h3>}
                { response?.donations?.map((datas)=>(
                    <>
                    
                    <div className='post-cart-1' key={datas._id}>
                        <DonationCart datas={datas}/>
                        
                    </div></>
                ))}
                
            </div>
      </div>}
    </div>
  )
}

export default User
