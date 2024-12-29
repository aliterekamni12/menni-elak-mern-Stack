import React,{useContext, useState} from 'react'
import "./Posts.css"
import ProjectIdContext from '../../context'


const UserPostsFD = ({datas}) => {

  const [postId , setPostId] = useState("")

  const {userData} = useContext(ProjectIdContext)

  const handleAccept = async(datas)=>{
            
    const accept = await fetch(`http://localhost:4000/api/admin/acceptPost/${postId}`,{
        method : 'PATCH',
        headers :{
            'Authorization': `Bearer ${userData.token}`, 
            "Content-Type" : 'application/json'    
        },
        
    }).then((res)=>{
        console.log(res)
        
    }).catch((err)=>{console.log(err)})
}


    
    return (
      <div>
        
        <h3>Title: {datas.title}</h3>
        <p>description: {datas.description}</p>
        
        <h5>Amount: {datas.amount}</h5>
        <div className='Accept'>

          {datas.isAccepted ? <p>Accepted: Yes</p> : <p>Accepted: No</p>}
          {datas.isAccepted ? <></> : <button onClick={()=>{ setPostId(datas._id); handleAccept();} } >Accept</button>}
                            
        </div>
        
      </div>
    )
}

export default UserPostsFD
