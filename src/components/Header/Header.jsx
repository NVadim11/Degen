import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import face from '../../img/tigran_circle.webp';
import {
	useGetLeaderboardMutation,
	useGetDashboardMutation,
} from '../../services/phpService';
import { Switch, FormControlLabel } from '@mui/material';
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

	// Localisation
	const { t, i18n } = useTranslation();

	// Retrieve the initial language from localStorage or default to 'en'
	const initLanguage = localStorage.getItem('language') || 'ru';
	const [language, setLanguage] = useState(initLanguage);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language, i18n]);

	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
		localStorage.setItem('language', language); // Save to localStorage
	};

	const toggleLanguage = () => {
		const newLanguage = language === 'ru' ? 'en' : 'ru';
		setLanguage(newLanguage);
		changeLanguage(newLanguage);
	};

	const toggleMenu = () => {
		setIsShown((prev) => !prev);
	};

	useEffect(() => {
		// Update i18n language when user.language_code changes
		changeLanguage(language);
	}, [language]);

	const handleTGUrl = () => {
		let url;
		if (initLanguage === 'ru') {
			url = 'https://t.me/TigerCash_ru';
		} else if (initLanguage === 'en') {
			url = 'https://t.me/TigerCashChannel';
		}
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
				<div className='header__logo'>
					<img src={face} alt='Tiger-logo' />
				</div>
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
						{t('menuBtn')}
						<Icons.menuBtn />
					</button>
					{isShown && (
						<div className='header__menu' ref={menuRef}>
							<a className='header__menu-links' onClick={getLeaderboardBtn}>
								{t('menuLeaderboard')}
								<Icons.Leaderboard />
							</a>
							<a
								className='header__menu-links'
								onClick={inviteFriendsBtn}
								rel='noopener noreferrer'
							>
								{t('menuReferral')}
								<Icons.Referral />
							</a>
							<a
								className='header__menu-links'
								onClick={getDashboardBtn}
								rel='noopener noreferrer'
							>
								{t('menuDashboard')}
								<Icons.Dashboard />
							</a>
							<div className='header__menu-toggle'>
								<FormControlLabel
									label={
										<span
											style={{
												fontSize: '24px',
												fontWeight: '400',
												fontFamily: 'Oswald',
												textTransform: 'uppercase',
											}}
										>
											{language === 'ru' ? 'Switch to English' : 'Врубить Русский'}
										</span>
									}
									labelPlacement='start'
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										width: '100%',
										border: '1px solid #172610',
										borderRadius: '10px',
										padding: '16px 16px 16px 24px',
										height: '56px',
										fontWeight: '400',
										lineHeight: '100%',
										letterSpacing: '0.02em',
										color: 'var(--mainColor)',
										margin: '0',
									}}
									control={
										<Switch
											checked={language !== 'ru'}
											onChange={toggleLanguage}
											sx={{
												'& .MuiSwitch-switchBase.Mui-checked': {
													color: 'green',
												},
												'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
													backgroundColor: 'green',
												},
											}}
										/>
									}
								/>
							</div>
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
								<h4>{t('referralTitle')}</h4>
							</div>
							<div className='popupInvite__refInfo'>
								<div className='popupInvite__refInfo-box'>
									<p>{t('refBonus')}</p>
									<div className='popupInvite__refInfo-item'>
										<span>10 %</span>
									</div>
								</div>
								{totalReferrals >= 0 && (
									<div className='popupInvite__refInfo-box'>
										<p> {t('refCount')}</p>
										<div className='popupInvite__refInfo-item'>
											<span>{totalReferrals}</span>
										</div>
									</div>
								)}
							</div>
							<div className='popupInvite__header'>
								<h6> {t('refHowTo')}</h6>
							</div>
							<div className='popupInvite__grid'>
								<ul className='popupInvite__grid-list'>
									<li className='popupInvite__list-item'>
										<Icons.Invite />
										<div className='popupInvite__list-itemDescr'>
											<h4>{t('refInvite')}</h4>
											<p> {t('refInviteDescr')}</p>
										</div>
									</li>
									<li className='popupInvite__list-item'>
										<Icons.Reward />
										<div className='popupInvite__list-itemDescr'>
											<h4>{t('refRewards')}</h4>
											<p>{t('refRewardsDescr')}</p>
										</div>
									</li>
								</ul>
							</div>
							<div className='popupInvite__item-box'>
								<div className='popupInvite__item-group'>
									<p>{t('refLink')}</p>
									<p className='popupInvite__input'>
										{generatedUrl.length ? `${generatedUrl}` : `${t('refLinkDescr')}`}
										<button onClick={copyToClipboard} className='popupInvite__input-btn'>
											<Icons.Copy />
										</button>
										{copied && <span className='copied-message'>{t('refLinkCopy')}</span>}
									</p>
								</div>
								<div className='popupInvite__item-group'>
									<button
										className='popupInvite__submit'
										onClick={() => generateUrl(user)}
									>
										{t('refLinkBtn')}
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
								<Icons.Crown />
								<h4> {t('leaderboardTitle')}</h4>
								<button
									onClick={сloseToggler}
									type='button'
									className='popupInvite__close'
								>
									<Icons.Close />
								</button>
							</div>
							<div className='popupLeaderboard__playerList'>
								<ul className='popupLeaderboard__table'>
									{leaderboardData.map((player, index) => {
										const isCurrentUser = player.username === user.username;
										const isTopThree = index < 2;
										return (
											<li
												className={`popupLeaderboard__tableItem ${
													isCurrentUser && !isTopThree ? 'highlight' : ''
												}`}
												key={index}
											>
												<div className='popupLeaderboard__itemData'>
													<div className='popupLeaderboard__id'>
														<Icons.playerID />
														<span>{player.position}</span>
													</div>
													<div className='popupLeaderboard__playerName'>
														<span>
															{player.username ?? 'anonymous'}
														</span>
													</div>
													<div className='popupLeaderboard__coins'>
														<span>{player.wallet_balance}</span>
													</div>
												</div>
											</li>
										);
									})}
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
								<h4> {t('dashboardTitle')}</h4>
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
