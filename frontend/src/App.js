// import logo from './logo.svg';
import './App.css';
import AddStudent from './pages/AddStudent';
import ViewStudent from './pages/ViewStudent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/addstudent' element={<AddStudent />}/>
      <Route path='/viewstudent' element={<ViewStudent/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
