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



function App() {

  const [projectId, setProjectId] = useState("66e49c99a505cbd81392e178");
  const [login, isLogin] = useState(false)
  const[userData, setUserData] = useState();
 
  
  const ProjectIdValue = {projectId, setProjectId,login, isLogin, userData, setUserData}; 
  
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
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ProjectIdContext.Provider>
    </>
  );
}

export default App;
