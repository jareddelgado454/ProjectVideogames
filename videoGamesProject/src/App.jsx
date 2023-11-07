
import './index.css'
import {Routes,Route} from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import Detail from './components/Detail';

function App() {

  return (
      <div className='divApp'>
          <Routes>
              <Route path='/' element={<Landingpage/>}/>
              <Route path='/home' element={<Home/>} />
              <Route path='/createVideogame' element={<CreateVideogame/>} />
              <Route path='/detail/:id' element={<Detail/>} />
          </Routes> 
      </div>
  )
}

export default App
