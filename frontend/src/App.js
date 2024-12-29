import './App.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom'; 
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Home from './Pages/Home/Home';

import ProjectPage from './Pages/Projects/ProjectPage';
import {  useState } from 'react';
import ProjectIdContext from './context';
import Donation from './Pages/Donation/Donation';
import ThanksPage from './Pages/Thanks/ThanksPage';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Projects from './Pages/GeneralProjectsPage/Projects';
import Fpassword from './Pages/ForgetPass/Fpassword';
import AboutUs from './Pages/AboutUs/AboutUs';
import Posts from './Pages/Posts/Posts';
import CreatePost from './Pages/CreatePost/CreatePost';
import RedirectingPage from './Pages/CreatePost/RedirectingPage';
import Dashboard from './Pages/DashBoard/Dashboard';
import SearchPage from './Pages/DashBoard/SearchPage/SearchPage';
import AllUser from './Pages/DashBoard/AllUser';
import User from './Pages/DashBoard/User';
import AllDonations from './Pages/DashBoard/AllDonations';
import DonationSearchPage from './Pages/DashBoard/SearchPage/DonationSearchPage';



function App() {

  const [projectId, setProjectId] = useState("66e49c99a505cbd81392e178");
  const [login, isLogin] = useState(false)
  const[userData, setUserData] = useState();
  const [admin, isadmin] = useState(false)
  const[ userId, setUserId] = useState("");
  
  
  const ProjectIdValue = {projectId, setProjectId,
    login, isLogin,
     userData, setUserData,
      admin, isadmin,
       userId, setUserId,
       
      }; 
  
  return (
    <>
    <ProjectIdContext.Provider value={ProjectIdValue}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path={`/project/${projectId}`}  element={<ProjectPage/>} />
          <Route path={`/donate/${projectId}`} element={<Donation/>}/>
          <Route path='/ThanksPage' element={<ThanksPage/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/Forgetpassword' element={<Fpassword/>}/>
          <Route path='/AboutUs' element={<AboutUs/>} />
          {login ? <Route path='/Posts' element={<Posts/>}/>: <Route/>}
          {login ? <Route path='/CreatePost' element={<CreatePost/>}/>: <Route/>}
          {login? <Route path='/CreatedSuccessfuly' element={<RedirectingPage/>}/> : <Route/>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path='/Dashboard' element={<Dashboard/>} /> : <></>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path='/SearchUser' element={<SearchPage/>} /> : <></>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path='/AllUser' element={<AllUser/>} /> : <></>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path={`/user/${userId}`} element={<User/>} /> : <></>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path={`/AllDonations`} element={<AllDonations/>} /> : <></>}
          {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <Route path={`/SearchDonation`} element={<DonationSearchPage/>} /> : <></>}

        </Routes>
        <Footer/>
      </BrowserRouter>
    </ProjectIdContext.Provider>
    </>
  );
}

export default App;
