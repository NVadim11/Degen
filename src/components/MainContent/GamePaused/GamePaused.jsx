import React, { useEffect, useState } from 'react';
import deganTired from '../../../img/DChef_paused.webp';
import deganCoin from '../../../img/deganCoin.webp';

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
				<div className='mainContent__totalCoinsBox'>
					<div className='mainContent__totalCoinsImg' draggable='false'>
						<img src={deganCoin} draggable='false' />
					</div>
					{user !== null && (
						<div className='mainContent__totalCoinsAmount'>
							<span>{user?.wallet_balance}</span>
						</div>
					)}
				</div>
			</div>
			{timeRemaining ? (
				<h4 style={{ marginBottom: '10px', marginTop: '20px' }}>
					gamePauseTitle {formatTime(timeRemaining)} gamePauseMinutes
				</h4>
			) : (
				<h4 style={{ marginBottom: '10px', marginTop: '20px' }}>gamePauseCalc</h4>
			)}
			<div className='mainContent__imageContainer'>
				<img src={deganTired} draggable='false' alt='Tiger Chill' />
			</div>
			<p style={{ marginTop: '20px' }}>gamePauseDescr</p>
		</div>
	);
};

export default GamePaused;
