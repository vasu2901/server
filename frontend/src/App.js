import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Signup from './components/Signup';
import Verify from './components/Verify';
import Main from './components/Main';
import { AdminHome } from './components/AdminHome';

import Home from './components/Home';
import Addbook from './components/Addbook';
import AddtoCart from './components/AddtoCart';
import NoteState from './Context/NoteState';
import UpdateStock from './components/UpdateStock';
import MyCart from './components/MyCart';
import MyPurchase from './components/MyPurchase';
import BuyBook from './components/BuyBook';
import SetReview from './components/SetReview';
import Deactivate from './components/Deactivate';
import { Reverify } from './components/Reverify';
function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login'element={<Login />} />
          <Route path='/signin'element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path='/verify'element={<Verify />} />
          <Route path='/adminhome' element={<AdminHome />} />
          <Route path='/userhome' element={<Home />} />
          <Route path="/addabook" element={<Addbook />} />
          <Route path="/addtocart" element={<AddtoCart />} />  
          <Route path="/updatestock" element={<UpdateStock />} />
          <Route path='/mycart' element={<MyCart />} />
          <Route path='/MyPurchases' element={<MyPurchase />} />
          <Route path='/buybooks' element={<BuyBook />} />
          <Route path='/setreview' element={<SetReview />} />
          <Route path='/deactivate' element={<Deactivate />} />
          <Route path='/reverify' element={<Reverify />} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
