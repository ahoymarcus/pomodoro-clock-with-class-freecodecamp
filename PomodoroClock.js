import React, { useState, useEffect, useRef } from 'react';

import Nav from './Nav';
import Footer from './Footer';


/*
	<audio
		id="beep"
		preload="auto"
		src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
	/>
*/

const  audio = document.getElementById('beep'); 


class PomodoroClock extends React.Component {
	constructor (props) {
		super(props);
		this.loop = undefined;	
		
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			timerType: 'Session',
			timer: 1500,
			loop: undefined,
			isActive: false
		}
	}
	
	componentWillUnmount() {
		clearInterval(this.loop);
	}
	
		
	addBreak = () => {
		const { breakLength } = this.state;
		
		if (breakLength < 60) {
			this.setState({
				breakLength: breakLength + 1
			});
		}
	}
	subtractBreak = () => {
		const { breakLength } = this.state;
		
		if (breakLength > 1) {
			this.setState({
				breakLength: breakLength - 1
			});
		}
	}	
	
	addSession = () => {
		const { sessionLength, timer } = this.state;
		
		if (sessionLength < 60) {
			this.setState({
				sessionLength: sessionLength + 1,
				timer: (sessionLength + 1) * 60
			});
		}
	}
	subtractSession = () => {
		const { sessionLength, timer } = this.state;
		
		if (sessionLength > 1) {
			this.setState({
				sessionLength: sessionLength - 1,
				timer: (sessionLength - 1) * 60
			});
		}
	}
	
	setClock = (timer) => {
		let minutes = Math.floor(timer / 60);
		let seconds = timer % 60;
		
		minutes = minutes < 10 ? ('0' + minutes) : minutes;
		seconds = seconds < 10 ? ('0' + seconds) : seconds;
		
		return `${minutes}:${seconds}`;
	}
	
	handlePlayPause = () => {
		const { isActive } = this.state;
		
		if (isActive) {
			clearInterval(this.loop);
			this.setState({
				isActive: false
			});
		} else {
			this.setState({
				isActive: true
			});
			this.loop = setInterval(() => {
				const { timer, timerType, sessionLength, breakLength } = this.state;
				
				if (timer === 0) {
					this.setState({
						timerType: (timerType === 'Session') ? 'Break' : 'Session',
						timer: (timerType === 'Session') ? (breakLength * 60) : (sessionLength * 60)
					});
					
					audio.play();
				} else {
					this.setState({
						timer: timer - 1
					});
				} 
				
			}, 1000);
		}
	}
	
	handleReset = () => {
		this.setState({	
			breakLength: 5,
			sessionLength: 25,
			timerType: 'Session',
			timer: 1500,
			isActive: false
		});
		
		clearInterval(this.loop);
		
		/*
			Pausing and Rewinding audio... 
		*/
		audio.pause();
		audio.currentTime = 0;
	}
	
	
	render () {
		const { 
			breakLength, 
			sessionLength, 
			timerType, 
			timer 
		} = this.state;
		
		
		return (
			<div>
				<header>
					<Nav />
				</header>
				
				<main>
					<h1>25 + 5 Clock</h1>
					<div class="time-setting">
						<div>
							<p id="break-label" class="break-label">Break Length</p>
							<div class="time-control">
								<button id="break-decrement" onClick={this.subtractBreak}>-</button>
								<span id="break-length"> {breakLength} </span>
								<button id="break-increment" onClick={this.addBreak}>+</button>
							</div>
						</div>
						<div>
							<p id="session-label" class="session-label">Session Length</p>
							<div class="time-control">
								<button id="session-decrement" onClick={this.subtractSession}>-</button>
								<span id="session-length"> {sessionLength} </span>
								<button id="session-increment" onClick={this.addSession}>+</button>
							</div>
						</div>
					</div>
					<div class="clock">
						<h2 id="timer-label">{timerType}</h2>
						<p id="time-left">{this.setClock(timer)}</p>
					</div>
					<div class="clock-controls">
						<button id="start_stop" onClick={this.handlePlayPause}>Play/Stop</button>
						<button id="reset" onClick={this.handleReset}>Restart</button>
					</div>
				</main>
				
				
				
				<Footer />
			</div>
		);
	};
};


export default PomodoroClock



