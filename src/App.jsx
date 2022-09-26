import './App.css';
import { Route, Routes } from 'react-router-dom';
import Wrapper from './page/Wrapper/Wrapper';
import Home from './page/Home/Home';
import UpdateTask from './page/Task/UpdateTask/UpdateTask';
import AddTask from './page/Task/AddTask/AddTask';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Wrapper/>}>
        <Route index element={<Home/>}/>
        <Route path='/update/:id' element={<UpdateTask/>}/>
        <Route path='/add' element={<AddTask/>}/>
      </Route>
    </Routes>
  );
}

export default App;
