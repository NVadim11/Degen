import React, { useEffect, useState } from 'react';
import deganTired from '../../../img/DChef_paused.webp';
import deganCoin from '../../../img/deganCoin.webp';
import Icons from '../../Common/IconsComponent';

const GamePaused = ({ user, remainingTime }) => {
	const [timeRemaining, setTimeRemaining] = useState(remainingTime);

	useEffect(() => {
		setTimeRemaining(remainingTime);
	}, [remainingTime]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		return `${minutes}`;
	};

	return (
		<div className='mainContent__gamePaused'>
			<div className='mainContent__totalCoins'>
				<div className='mainContent__totalCoinsText'>
					<h4>Your Balance</h4>
				</div>
				<div className='mainContent__totalCoinsAmount' draggable='false'>
					<img src={deganCoin} draggable='false' />
					<span>123123</span>
				</div>
			</div>
			{!timeRemaining ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
						marginBottom: '10px',
						marginTop: '30px',
						gap: '10px',
					}}
				>
					<Icons.timerIcon />
					<h4 style={{ fontFamily: 'SFproReg' }}>
						Next session: {formatTime(timeRemaining)}
					</h4>
				</div>
			) : (
				<h4 style={{ marginBottom: '10px', marginTop: '20px' }}>Calculating...</h4>
			)}
			<div className='mainContent__imageContainer'>
				<img src={deganTired} draggable='false' alt='Tiger Chill' />
			</div>
		</div>
	);
};

export default GamePaused;
