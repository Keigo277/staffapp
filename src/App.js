import {createContext} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import  Room  from './others/Rooms';
// import './App.css';

function App() {
  const staffName = "店員"

 const shareData = createContext()

  return (
    <div className="App">
    <shareData.Provider value={staffName}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/others/Rooms' element={<Room/>}/>
        </Routes>
      </BrowserRouter>
     </shareData.Provider>
    </div>
  );
}

export default App;
