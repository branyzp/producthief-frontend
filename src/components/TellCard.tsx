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

interface tell {}

interface Props {
	id: number;
	goal: string;
	steps: string;
}

export default function TellCard({ id, goal, steps }: Props) {
	return (
		<Card
			className="TellCard"
			sx={{ maxWidth: 500, maxHeight: 345, borderRadius: '25px' }}
		>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					<h1>
						{goal} <br />
						{steps}
					</h1>
				</Typography>
			</CardContent>
		</Card>
	);
}
