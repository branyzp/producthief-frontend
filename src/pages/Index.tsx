import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
	return (
		<div>
			<>
				<h1 style={{ fontSize: 50 }} className="pagetext">
					<br />
					Welcome to Producthief. <br /> <br />
					Let's focus.
				</h1>

				<Button
					component={Link}
					to="/todo"
					sx={{
						':hover': {
							bgcolor: 'black',
							color: 'white',
						},
						backgroundColor: 'white',
						color: 'black',
						fontFamily: 'Oxygen',
						mr: '30px',
					}}
					variant="contained"
				>
					Find Your Focus
				</Button>
				<Button
					component={Link}
					to="/tracker"
					sx={{
						':hover': {
							bgcolor: 'black',
							color: 'white',
						},
						backgroundColor: 'white',
						color: 'black',
						fontFamily: 'Oxygen',
						mr: '30px',
					}}
					variant="contained"
				>
					Tracker
				</Button>
				<Button
					component={Link}
					to="/tells"
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
					Tell yourself something you'd like to achieve
				</Button>
			</>
		</div>
	);
};

export default Index;
