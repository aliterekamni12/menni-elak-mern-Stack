import React, { useContext, useState } from 'react'
import ProjectIdContext from '../../../context';
import DonationCart from '../../Donation/DonationCart';

const DonationSearchPage = () => {

    const {userData} = useContext(ProjectIdContext)

    const [donId, setDonId] = useState();

    const [response , setResponse] = useState();

    

    const handleSubmit = async()=>{
        const response = await fetch(`http://localhost:4000/api/admin/getDonation/${donId}`,{
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

  return (
    <>
    <div className='donation-search'>
      <label htmlFor='donationId'>Donation id: </label>
      <input name='donationId' id='donationId' type='text' onChange={((e)=>{setDonId(e.target.value)})}/>
      <input type='submit' className='submit' onClick={handleSubmit}/> 
    </div>
    <div>
        {response?._id}
    </div>
        {Array.isArray(response) && response?.map((datas)=>(
            <div className='donation'>
                <DonationCart datas={datas} />
                </div>

            
        ))}
    
    </>
  )
}

export default DonationSearchPage
