import { Login } from '@mui/icons-material';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Register from './pages/Register';
import Tells from './pages/Tells';
import ToDo from './pages/ToDo';
import ToDoPage from './pages/ToDoPage';

const local = 'http://localhost:8000/api/'
const heroku = 'https://producthief-backend.herokuapp.com/api/'
const todoapi = local + 'todos/'
const tellsapi = local + 'tells/'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/todo' element={<ToDo todoapi={todoapi} />} />
          <Route path='/todo/:id' element={<ToDoPage todoapi={todoapi} />}/>
          <Route path='/tells' element={<Tells tellsapi={tellsapi} />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
