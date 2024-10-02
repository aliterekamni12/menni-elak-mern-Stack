import React ,{useState, useEffect, useContext}from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import waterWellVideo from "./waterWell.mp4";
import FoodVideo from './Food.mp4'
import ReactPlayer from "react-player";
import Project from './Project';
import ProjectIdContext from '../../context';


const Home = () => {

    const [data, setData] = useState();

    useEffect(()=>{
      const fetchData= async()=>{
        const response = await fetch('http://localhost:4000/api/admin/projects');
        const json = await response.json();
        
        if(response.ok){
          setData(json)
        }
        

      }
      fetchData()
      
    },[]);

    const {setProjectId} = useContext(ProjectIdContext)
   
    
  return (
    <div className='home'>
      <div className='Top-home'>
        <h1>Welcome to Team Menni Elak</h1>
        <h2>Empower Change. Make a Difference.</h2>
        <p>At Team Menni Elak, we believe in the power of collective action to create a better world. Our mission is to collect the donations from you and make small projects like food donations and clothes donations and building water wells in India or South Africa. With your support, we can turn hope into action and dreams into reality.</p>
      </div>
      <div className='videos'>
        
         <ReactPlayer
            className='videoPlayer'
            url={waterWellVideo}
            width="800px"
            height="620px"
            controls={true}
            
          />
          <ReactPlayer
          className='videoPlayer'
            url={FoodVideo}
            width="800px"
            height="620px"
            controls={true}
          />
      </div>
      <div className='projects-title'><h3>Our Latest Projects:</h3></div>
      <div className='projects'>
        
        {data && data.map((datas) =>(
          <div key={datas._id}>
            
              <Link className='link' onClick={()=>{setProjectId(datas._id)}} to={`/project/${datas._id}`}><Project  datas={datas}  /></Link>
            
            
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Home
