import { Link, useParams } from "react-router-dom";
import "./ProjectPage.css";
import React, {useState, useEffect, useContext} from 'react'

import ProjectIdContext from "../../context";

const ProjectPage = () => {

    const [data, setData] = useState({});

    const projectId = useContext(ProjectIdContext);
    
    
    const fetchData = async()=>{
        const response = await fetch(`http://localhost:4000/api/admin/project/${projectId.projectId}`);
        const json = await response.json();
        //console.log(json);
        if(response.ok){
            setData(json)
        }
    }

    useEffect(()=>{
        
        fetchData();
        
        
    },[])

    

  return (
    <div className='project-page-card'>
        <h1>Title: {data.name}</h1>
        <img src={data.image} />
        
        <p><strong>Description:</strong> {data.description}</p>
        
        {data.isAchieved? 
        <>
            <p>Thanks For All for the donations. we achieved our goal that is to reached {data.goal}</p>
            <Link to='/'><button>Back To Home</button></Link>
        </>:
        
        <>
        <p><strong> The Goal:</strong> {data.goal}$</p>
        <p><strong> The Total donations :</strong>{data.total}$</p>
        {!projectId.login? <Link to='/login'><button>Login</button></Link> : <Link to={`/donate/${projectId.projectId}`}><button>Donate</button></Link>}
        
        </>
        
        }


      </div>
  )
}

export default ProjectPage
