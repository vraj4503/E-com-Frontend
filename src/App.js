
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import ProductAdd from './Components/ProductAdd';
import ProductNoti from './Components/ProductNoti';
import UserNoti from './Components/UserNoti';
import HomePage from './Components/HomePage';

function App() {
  return (
   <>
   <Router>
            <Routes>
                <Route path="/" element={<Register />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/addProduct" element={<ProductAdd/>} />
                <Route path="/notificationProduct" element={<ProductNoti/>} />
                <Route path="/notificationUser" element={<UserNoti/>} />
                
            </Routes>
        </Router>
   </>
  );
}

export default App;