import React, { useContext, useState } from 'react';
import "./Donation.css";
import { Link } from 'react-router-dom';
import ProjectIdContext from '../../context';

const Donation = () => {

    const  projectId = useContext(ProjectIdContext);

    const [value,setValue ] = useState(0);
    const [payment, setPayment] = useState("OMT");

    const data={
        donationValue:value, 
        paymentMethod:payment }

    const options = {
        method : 'POST',
        headers :{
            "Content-Type" : 'application/json',
            "authorization" : 'Bearer '
        },
        body: JSON.stringify(data)
    }
    
    

    const postDonation = async()=>{
         await fetch(`http://localhost:4000/api/donate/${projectId.projectId}`, options)
         .then((res)=>{console.log(res) })
         .catch((err)=>{console.log(err)}) 
        }

    const handleSubmit= (e)=>{
        e.preventDefault();
        postDonation()
        
    }

  return (
    <div className='donation-container'>
      <form>
        <label>Donation Value: </label>
        <input type='number' name='donationValue' id='donationValue' onChange={(e)=>{setValue(e.target.value)}}/>

        <label>Payment Method: </label>
        <select value={value} onChange={(e)=>{setPayment(e.target.value)}}>
            <option value="OMT">OMT</option>
            <option value="Western Union">Western Union</option>
            <option value="WHISH">WHISH</option>
        </select>
        <button onClick={handleSubmit} type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Donation
