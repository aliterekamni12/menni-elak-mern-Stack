import React, { useContext,useState } from 'react'
import ProjectIdContext from '../../context'

const DonationCart = ({datas}) => {

  const [projectIdToAcc , setProjectIdToAcc] = useState("");
    const [donationId, setDonationId] = useState("");
    const[acceptMsg , setAcceptMsg] = useState("")

    const {userData} = useContext(ProjectIdContext)

  const handleAcceptDonation = async()=>{
    const acceptDonation = await fetch(`http://localhost:4000/api/admin/acceptDonate/${projectIdToAcc}/${donationId}`,{
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
        
    }).catch((err)=>{console.log(err)}  )
  }

  

  return (
    <div>
        <h3>id: {datas._id}</h3>
        <p>donation value: {datas.donationValue} $</p>
        <p>Project Id:  {datas.project}</p>
        <p>Payment Method: {datas.paymentMethod}</p>
        <div className='Accept'>
          {datas.isAccepted ? <p>Accepted: Yes</p> : <p>Accepted: No</p>}
          {datas.isAccepted ? <></> : <button onClick={()=>{  setProjectIdToAcc(datas.project); setDonationId(datas._id);handleAcceptDonation(); }}>Accept</button>}
        </div>
        <p> {acceptMsg} </p>
        <p>Created At: {datas.createdAt} </p>
        
    </div>
  )
}

export default DonationCart
