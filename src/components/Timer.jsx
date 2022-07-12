import { Button } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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

	// const totalSeconds =
	// 	mode === 'work'
	// 		? settingsInfo.workMinutes * 60
	// 		: settingsInfo.breakMinutes * 60;
	// const percentage = Math.round((secondsLeft / totalSeconds) * 100);

	// const minutes = Math.floor(secondsLeft / 60);
	// let seconds = secondsLeft % 60;
	// if (seconds < 10) seconds = '0' + seconds;

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

	return (
		<div className="timerdiv">
			<CircularProgressbar
				value={percentage}
				text={minutes + ':' + seconds}
				strokeWidth={5}
				styles={buildStyles({
					strokeLinecap: 'butt',
				})}
			/>

			<label>Work (mins): {settingsInfo.workMins}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={settingsInfo.workMins}
				min={1}
				max={120}
				onChange={(newValue) => settingsInfo.setWorkMins(newValue)}
			/>
			<label>Break (mins): {settingsInfo.breakMins}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={settingsInfo.breakMins}
				min={1}
				max={20}
				onChange={(newValue) => settingsInfo.setBreakMins(newValue)}
			/>

			{isPaused ? (
				<Button
					onClick={() => {
						setIsPaused(false);
						isPausedRef.current = false;
					}}
				>
					<PlayCircleIcon />
				</Button>
			) : (
				<Button
					onClick={() => {
						setIsPaused(true);
						isPausedRef.current = true;
					}}
				>
					<PauseCircleIcon />
				</Button>
			)}

			<Button
				onClick={() => {
					secondsLeftRef.current = settingsInfo.workMins * 60;
					setSecondsLeft(secondsLeftRef.current);
				}}
			>
				<ReplayIcon />
			</Button>
		</div>
	);
};

export default Timer;
