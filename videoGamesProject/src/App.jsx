
import './index.css'
import {Routes,Route, useLocation} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateVideogame from './components/CreateVideogame';
import Detail from './components/Detail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import About from './components/About';

function App() {
    const {pathname} = useLocation();
  return (
      <div className='divApp'>
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
          {
            pathname != '/' && <NavBar/>
          }
          <Routes>
              <Route path='/' element={<Landingpage/>}/>
              <Route path='/home' element={<Home/>} />
              <Route path='/createVideogame' element={<CreateVideogame/>} />
              <Route path='/detail/:id' element={<Detail/>} />
              <Route path='/reviews' element={<Reviews/>} />
              <Route path='/about' element={<About/>} />
          </Routes> 
          {
            pathname != '/' && <Footer/>
          }
      </div>
  )
}

export default App
