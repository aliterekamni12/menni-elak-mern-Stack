import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import UserCart from './UserCart/UserCart';
import "./Dashboard.css"
import { Link } from 'react-router-dom';


const Dashboard = () => {

    

  return (
    <div className='Dahboard-Container'>
        <div className='AllUser-dashboard '>
                <Link to='/AllUser'><button>All User List</button></Link>
            
        </div>
    </div>
  )
}

export default Dashboard
