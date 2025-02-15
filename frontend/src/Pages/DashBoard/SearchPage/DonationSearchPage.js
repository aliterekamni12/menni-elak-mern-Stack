import React, { useContext, useState } from 'react'
import ProjectIdContext from '../../../context';
import DonationCart from '../../Donation/DonationCart';
import "../Dashboard.css"

const DonationSearchPage = () => {

    const {userData} = useContext(ProjectIdContext)

    const [donId, setDonId] = useState();

    const [response , setResponse] = useState();

    

    const handleSubmit = async()=>{
        const response = await fetch(`https://menni-elak-mern-stack.onrender.com/api/admin/getDonation/${donId}`,{
            method: "GET",
            headers :{
              "Content-Type" : 'application/json',
              'authorization' : `Bearer ${userData.token}`   
            },
        }).then(async(res)=>{
            const json = await res.json();
            setResponse(json)
            console.log(json);
            
        }).catch((err)=>{console.log(err)})
    }

    const donationData = {
      _id :response?._id,
      donationValue : response?.donationValue,
      project : response?.project,
      paymentMethod : response?.paymentMethod,
      isAccepted : response?.isAccepted,
      createdAt: response?.createdAt
    }

  return (
    <>
    <div className='donation-search'>
      <label htmlFor='donationId'>Donation id: </label>
      <input name='donationId' id='donationId' type='text' onChange={((e)=>{setDonId(e.target.value)})}/>
      <input type='submit' className='submit' onClick={handleSubmit}/> 
    </div>
    <div className='donation-search-Cart'>
        <div className='donation-search-Cart-container'>
        {response && donationData.length !== 0?
          <DonationCart datas={donationData} />:<></>}
        </div>
        
    </div>
        
    
    </>
  )
}

export default DonationSearchPage
