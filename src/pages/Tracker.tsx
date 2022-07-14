import { Button, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

interface Props {
	todoapi: string;
}
interface todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

const Blog = ({ todoapi }: Props) => {
	const [todos, setTodos] = useState<todo[]>([]);
	const [completed, setCompleted] = useState<todo[]>([]);
	const [ongoing, setOngoing] = useState<todo[]>([]);

	let total = todos.length;
	let active = 0;
	for (let index = 0; index < todos.length; index++) {
		if (todos[index].completed === false) {
			active++;
		}
	}
	let inactive = total - active;

	let message = '';
	if (inactive > 1) {
		message = `Good job! You've completed ${inactive} focuses today.`;
	} else if (inactive > 0) {
		message = `Good job! You've completed ${inactive} focus today.`;
	} else {
		message = `It is a new and exciting day, let's do something!`;
	}

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
		setCompleted(todos.filter((todo) => todo.completed === true));
		setOngoing(todos.filter((todo) => todo.completed === false));
	}, [todos]);

	console.log(todos);

	console.log(completed);

	return (
		<div>
			<h1 className="pagetext">
				Total Focuses: {total} <br />
				Active Focuses: {active} <br />
				{message}
				{total === 0 && (
					<>
						<br />
						<Button
							component={Link}
							to="/todo"
							sx={{
								':hover': {
									bgcolor: 'rgba(255, 255, 255, 0.2)',
									color: 'white',
								},
								backgroundColor: 'rgba(255, 255, 255, 0)',
								color: 'white',
								fontFamily: 'Oxygen',
							}}
							variant="contained"
						>
							Add a Focus
						</Button>
					</>
				)}
			</h1>
			<div className="container">
				<div className="uncompleteddiv">
					<h1 className="pagetext">Ongoing</h1>
					<ul>
						{ongoing.map((ongoing) => {
							return (
								<li className="pagetext" style={{ listStyle: 'number' }}>
									<h1>
										{ongoing.title}{' '}
										<Button
											sx={{
												':hover': {
													bgcolor: 'rgba(255, 255, 255, 0.2)',
													color: 'white',
												},
												backgroundColor: 'rgba(255, 255, 255, 0)',
												color: 'white',
												fontFamily: 'Oxygen',
											}}
											variant="contained"
											component={Link}
											to={`/todo/${ongoing.id}`}
										>
											<Tooltip title="Pomodoro Timer">
												<AccessAlarmIcon />
											</Tooltip>
										</Button>
									</h1>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="completeddiv">
					<h1 className="pagetext">Completed</h1>
					<ul>
						{completed.map((completed) => {
							return (
								<li className="pagetext" style={{ listStyle: 'number' }}>
									<h1>
										<s>{completed.title} </s>
									</h1>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Blog;
