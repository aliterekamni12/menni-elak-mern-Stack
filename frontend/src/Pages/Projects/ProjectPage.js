import { useParams } from "react-router-dom";
import "./ProjectPage.css";
import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import Project from "../Home/Project";
import ProjectIdContext from "../../context";

const ProjectPage = () => {

    const [data, setData] = useState({});

    const projectId = useContext(ProjectIdContext)
    
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

    console.log(data);
    

  return (
    <div>
       {data && data.map((e)=>{
        <Project datas={e}/>
       })}
    </div>
  )
}

export default ProjectPage
