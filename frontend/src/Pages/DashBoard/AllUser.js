import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import UserCart from './UserCart/UserCart';
import "./Dashboard.css"
import { Link } from 'react-router-dom';

const AllUser = () => {
    const [data, setData] = useState({});

    const {userData , setUserId} = useContext(ProjectIdContext);
    const [usersCount , setUserCount ] = useState(0)

    const options={
        method : 'GET',
        headers :{
            'Authorization': `Bearer ${userData.token}`, 
            "Content-Type" : 'application/json'    
        },
    }
    
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch("http://localhost:4000/api/admin/getAllUsers" , options)
            .then(async(res)=>{
                const json = await res.json()
                setData(json)
                setUserCount(json.length)
                console.log(json);
                
            })
            .catch(err=>console.log(err))
        }
        fetchData()
    },[])

  return (
    <div className='Dahboard-Container'>
        <div className='AllUser'>
                <h1>All Users</h1>
                {usersCount && usersCount.length !== 0 ?<p>We have {usersCount} users</p>: <p>we dont have any user</p>}
                <Link to='/SearchUser'><button className='search-btn'>Search</button></Link>
                {Array.isArray(data) && data?.map((datas)=>(
                    <div className='everyUser' key={datas._id}>
                        <Link onClick={()=>{setUserId(datas._id)}}  to={`/user/${datas._id}`}><UserCart datas={datas}  /></Link>
                    </div>    
                    
                ))}
            
        </div>
    </div>
  )
}

export default AllUser
