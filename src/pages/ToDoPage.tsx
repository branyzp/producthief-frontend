import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import Timer from '../components/Timer';

interface Props {
	todoapi: string;
}

interface todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

export default function ToDoPage({ todoapi }: Props) {
	const [todo, setTodo] = useState<any>([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			await axios({
				method: 'get',
				url: todoapi + id,
			})
				.then((res) => setTodo(res.data))
				.catch((err) => console.log(err));
		};

		fetchData();
	}, []);

	console.log(todo);

	return (
		<div className="div1">
			<div>
				<Timer />
			</div>
			<div>
				<h3 className="pagetext2">
					<span className="pagetext">{todo.title}</span>
				</h3>
				<h3 className="pagetext2">
					<span className="pagetext">{todo.description}</span>{' '}
				</h3>

				<Button
					component={Link}
					to={'/todo'}
					sx={{
						':hover': {
							bgcolor: 'black',
							color: 'white',
						},
						backgroundColor: 'white',
						color: 'black',
						fontFamily: 'Oxygen',
					}}
					variant="contained"
				>
					Back to Focus page
				</Button>
			</div>
		</div>
	);
}
