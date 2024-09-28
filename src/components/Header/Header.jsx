import React, { useEffect, useRef, useState } from 'react';
import deganCoin from '../../img/deganCoin.webp';
import altBgWave from '../../img/altBgWave.webp';
import { useGetLeaderboardMutation } from '../../services/phpService';
import './Header.scss';
import Icons from '../Common/IconsComponent.jsx';
import { closeToggler } from '../../helpers/closeBtn';

const Header = ({ user }) => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
	const [getLeaderboard] = useGetLeaderboardMutation();

	const popupClsTgl = isLeaderboardOpen ? 'popupLeaderboard_show' : null;
	const popupClasses = `popupLeaderboard ${popupClsTgl}`;

	const containerRef = useRef(null);

	const tg = window.Telegram.WebApp;

	const getLeaderboardBtn = () => {
		const fetchData = async () => {
			if (Object.keys(user).length) {
				const res = await getLeaderboard(user.id_telegram).unwrap();
				setLeaderboardData(res);
			}
		};
		fetchData();

		fadeShow();
		setTimeout(() => {
			setLeaderboardOpen(true);
		}, 250);
	};

	const fadeShow = () => {
		const htmlTag = document.getElementById('html');
		const headerTag = document.getElementById('header');
		const mainTag = document.getElementById('main');
		const footerTag = document.getElementById('footer');
		if (htmlTag) htmlTag.classList.add('popupLeaderboard-show');
		if (headerTag) headerTag.classList.add('show-blur');
		if (mainTag) mainTag.classList.add('show-blur');
		if (footerTag) footerTag.classList.add('show-blur');
	};

	const сloseToggler = () => {
		setLeaderboardOpen(false);
		const htmlTag = document.getElementById('html');
		if (htmlTag) htmlTag.classList.remove('popupLeaderboard-show');
		const headerTag = document.getElementById('header');
		const mainTag = document.getElementById('main');
		const bgTag = document.getElementById('bgImage');
		const footerTag = document.getElementById('footer');
		if (headerTag) headerTag.classList.remove('show-blur');
		if (mainTag) mainTag.classList.remove('show-blur');
		if (bgTag) bgTag.classList.remove('h100');
		if (footerTag) footerTag.classList.remove('show-blur');
	};

	return (
		<>
			<header id='header' className='header'>
				<div className='header__btn-group'>
					<button
						className='header__menuBtn'
						ref={containerRef}
						onClick={getLeaderboardBtn}
					>
						<Icons.menuBtn />
					</button>
					<label
						style={{
							position: 'absolute',
							top: '76px',
							right: '16px',
						}}
						htmlFor='header__menuBtn'
					>
						Rating
					</label>
				</div>
			</header>
			{isLeaderboardOpen && (
				<div id='leaderboard' aria-hidden='true' className={popupClasses}>
					<div className='popupLeaderboard__wrapper'>
						<div className='popupLeaderboard__content'>
							<div className='popupLeaderboard__title'>
								<h4>leaderboard</h4>
								<button
									onClick={сloseToggler}
									type='button'
									className='popupLeaderboard__close'
								>
									<Icons.Close />
								</button>
							</div>
							<div className='popupLeaderboard__playerList'>
								<ul className='popupLeaderboard__table'>
									{/* {leaderboardData.map((player, index) => {
										const isCurrentUser = player.username === user.username;
										const isTopThree = index < 2; */}
									{/* return ( */}
									{/* <li
										className={`popupLeaderboard__tableItem ${
											isCurrentUser && !isTopThree ? 'highlight' : ''
										}`}
										key={index}
									> */}
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>1</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>2</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>3</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									<li className='popupLeaderboard__tableItem'>
										<div className='popupLeaderboard__itemData'>
											<div className='popupLeaderboard__id'>
												<Icons.playerID />
												{/* <span>{player.position ?? 123123}</span> */}
												<span>4</span>
											</div>
											<div className='popupLeaderboard__playerName'>
												{/* <span>{player.username ?? 'anonymous'}</span> */}
												<span>anonymous</span>
											</div>
											<div className='popupLeaderboard__coins'>
												{/* <span>{player.wallet_balance ?? 123123}</span> */}
												<span>123123</span> <img src={deganCoin} alt='Degan Coin Icon' />
											</div>
										</div>
									</li>
									{/* ); */}
									{/* })} */}
								</ul>
							</div>
						</div>
					</div>
					<div className='wave'>
						<img src={altBgWave} alt='background wave' />
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
