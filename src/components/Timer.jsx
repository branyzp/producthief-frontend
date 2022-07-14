import { Button } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import {
	CircularProgressbar,
	buildStyles,
	CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import { useState } from 'react';
import ReactSlider from 'react-slider';
import SettingsContext from './SettingsContext';

const Timer = () => {
	const settingsInfo = useContext(SettingsContext);
	const [isPaused, setIsPaused] = useState(true);
	const [mode, setMode] = useState('work');
	const [secondsLeft, setSecondsLeft] = useState(0);

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);
	const audioRef = useRef();

	const bellSoundUrl =
		'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3';

	function tick() {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	}

	function initTimer() {
		setSecondsLeft(settingsInfo.workMins * 60);
	}

	useEffect(() => {
		// initTimer();

		function switchMode() {
			audioRef.current.play();
			const nextMode = modeRef.current === 'work' ? 'break' : 'work';
			const nextSeconds =
				nextMode === 'work'
					? settingsInfo.workMins * 60
					: settingsInfo.breakMins * 60;

			setMode(nextMode);
			modeRef.current = nextMode;

			setSecondsLeft(nextSeconds);
			secondsLeftRef.current = nextSeconds;
		}

		secondsLeftRef.current = settingsInfo.workMins * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval = setInterval(() => {
			if (isPausedRef.current) {
				return;
			}
			if (secondsLeftRef.current === 0) {
				return switchMode();
			}
			tick();
		}, 1000);

		return () => clearInterval(interval);
	}, [settingsInfo]);

	console.log(settingsInfo);

	const totalSeconds =
		mode === 'work' ? settingsInfo.workMins * 60 : settingsInfo.breakMins * 60;
	const percentage = Math.round((secondsLeft / totalSeconds) * 100);
	const minutes = Math.floor(secondsLeft / 60);
	let seconds = secondsLeft % 60;
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	console.log('total', totalSeconds);
	console.log('secondsleft', secondsLeft);
	console.log('percentage', percentage);
	console.log('mode', mode);

	if (isPaused && secondsLeft === totalSeconds) {
		document.title = 'Producthief';
	} else if (isPaused) {
		document.title = 'timer paused';
	} else {
		const timerLabel = `${mode} - ${minutes}:${seconds}`;
		document.title = timerLabel;
	}

	return (
		<div className="timerdiv">
			<CircularProgressbarWithChildren
				value={percentage}
				text={minutes + ':' + seconds}
				strokeWidth={5}
				styles={buildStyles({
					strokeLinecap: 'butt',
					textColor: 'rgba(255, 255, 255, 0.8)',
					trailColor: 'rgba(255, 255, 255, 0)',
					pathColor: 'rgba(255, 255, 255, 0.6)',
				})}
			>
				<div>
					<div>
						<label className="pagetext">
							<b>Work (mins): {settingsInfo.workMins}</b>
						</label>
						<ReactSlider
							className="slider"
							thumbClassName="thumb"
							trackClassName="track"
							value={settingsInfo.workMins}
							min={1}
							max={120}
							onChange={(newValue) => settingsInfo.setWorkMins(newValue)}
						/>
						<label className="pagetext">
							<b>Break (mins): {settingsInfo.breakMins}</b>
						</label>
						<ReactSlider
							className="slider"
							thumbClassName="thumb"
							trackClassName="track"
							value={settingsInfo.breakMins}
							min={1}
							max={20}
							onChange={(newValue) => settingsInfo.setBreakMins(newValue)}
						/>
					</div>

					<h1 className="pagetext" style={{ marginTop: 150 }}>
						mode: {mode} <br /> <br />
						{isPaused ? (
							<Button
								sx={{
									':hover': {
										bgcolor: 'black',
										color: 'white',
									},
									backgroundColor: 'white',
									color: 'black',
									fontFamily: 'Oxygen',
									marginRight: '20px',
								}}
								onClick={() => {
									setIsPaused(false);
									isPausedRef.current = false;
								}}
							>
								<PlayCircleIcon />
							</Button>
						) : (
							<Button
								sx={{
									':hover': {
										bgcolor: 'black',
										color: 'white',
									},
									backgroundColor: 'white',
									color: 'black',
									fontFamily: 'Oxygen',
									marginRight: '20px',
								}}
								onClick={() => {
									setIsPaused(true);
									isPausedRef.current = true;
								}}
							>
								<PauseCircleIcon />
							</Button>
						)}
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
							onClick={() => {
								secondsLeftRef.current = settingsInfo.workMins * 60;
								setSecondsLeft(secondsLeftRef.current);
							}}
						>
							<ReplayIcon />
						</Button>
					</h1>
				</div>
			</CircularProgressbarWithChildren>

			{/* <label className="pagetext">Work (mins): {settingsInfo.workMins}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={settingsInfo.workMins}
				min={1}
				max={120}
				onChange={(newValue) => settingsInfo.setWorkMins(newValue)}
			/>
			<label className="pagetext">Break (mins): {settingsInfo.breakMins}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={settingsInfo.breakMins}
				min={1}
				max={20}
				onChange={(newValue) => settingsInfo.setBreakMins(newValue)}
			/> */}

			{/* {isPaused ? (
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
					onClick={() => {
						setIsPaused(false);
						isPausedRef.current = false;
					}}
				>
					<PlayCircleIcon />
				</Button>
			) : (
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
					onClick={() => {
						setIsPaused(true);
						isPausedRef.current = true;
					}}
				>
					<PauseCircleIcon />
				</Button>
			)}

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
				onClick={() => {
					secondsLeftRef.current = settingsInfo.workMins * 60;
					setSecondsLeft(secondsLeftRef.current);
				}}
			>
				<ReplayIcon />
			</Button> */}
			<audio id="beep" src={bellSoundUrl} ref={audioRef} preload="auto" />
		</div>
	);
};

export default Timer;
