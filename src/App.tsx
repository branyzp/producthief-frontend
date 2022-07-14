import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SettingsContext from './components/SettingsContext';
import Tracker from './pages/Tracker';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Tells from './pages/Tells';
import ToDo from './pages/ToDo';
import ToDoPage from './pages/ToDoPage';

const local = 'http://localhost:8000/api/';
const heroku = 'https://producthief-backend.herokuapp.com/api/';
const api = local; //edit this to change local to heroku
const todoapi = api + 'todos/';
const tellsapi = api + 'tells/';

interface todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

function App() {
	const [workMins, setWorkMins] = useState(45);
	const [breakMins, setBreakMins] = useState(15);
	const [todos, setTodos] = useState<todo[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			await axios({
				method: 'get',
				url: todoapi,
			})
				.then((res) => setTodos(res.data))
				.catch((err) => console.log(err));
		};
		fetchData();
	}, []);

	let focuslength = todos.length;

	return (
		<div className="App">
			<SettingsContext.Provider
				value={{
					workMins: workMins,
					breakMins: breakMins,
					setWorkMins,
					setBreakMins,
				}}
			>
				<BrowserRouter>
					<NavBar focuslength={focuslength} />
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/todo" element={<ToDo todoapi={todoapi} />} />
						<Route path="/todo/:id" element={<ToDoPage todoapi={todoapi} />} />
						<Route path="/tells" element={<Tells tellsapi={tellsapi} />} />
						<Route path="/Tracker" element={<Tracker todoapi={todoapi} />} />
					</Routes>
				</BrowserRouter>
			</SettingsContext.Provider>
		</div>
	);
}

export default App;
