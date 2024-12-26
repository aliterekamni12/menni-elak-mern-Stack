import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import UserCart from './UserCart/UserCart';
import "./Dashboard.css"

const Dashboard = () => {

    const [data, setData] = useState({});

    const {userData} = useContext(ProjectIdContext)

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
                console.log(json);
                
            })
            .catch(err=>console.log(err))
        }
        fetchData()
    },[])

  return (
    <div className='Dahboard-Container'>
        <div className='AllUser'>
        
                {Array.isArray(data) && data?.map((datas)=>(
                    <div className='everyUser' key={datas._id}>
                        <UserCart datas={datas} />
                    </div>    
                    
                ))}
            
        </div>
    </div>
  )
}

export default Dashboard
