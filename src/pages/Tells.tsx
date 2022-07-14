import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TellCard from '../components/TellCard';

interface Props {
	tellsapi: string;
}

interface tells {
	id: number;
	goal: string;
	steps: string;
	created_date: string;
}

const Tells = ({ tellsapi }: Props) => {
	const [tell, setTell] = useState<tells[]>([]);
	const [newGoal, setNewGoal] = useState<string>('');
	const [newStep, setNewStep] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			await axios({
				method: 'get',
				url: tellsapi,
			})
				.then((res) => setTell(res.data))
				.catch((err) => console.log(err));
		};
		fetchData();
	}, []);

	const handleAdd = () => {
		//update state of todos
		if (newGoal && newStep) {
			//send the POST request to update the backend
			axios
				.post(tellsapi, {
					goal: newGoal,
					steps: newStep,
				})
				.then((res) => setTell([...tell, res.data]))
				.catch((err) => console.log(err));

			//  handleScroll()
		} else {
			alert('Please fill in both "Goal" and "Steps"');
		}
	};

	console.log(tell);

	return (
		<div className="tellpage">
			<div className="newTellContainer">
				<input
					className="input_box"
					placeholder="what is your goal?"
					onChange={(e) => setNewGoal(e.target.value)}
				/>{' '}
				<br /> <br />
				<input
					className="input_box"
					placeholder="what are the steps you are taking to achieve it?"
					onChange={(e) => setNewStep(e.target.value)}
				/>{' '}
				<br /> <br />
				<Button
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
					className="input_submit"
					onClick={() => {
						handleAdd();
					}}
				>
					Add Tell
				</Button>
			</div>
			<div>
				<h1 className="pagetext">Your Tells</h1>
				{tell.map((tell) => {
					return (
						<TellCard
							id={tell.id}
							goal={tell.goal}
							steps={tell.steps}
							created_date={tell.created_date}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Tells;
