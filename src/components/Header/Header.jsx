import React, { useEffect, useRef, useState } from 'react';
import deganCoin from '../../img/deganCoin.webp';
import {
	useGetLeaderboardMutation,
	useGetDashboardMutation,
} from '../../services/phpService';
import './Header.scss';
import DashboardModal from './DashboardModal/DashboardModal.jsx';
import Icons from '../Common/IconsComponent.jsx';

const Header = ({ user }) => {
	const [isShown, setIsShown] = useState(false);
	const [totalReferrals, setTotalReferrals] = useState(user?.referrals_count);
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [dashboardData, setDashboardData] = useState([]);
	const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
	const [isInviteOpen, setInviteOpen] = useState(false);
	const [isDashboardOpen, setDashboardOpen] = useState(false);
	const [getLeaderboard] = useGetLeaderboardMutation();
	const [getDashboard] = useGetDashboardMutation();
	const [generatedUrl, setGeneratedUrl] = useState('');
	const [copied, setCopied] = useState(false);

	const popupClsTgl = isLeaderboardOpen ? 'popupLeaderboard_show' : null;
	const popupClasses = `popupLeaderboard ${popupClsTgl}`;

	const popupInvTgl = isInviteOpen ? 'popupInvite_show' : null;
	const popupInvite = `popupInvite ${popupInvTgl}`;

	const popupDashTgl = isDashboardOpen ? 'popupDashboard_show' : null;
	const popupDashboard = `popupDashboard ${popupDashTgl}`;

	const containerRef = useRef(null);
	const menuRef = useRef(null);

	const tg = window.Telegram.WebApp;

	const toggleMenu = () => {
		setIsShown((prev) => !prev);
	};

	const handleTGUrl = () => {
		let url;
		url = 'https://t.me/TigerCashChannel';
		window.open(url, '_blank');
	};

	useEffect(() => {
		setTotalReferrals(user?.referrals_count);
	}, [user]);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (menuRef.current && menuRef.current.contains(event.target)) {
				return;
			}
			if (event.target.closest('.header__menuBtn')) return;
			setIsShown(false);
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	const getLeaderboardBtn = () => {
		const fetchData = async () => {
			if (Object.keys(user).length) {
				const res = await getLeaderboard(user.id_telegram).unwrap();
				setLeaderboardData(res);
			}
		};
		fetchData();

		fadeShow();
		setIsShown(false);
		setTimeout(() => {
			setLeaderboardOpen(true);
		}, 250);
	};

	const getDashboardBtn = () => {
		const fetchData = async () => {
			if (Object.keys(user).length) {
				const res = await getDashboard(user.id_telegram);
				setDashboardData(res);
			}
		};
		fetchData();
		fadeShow();
		setIsShown(false);
		setTimeout(() => {
			setDashboardOpen(true);
		}, 250);
	};

	const inviteFriendsBtn = () => {
		fadeShow();
		setIsShown(false);
		setTimeout(() => {
			setInviteOpen(true);
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
		setInviteOpen(false);
		setDashboardOpen(false);
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

	useEffect(() => {
		// Load the URL from localStorage on mount
		const storedUrl = localStorage.getItem('generatedUrl');
		if (storedUrl) {
			setGeneratedUrl(storedUrl);
		}
	}, []);

	const generateUrl = (user) => {
		if (user.id_telegram) {
			// const referralURL = `t.me/Tema_cash_bot/app?startapp=${user.id_telegram}`;
			const referralURL = `t.me/our_develepment_bot/app?startapp=${user.id_telegram}`;
			setGeneratedUrl(referralURL);
			localStorage.setItem('generatedUrl', referralURL);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(generatedUrl)
			.then(() => {
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	};

	return (
		<>
			<header id='header' className='header'>
				<div className='header__btn-group'>
					<div className='header__social-links'>
						<a className='header__social-link' onClick={handleTGUrl}>
							<Icons.TG />
						</a>
						<a
							className='header__social-link'
							onClick={() => {
								window.open('https://x.com/tema_cash', '_blank');
							}}
						>
							<Icons.X />
						</a>
					</div>
					<button className='header__menuBtn' ref={containerRef} onClick={toggleMenu}>
						menu
						<Icons.menuBtn />
					</button>
					{isShown && (
						<div className='header__menu' ref={menuRef}>
							<a className='header__menu-links' onClick={getLeaderboardBtn}>
								Leaderboard
								<Icons.Leaderboard />
							</a>
							<a
								className='header__menu-links'
								onClick={inviteFriendsBtn}
								rel='noopener noreferrer'
							>
								Referral
								<Icons.Referral />
							</a>
							<a
								className='header__menu-links'
								onClick={getDashboardBtn}
								rel='noopener noreferrer'
							>
								Dashboard
								<Icons.Dashboard />
							</a>
						</div>
					)}
				</div>
			</header>
			{isInviteOpen && (
				<div id='popupInvite' aria-hidden='true' className={popupInvite}>
					<div className='popupInvite__wrapper'>
						<div className='popupInvite__content'>
							<button onClick={сloseToggler} type='button' className='popupInvite__close'>
								<Icons.Close />
							</button>
							<div className='popupInvite__title'>
								<h4>invite friends. get rewards together</h4>
							</div>
							<div className='popupInvite__refInfo'>
								<div className='popupInvite__refInfo-box'>
									<p>Your Bonus</p>
									<div className='popupInvite__refInfo-coins'>
										<img src={deganCoin} alt='Degan Coin Icon' />
										<img src={deganCoin} alt='Degan Coin Icon' />
										<img src={deganCoin} alt='Degan Coin Icon' />
										<img src={deganCoin} alt='Degan Coin Icon' />
										<img src={deganCoin} alt='Degan Coin Icon' />
										<img src={deganCoin} alt='Degan Coin Icon' />
									</div>
									<div className='popupInvite__refInfo-item'>
										<span>10 %</span>
									</div>
								</div>
								{totalReferrals >= 0 && (
									<div className='popupInvite__refInfo-box'>
										<p> refCount</p>
										<div className='popupInvite__refInfo-item'>
											<span>{totalReferrals}</span>
										</div>
									</div>
								)}
							</div>
							<div className='popupInvite__grid'>
								<ul className='popupInvite__grid-list'>
									<li className='popupInvite__list-item'>
										<div className='popupInvite__list-itemDescr'>
											<h4>Invite</h4>
											<p> Friends via the referral link</p>
										</div>
									</li>
									<li className='popupInvite__list-item'>
										<div className='popupInvite__list-itemDescr'>
											<h4>Get rewards</h4>
											<p>Receive 10% of your friends staking</p>
										</div>
									</li>
								</ul>
							</div>
							<div className='popupInvite__item-box'>
								<div className='popupInvite__item-group'>
									<p>generate your link</p>
									<p className='popupInvite__input'>
										{generatedUrl.length ? `${generatedUrl}` : 'refLinkDescr'}
										<button onClick={copyToClipboard} className='popupInvite__input-btn'>
											<Icons.Copy />
										</button>
										{copied && <span className='copied-message'>Copied!</span>}
									</p>
								</div>
								<div className='popupInvite__item-group'>
									<button
										className='popupInvite__submit'
										onClick={() => generateUrl(user)}
									>
										generate
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
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
				</div>
			)}
			{isDashboardOpen && (
				<div id='popupDashboard' aria-hidden='true' className={popupDashboard}>
					<div className='popupDashboard__wrapper'>
						<div className='popupDashboard__content'>
							<button
								onClick={сloseToggler}
								type='button'
								className='popupDashboard__close'
							>
								<Icons.Close />
							</button>
							<div className='popupDashboard__title'>
								<h4> dashboardTitle</h4>
								<button
									onClick={сloseToggler}
									type='button'
									className='popupDashboard__close'
								>
									<Icons.Close />
								</button>
							</div>
							<DashboardModal dashboardData={dashboardData} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
