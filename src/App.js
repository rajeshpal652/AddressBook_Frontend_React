

import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom'  
import AddressBookForm from './components/addressbook-form/addressbook-form'
import Home from './components/home/home'
import Mainpage from './components/pages/mainpage/Mainpage';
import Signup from './components/signup/Signup';

function App() {
  return (
<BrowserRouter>  
      <Routes>
      <Route path="/addcontact" element={<AddressBookForm />} ></Route> 
      <Route path="/home" element={<Home />}></Route>
      <Route path="/AddressBookForm/:id" element={<AddressBookForm />}></Route>

      <Route path="/" element={<Mainpage />}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
