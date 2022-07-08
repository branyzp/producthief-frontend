import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Tells from './pages/Tells';
import ToDo from './pages/ToDo';
import ToDoPage from './pages/ToDoPage';

const local = 'http://localhost:8000/api/todos/'
const heroku = 'https://producthief-backend.herokuapp.com/api/todos/'
const todoapi = heroku;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/todo' element={<ToDo todoapi={todoapi} />} />
          <Route path='/todo/:id' element={<ToDoPage todoapi={todoapi} />}/>
          <Route path='/tells' element={<Tells />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
