import React, { useContext, useState } from 'react';
import "./Donation.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProjectIdContext from '../../context';

const Donation = () => {

    const  projectId = useContext(ProjectIdContext);
    

    const [value,setValue ] = useState(0);
    const [payment, setPayment] = useState("OMT");
    const navigate = useNavigate();

    const [response, setResponse] = useState({})

    const data={
        donation:value, 
        paymentMethod:payment }

    const options = {
        method : 'POST',
        headers :{
            "Content-Type" : 'application/json',
            "authorization" : `Bearer ${projectId.userData.token}`
        },
        body: JSON.stringify(data)
    }
    
    

    // const postDonation = async()=>{
    //      await fetch(`http://localhost:4000/api/donate/${projectId.projectId}`, options)
    //      .then((res)=>{console.log(res) })
    //      .catch((err)=>{console.log(err)});
         
    //     }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/donate/${projectId.projectId}` , options)
        .then(async(res)=>{
          const json = await res.json()
          setResponse(json)
          if(res.ok){
            navigate('/ThanksPage')
          }
        })
        .catch(err=>console.log(err.message))
        //const json = response.json();

        //  if(response.ok){
        //    navigate('/ThanksPage');
        
        //  }
        // setResponse(json)
    }

    

  return (
    <div className='donation-container'>
      <form>
        <label>Donation Value: </label>
        <input type='number' name='donationValue' min='1'  id='donationValue' onChange={(e)=>{setValue(e.target.value)}}/>
        {response.length !== 0 ? <p id='error'>{response.message} </p> : <></>}
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
