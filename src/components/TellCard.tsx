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

interface Props {
	id: number;
	goal: string;
	steps: string;
	created_date: string;
}

export default function TellCard({ id, goal, steps, created_date }: Props) {
	return (
		<div>
			<h1 className="pagetext">{goal}</h1>
		</div>
	);
}
