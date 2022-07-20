import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface tells {
	id: number;
	goal: string;
}

interface Props {
	id: number;
	goal: string;
	setTell: React.Dispatch<React.SetStateAction<tells[]>>;
	tell: tells[];
	tellsapi: string;
}

export default function TellCard({ id, goal, tellsapi, setTell, tell }: Props) {
	const handleDelete = (id: number) => {
		axios.delete(tellsapi + id);
		setTell(tell.filter((tells) => tells.id !== id));
	};

	return (
		<div>
			<h1 className="pagetext">
				{goal}
				<Tooltip title="Delete Tell">
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
						onClick={() => handleDelete(id)}
					>
						<DeleteIcon />
					</Button>
				</Tooltip>
			</h1>
		</div>
	);
}
