
import Home from "./Pages/Home/Home.jsx";

import Single from "./Pages/single/Single.jsx"
import Write from "./Pages/Write/Write.jsx";
import Settings from "./Pages/settings/Settings.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
 
  return (
    <Router>
      
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route  path='/register' element={<Register />}></Route>
        <Route  path='/login' element={<Login />}></Route>
        <Route  path='/settings/:id' element={<Settings />}></Route>
        <Route  path='/write' element={<Write />}></Route>
        <Route  path='/posts/:id' element={<Single />}></Route>
      </Routes>
      
    </Router>
  );
}

export default App;
