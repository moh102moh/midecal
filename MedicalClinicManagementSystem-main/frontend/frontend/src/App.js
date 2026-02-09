import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AddAppointment from './pages/AddAppointment.jsx';
import AddDoctor from './pages/AddDoctor.jsx';
import AllDoctors from './pages/AllDoctors.jsx';
import DoctorDetails from './pages/DoctorDetails.jsx';
import MyAppointment from './pages/MyAppointment.jsx';

function App() {
  return (
    <>
      <div/>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/addAppointment' element={<AddAppointment/>}/>
          <Route path='/addDoctor' element={<AddDoctor/>}/>
          <Route path='/allDoctors' element={<AllDoctors/>}/>
          <Route path='/doctor/:id' element={<DoctorDetails/>}/>
          <Route path='/my-appointment' element={<MyAppointment/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;