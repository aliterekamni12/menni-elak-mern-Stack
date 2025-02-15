import React,{useContext, useState} from 'react'
import "./Posts.css"
import ProjectIdContext from '../../context'


const UserPostsFD = ({datas}) => {

  const [postId , setPostId] = useState("")

  const {userData} = useContext(ProjectIdContext)
  const[acceptMsg , setAcceptMsg] = useState("");
  const[deleteMsg , setDeleteMsg] = useState();
  const [ postIdToDlt, setPostIdToDlt] = useState()


  const handleAccept = async(datas)=>{
            
    const accept = await fetch(`https://menni-elak-mern-stack.onrender.com/api/admin/acceptPost/${postId}`,{
        method : 'PATCH',
        headers :{
            'Authorization': `Bearer ${userData.token}`, 
            "Content-Type" : 'application/json'    
        },
        
    }).then((res)=>{
        console.log(res)
        if(res.ok){
          setAcceptMsg("Done")
        }
        
    }).catch((err)=>{console.log(err)})
}


  const deletePost = async()=>{
    const deletepost  = await fetch( `https://menni-elak-mern-stack.onrender.com/api/admin/deletePost/${postIdToDlt}`,{
      method : 'Delete',
      headers :{
          'Authorization': `Bearer ${userData.token}`, 
          "Content-Type" : 'application/json'    
      },
    }).then((res)=>{
      if(res.ok){
        setDeleteMsg("Deleted")
      }
    }).catch(err=>console.log(err))
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
        <p>{acceptMsg}</p>
        <button onClick={()=>{setPostIdToDlt(datas._id); deletePost()}}>Delete</button>
        <p>{deleteMsg} </p>
      </div>
    )
}

export default UserPostsFD
