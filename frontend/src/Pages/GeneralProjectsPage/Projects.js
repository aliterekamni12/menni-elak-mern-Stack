import React,{startTransition, useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import ProjectIdContext from '../../context';
import Project from '../Home/Project';
const Projects = () => {

    const [data, setData] = useState();

    useEffect(()=>{
      const fetchData= async()=>{
        const response = await fetch('https://menni-elak-mern-stack.onrender.com/api/admin/projects');
        const json = await response.json();
        
        if(response.ok){
          setData(json)
        }
        

      }
      fetchData()
      
    },[5000]);

    const {setProjectId} = useContext(ProjectIdContext)
  return (
    <div className='projects'>
        
        {data && data.map((datas) =>(
          <div key={datas._id}>
            
              <Link className='link' onClick={()=>{setProjectId(datas._id)}} to={`/project/${datas._id}`}><Project  datas={datas}  /></Link>
            
            
          </div>
          
        ))}
      </div>
  )
}

export default Projects
