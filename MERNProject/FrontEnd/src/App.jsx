import CreatePage from "./Pages/CreatePage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Navbar from './components/Navbar.jsx';
import { Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div style={{height: 'auto', background: 'linear-gradient(to bottom, rgb(108, 117, 125), white)'}}>
      <ToastContainer position="bottom-center" autoClose={3000}/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
      </Routes>
    </div>
  );
}

export default App
