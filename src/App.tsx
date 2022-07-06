import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import ToDo from './pages/ToDo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/todo' element={<ToDo/> } />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
