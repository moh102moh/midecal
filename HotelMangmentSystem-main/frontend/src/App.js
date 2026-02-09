import Home from './pages/Home';
import{Routes , Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ViewRoom from './pages/viewRoom';
import AddRooms from './pages/AddRooms';
import AddBooking from './pages/addBooking';
import MyBooking from './pages/MyBooking';
import RoomDetails from './pages/RoomDetails';

function App() {
  return (
  <>
  <Navbar/>
 <Routes>
      <Route  path='/' element={<Home/>} />
       <Route path='/register' element = {<Register/>}/>
       <Route path='/login' element = {<Login/>}/>
       <Route path='/allRooms' element={<ViewRoom/>}/>
       <Route path = '/addRoom' element ={<AddRooms/>}/>
       <Route path='/addBooking' element={<AddBooking/>}/>
       <Route path='/myBooking' element = {<MyBooking/>}/>
       <Route path="/room-details/:id" element={<RoomDetails />} />
      </Routes>
  </>
     
  
  );
}

export default App;
