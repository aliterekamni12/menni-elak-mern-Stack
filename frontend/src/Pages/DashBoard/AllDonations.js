import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import UserCart from './UserCart/UserCart';
import "./Dashboard.css"
import { Link } from 'react-router-dom';
import DonationCart from '../Donation/DonationCart';

const AllDonations = () => {

    const {userData} = useContext(ProjectIdContext)
  const [donationsData , setDonationsData] = useState()

    useEffect(()=>{

      const interval = setInterval(()=>{

        const fectDonationData = async()=>{
        const donations = await fetch('http://localhost:4000/api/admin/getAllDonations',{
          method : 'GET',
          headers :{
              'Authorization': `Bearer ${userData.token}`, 
              "Content-Type" : 'application/json'    
          },
        }).then(async(res)=>{
          const json = await res.json();
          setDonationsData(json);
          
        }).catch((err)=>{console.log(err)})
        }
        fectDonationData()
      },2000)

      return () => clearInterval(interval);
      
    },[])

    

  return (
    <div className='AllDonations'>
      <h1>All Donations</h1>
      <Link to='/SearchDonation'><button className='search-btn'>Search</button></Link>
      {donationsData && donationsData.map((datas)=>(
        <div className='everyDonation'> 
          <DonationCart datas={datas} />
        </div>
      ))}
    </div>
  )
}

export default AllDonations
