import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import UserCart from './UserCart/UserCart';
import "./Dashboard.css"
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const {userData, setAllDonationData,  setPostData} = useContext(ProjectIdContext);
  const [donationsData , setDonationsData] = useState()
  const [postsData , setPostsData] = useState()
    useEffect(()=>{

      const interval = setInterval(()=>{

        const fectDonationData = async()=>{
        const donations = await fetch('https://menni-elak-mern-stack.onrender.com/api/admin/getAllDonations',{
          method : 'GET',
          headers :{
              'Authorization': `Bearer ${userData.token}`, 
              "Content-Type" : 'application/json'    
          },
        }).then(async(res)=>{
          const json = await res.json();
          setDonationsData(json);
          setAllDonationData(json)
        }).catch((err)=>{console.log(err)})
        }


        const fetchPosts = async()=>{
          const Posts = await fetch('https://menni-elak-mern-stack.onrender.com/api/admin/getAllNotAcceptedPost',{
            method : 'GET',
            headers :{
                'Authorization': `Bearer ${userData.token}`, 
                "Content-Type" : 'application/json'    
            },
          }).then(async(res)=>{
            const json = await res.json();
            setPostsData(json)
            setPostData(json)
          }).catch(err=>console.log(err)
          )
        }

        fetchPosts()
        fectDonationData()
      },2000)

      return () => clearInterval(interval);
      
    },[])

  return (
    <div className='Dahboard-Container'>
        <div className='AllUser-dashboard '>
                <Link to='/AllUser'><button>All Users List</button></Link>
            
        </div>
        <div className='donation-dashboard'>
          <h3>Now We Have {donationsData?.length} donations</h3>
          <Link to='/AllDonations'><button>All Donations List</button></Link>
        </div>
        <div className='donation-dashboard'>
          <h3>Now we have {postsData?.length} posts not accepted </h3>
          
          <Link to='/AllNotAcceptedPost'><button> Not Accepted Posts</button></Link>
        </div>
    </div>
  )
}

export default Dashboard
