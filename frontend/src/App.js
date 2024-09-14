import './App.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom'; 
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Home from './Pages/Home/Home';

import ProjectPage from './Pages/Projects/ProjectPage';
import {  useState } from 'react';
import ProjectIdContext from './context';



function App() {

  const [projectId, setProjectId] = useState("66e49c99a505cbd81392e178")
  
  const ProjectIdValue = {projectId, setProjectId};

  return (
    <>
    <ProjectIdContext.Provider value={ProjectIdValue}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path={`/project/${projectId}`}  element={<ProjectPage/>} />
          <Route path='/login' />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ProjectIdContext.Provider>
    </>
  );
}

export default App;
