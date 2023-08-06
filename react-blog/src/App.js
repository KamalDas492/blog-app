
import Home from "./Pages/Home/Home.jsx";
import CategoryPosts from "./components/CategoryPosts/CategoryPosts.jsx";
import Single from "./Pages/single/Single.jsx"
import Write from "./Pages/Write/Write.jsx";
import Settings from "./Pages/settings/Settings.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import SearchPosts from "./components/SearchPosts/SearchPosts.jsx"
import NotFound from "./Pages/NotFound/NotFound.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MyPosts from "./components/MyPosts/MyPosts.jsx";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route  path='/register' element={<Register />}></Route>
        <Route  path='/login' element={<Login />}></Route>
        <Route  path='/settings/:id' element={<Settings />}></Route>
        <Route  path='/myposts' element={<MyPosts />}></Route>
        <Route  path='/write' element={<Write obj = "newPost"/>}></Route>
        <Route  path='/editpost/:id' element={<Write obj = "editPost"/>}></Route>
        <Route  path='/posts/:id' element={<Single />}></Route>
        <Route  path='/category/:cat' element={<CategoryPosts />}></Route>
        <Route  path='/posts/search' element={<SearchPosts />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </Router>
  );
}

export default App;
