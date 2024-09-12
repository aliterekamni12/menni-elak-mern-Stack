import './App.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom'; 
import Header from './component/Header/Header';




function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          
          <Route path='/login' />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
