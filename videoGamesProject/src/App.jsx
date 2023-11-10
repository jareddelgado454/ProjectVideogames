
import './index.css'
import {Routes,Route, useLocation} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import Detail from './components/Detail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    const {pathname} = useLocation();
  return (
      <div className='divApp'>
          {
            pathname != '/' && <NavBar/>
          }
          <Routes>
              <Route path='/' element={<Landingpage/>}/>
              <Route path='/home' element={<Home/>} />
              <Route path='/createVideogame' element={<CreateVideogame/>} />
              <Route path='/detail/:id' element={<Detail/>} />
          </Routes> 
          {
            pathname != '/' && <Footer/>
          }
      </div>
  )
}

export default App
