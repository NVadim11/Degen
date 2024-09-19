import bcrypt from 'bcryptjs';
import React, { useEffect, useState, useCallback } from 'react';
import {
	useChangeWalletMutation,
	usePassDailyMutation,
	usePassPartnersMutation,
	usePassTaskMutation,
	useSetWalletMutation,
} from '../../services/phpService';

// import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import { useTranslation } from 'react-i18next';
import tigerCoin from '../../img/tigranBoost.webp';
import Modal from '../Modal/Modal';
import './Footer.scss';
import Icons from '../Common/IconsComponent.jsx';

const Footer = ({ user }) => {
	const tg = window.Telegram.WebApp;
	const [tasksOpen, setTasksOpen] = useState(false);
	const [passTask] = usePassTaskMutation();
	const [setWallet] = useSetWalletMutation();
	const [changeWallet] = useChangeWalletMutation();
	const [activeTab, setActiveTab] = useState(0);
	const [passDaily] = usePassDailyMutation();
	const [passPartners] = usePassPartnersMutation();
	const [hasWalletAddress, setHasWalletAddress] = useState(false);

	const { t } = useTranslation();
	const initLanguage = localStorage.getItem('language');
	const [currLanguage, setCurrLanguage] = useState(initLanguage);

	const dailyTasksObj = user?.daily_quests;
	const [dailyQuests, setDailyQuests] = useState(dailyTasksObj);

	// Modal logic
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalText, setModalText] = useState('');
	const [modalType, setModalType] = useState('green'); // Default modal type
	const [buttonText, setButtonText] = useState('');

	// Fake timer
	const [twitterTaskStatus, setTwitterTaskStatus] = useState(user?.twitter || 0);
	const [chatTaskStatus, setChatTaskStatus] = useState(user?.tg_chat || 0);
	const [channelTaskStatus, setСhannelTaskStatus] = useState(user?.tg_channel || 0);
	const [websiteTaskStatus, setWebsiteTaskStatus] = useState(user?.website || 0);

	const [timerTwitter, setTwitterTimer] = useState(0);
	const [timerChat, setChatTimer] = useState(0);
	const [timerChannel, setChannelTimer] = useState(0);
	const [timerWebsite, setWebsiteTimer] = useState(0);

	// aws
	const secretKey = process.env.REACT_APP_SECRET_KEY;

	// const ton_address = useTonAddress(true);

	// wallet toggles
	const [walletVaL, setWalletVal] = useState('');
	const [inputFirst, setInputFirst] = useState(true);
	const [inputSecond, setInputSecond] = useState(false);
	const [walletInputDisabled, setWalletInputDisabled] = useState(false);

	const toggleFirst = () => {
		setInputFirst(true);
		setInputSecond(false);
	};

	const toggleSecond = () => {
		setInputFirst(false);
		setInputSecond(true);
	};

	useEffect(() => {
		if (!user?.wallet_address) {
			toggleFirst();
		} else {
			toggleSecond();
			setWalletVal(user?.wallet_address);
		}
	}, [user]);

	const resetWalletEnabler = () => {
		setWalletInputDisabled(false);
		setWalletVal('');
		toggleFirst();
	};

	const submitWallet = async () => {
		if (walletVaL) {
			try {
				const res = await setWallet({
					token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
					wallet_address: walletVaL,
					id_telegram: user?.id_telegram,
				}).unwrap();
				setWalletInputDisabled(true);
				openModal('green', `${t('modalWalletSubmitSucc')}`, `${t('modalReturn')}`);
				blurPopupTasks();
				toggleSecond();
			} catch (e) {
				openModal('red', `${t('modalWalletSubmitBusy')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		}
	};

	const resetWallet = async () => {
		if (walletVaL) {
			try {
				const res = await changeWallet({
					token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
					wallet_address: walletVaL,
					user_id: user?.id,
				}).unwrap();
				setWalletInputDisabled(true);
				openModal('green', `${t('modalWalletChangeSucc')}`, `${t('modalReturn')}`);
				blurPopupTasks();
				toggleSecond();
			} catch (e) {
				openModal('red', `${t('modalWalletChangeBusy')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		}
	};

	const walletSubmitHandler = () => {
		if (!user?.wallet_address) {
			submitWallet();
		} else {
			resetWallet();
		}
	};

	const openModal = (type, text, btnText) => {
		setModalType(type);
		setModalText(text);
		setButtonText(btnText);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		const popupTasks = document.getElementById('popupTasks');
		if (popupTasks) popupTasks.classList.remove('show-blur');
	};

	useEffect(() => {
		if (user) {
			setTwitterTaskStatus(user.twitter || 0);
			setChatTaskStatus(user.tg_chat || 0);
			setСhannelTaskStatus(user.tg_channel || 0);
			setWebsiteTaskStatus(user.website || 0);
			setPartnerTaskStatus(partnerTaskObj);
			setDailyQuests(dailyTasksObj);
		}
	}, [user]);

	const popupTasksTgl = tasksOpen ? 'popupTasks_show' : null;
	const popupTasks = `popupTasks ${popupTasksTgl}`;

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'UTC',
	};
	const now = new Date();
	const dateStringWithTime = now.toLocaleString('en-GB', options);

	const tasksBtn = () => {
		fadeShow();
		setTimeout(() => {
			setTasksOpen(true);
		}, 250);
	};

	const fadeShow = () => {
		const htmlTag = document.getElementById('html');
		const headerTag = document.getElementById('header');
		const mainTag = document.getElementById('main');
		const footerTag = document.getElementById('footer');
		const bgTag = document.getElementById('bgImage');
		if (htmlTag) htmlTag.classList.add('popupTasks-show');
		if (headerTag) headerTag.classList.add('show-blur');
		if (mainTag) mainTag.classList.add('show-blur');
		if (footerTag) footerTag.classList.add('show-blur');
		if (bgTag) bgTag.classList.add('h100');
	};

	const tasksCloseToggler = () => {
		setTasksOpen(false);
		const htmlTag = document.getElementById('html');
		const headerTag = document.getElementById('header');
		const mainTag = document.getElementById('main');
		const footerTag = document.getElementById('footer');
		const bgTag = document.getElementById('bgImage');
		if (htmlTag) htmlTag.classList.remove('popupTasks-show');
		if (headerTag) headerTag.classList.remove('show-blur');
		if (mainTag) mainTag.classList.remove('show-blur');
		if (footerTag) footerTag.classList.remove('show-blur');
		if (bgTag) bgTag.classList.remove('h100');
	};

	// Ton wallet handlers

	// const submitWallet = async () => {
	// 	if (ton_address) {
	// 		try {
	// 			const res = await setWallet({
	// 				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
	// 				wallet_address: ton_address,
	// 				id_telegram: user?.id_telegram,
	// 			}).unwrap();
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// };

	// const updateWallet = async () => {
	// 	if (ton_address) {
	// 		try {
	// 			const res = await changeWallet({
	// 				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
	// 				wallet_address: ton_address,
	// 				user_id: user?.id,
	// 			}).unwrap();
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	const handleWalletLogic = async () => {
	// 		if (ton_address) {
	// 			if (user?.wallet_address === null) {
	// 				await submitWallet();
	// 			} else if (
	// 				user?.wallet_address !== null &&
	// 				ton_address !== user?.wallet_address
	// 			) {
	// 				await updateWallet();
	// 			}
	// 		}
	// 	};

	// 	handleWalletLogic();
	// }, [ton_address, user]);

	const blurPopupTasks = () => {
		const popupTasks = document.getElementById('popupTasks');
		if (popupTasks) popupTasks.classList.add('show-blur');
		const footerTag = document.getElementById('footer');
		if (footerTag) footerTag.classList.add('show-blur');
	};

	const passDailyHandler = async (taskId, link) => {
		if (link !== null) {
			window.open(link, '_blank');
		}
		try {
			await passDaily({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				user_id: user?.id,
				daily_quest_id: taskId,
			}).unwrap();

			const res = { success: true };

			if (res.success) {
				// Update quest status to completed (status: 1)
				updateDailyQStatus(taskId, 1);
				openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			} else {
				openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		} catch (e) {
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};

	const updateDailyQStatus = (taskId, status) => {
		// Update the quest status in state
		setDailyQuests((prevQuests) =>
			prevQuests.map((quest) =>
				quest.id === taskId ? { ...quest, status: status } : quest
			)
		);
	};

	const partnerTaskObj = user?.partners_quests || [];
	const [partnerTaskStatus, setPartnerTaskStatus] = useState([]);
	const [timers, setTimers] = useState({});

	useEffect(() => {
		if (user) {
			setPartnerTaskStatus(
				partnerTaskObj.map((task) => ({
					...task,
					status: task.status || 0,
					timerStarted: false,
				}))
			);
		}
	}, [user, partnerTaskObj]);

	const partnerClick = (taskId, link) => {
		
		if (link) {
			window.open(link, '_blank');
		}
	
		setPartnerTaskStatus((prevStatus) => {
			const updatedStatus = prevStatus.map((task) => {
				if (task.id === taskId) {
					if (task.status === 0) {
						return { ...task, status: 2, timerStarted: true };
					} else {
						console.log(`Task ${taskId} status is not 0:`, task.status);
					}
				}
				return task;
			});
	
			return updatedStatus;
		});
	
		if (!timers[taskId]) {
			setTimers((prevTimers) => ({
				...prevTimers,
				[taskId]: 15, // Set to 15 seconds
			}));
		}
	};
	

	useEffect(() => {
		const timerIntervals = {};
		Object.keys(timers).forEach((taskId) => {
			if (timers[taskId] > 0) {
				timerIntervals[taskId] = setInterval(() => {
					setTimers((prevTimers) => {
						const updatedTimers = { ...prevTimers, [taskId]: prevTimers[taskId] - 1 };
						if (updatedTimers[taskId] === 0) {
							clearInterval(timerIntervals[taskId]);
						}
						return updatedTimers;
					});
				}, 1000);
			}
		});
		return () => {
			Object.values(timerIntervals).forEach(clearInterval);
		};
	}, [timers]);

	useEffect(() => {
		Object.keys(timers).forEach((taskId) => {
			if (timers[taskId] === 0) {
				setPartnerTaskStatus((prevStatus) => {
					const newStatus = prevStatus.map((task) => {
						if (task.id === taskId && task.status === 2) {
							return { ...task, status: 3 };
						}
						return task;
					});
					return newStatus;
				});
				setTimers((prevTimers) => {
					const { [taskId]: _, ...rest } = prevTimers;
					return rest;
				});
			}
		});
	}, [timers]);

	const claimPartner = async (taskId) => {
		try {
			await passPartners({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				user_id: user?.id,
				partners_quest_id: taskId,
			}).unwrap();
			setPartnerTaskStatus((prevStatus) =>
				prevStatus.map((task) => (task.id === taskId ? { ...task, status: 1 } : task))
			);
			openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		} catch (e) {
			console.log(`Error completing task ${taskId}`, e);
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};


	useEffect(() => {
		console.log('Checking partnerTaskStatus:', partnerTaskStatus);
		Object.keys(timers).forEach((taskId) => {
			console.log(
				`Task status for ${taskId}:`,
				partnerTaskStatus.find((task) => task.id === taskId)
			);
		});
	}, [partnerTaskStatus]);

	const twitterClick = async () => {
		window.open('https://x.com/tema_cash', '_blank');

		if (twitterTaskStatus === 0) {
			setTwitterTimer(15);
			setTwitterTaskStatus(2);
		}
	};

	const tgClickChat = async () => {
		window.open('https://t.me/Tiger_CashChat', '_blank');

		if (chatTaskStatus === 0) {
			setChatTimer(15);
			setChatTaskStatus(2);
		}
	};

	const tgClickChannel = async () => {
		let url;
		if (initLanguage === 'ru') {
			url = 'https://t.me/TigerCash_ru';
		} else if (initLanguage === 'en') {
			url = 'https://t.me/TigerCashChannel';
		}
		window.open(url, '_blank');

		if (channelTaskStatus === 0) {
			setChannelTimer(15);
			setСhannelTaskStatus(2);
		}
	};

	const websiteClick = async () => {
		window.open('https://tema.cash/', '_blank');

		if (websiteTaskStatus === 0) {
			setWebsiteTimer(15);
			setWebsiteTaskStatus(2);
		}
	};

	const claimTwitter = async () => {
		try {
			await passTask({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				id_telegram: user?.id_telegram,
				task: 'twitter',
			}).unwrap();
			const res = { success: true };
			if (res.success) {
				setTwitterTaskStatus(1);
				openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			} else {
				console.log('Error completing task');
				openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		} catch (e) {
			console.log(e);
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};

	const claimChat = async () => {
		try {
			await passTask({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				id_telegram: user?.id_telegram,
				task: 'tg_chat',
			}).unwrap();
			const res = { success: true };
			if (res.success) {
				setChatTaskStatus(1);
				openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			} else {
				console.log('Error completing task');
				openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		} catch (e) {
			console.log(e);
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};

	const claimChannel = async () => {
		try {
			await passTask({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				id_telegram: user?.id_telegram,
				task: 'tg_channel',
			}).unwrap();
			const res = { success: true };
			if (res.success) {
				setСhannelTaskStatus(1);
				openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			} else {
				openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		} catch (e) {
			console.log(e);
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};

	const claimWebsite = async () => {
		try {
			await passTask({
				token: await bcrypt.hash(secretKey + dateStringWithTime, 10),
				id_telegram: user?.id_telegram,
				task: 'website',
			}).unwrap();
			const res = { success: true };
			if (res.success) {
				setWebsiteTaskStatus(1);
				openModal('green', `${t('modalSuccess')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			} else {
				console.log('Error completing task');
				openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
				blurPopupTasks();
			}
		} catch (e) {
			console.log(e);
			openModal('red', `${t('modalError')}`, `${t('modalReturn')}`);
			blurPopupTasks();
		}
	};

	useEffect(() => {
		let timerInterval;
		if (timerTwitter > 0) {
			timerInterval = setInterval(() => {
				setTwitterTimer((prev) => prev - 1);
			}, 1000);
		} else if (timerTwitter === 0 && twitterTaskStatus === 2) {
			setTwitterTaskStatus(3);
		}
		return () => clearInterval(timerInterval);
	}, [timerTwitter, twitterTaskStatus]);

	useEffect(() => {
		let timerInterval;
		if (timerChat > 0) {
			timerInterval = setInterval(() => {
				setChatTimer((prev) => prev - 1);
			}, 1000);
		} else if (timerChat === 0 && chatTaskStatus === 2) {
			setChatTaskStatus(3);
		}
		return () => clearInterval(timerInterval);
	}, [timerChat, chatTaskStatus]);

	useEffect(() => {
		let timerInterval;
		if (timerChannel > 0) {
			timerInterval = setInterval(() => {
				setChannelTimer((prev) => prev - 1);
			}, 1000);
		} else if (timerChannel === 0 && channelTaskStatus === 2) {
			setСhannelTaskStatus(3);
		}
		return () => clearInterval(timerInterval);
	}, [timerChannel, channelTaskStatus]);

	useEffect(() => {
		let timerInterval;
		if (timerWebsite > 0) {
			timerInterval = setInterval(() => {
				setWebsiteTimer((prev) => prev - 1);
			}, 1000);
		} else if (timerWebsite === 0 && websiteTaskStatus === 2) {
			setWebsiteTaskStatus(3);
		}
		return () => clearInterval(timerInterval);
	}, [timerWebsite, websiteTaskStatus]);

	useEffect(() => {
		if (user?.wallet_address) {
			setHasWalletAddress(true);
		}
	}, [user]);

	useEffect(() => {
		setCurrLanguage(initLanguage);
	}, [initLanguage]);

	return (
		<>
			<footer id='footer' className='footerMain'>
				<div className='footerMain__container'>
					<div className='footerMain__activities'>
						<div className='footerMain__activitiesBtn'>
							<button onClick={tasksBtn}>
								<Icons.taskBtn />
								<span>{t('tasksTabTitle')}</span>
							</button>
						</div>
						{/* <div className='footerMain__activitiesBtn'>
							<button style={{ cursor: 'not-allowed' }} disabled>
								<span>Coming soon</span>
							</button>
						</div>
						<div className='footerMain__activitiesBtn'>
							<button style={{ cursor: 'not-allowed' }} disabled>
								<span>Coming soon</span>
							</button>
						</div> */}
					</div>
				</div>
			</footer>
			{tasksOpen && (
				<div id='popupTasks' aria-hidden='true' className={popupTasks}>
					<div className='popupTasks__wrapper'>
						<div className='popupTasks__content'>
							<div className='popupTasks__title'>
								<h4>{t('tasksTitle')}</h4>
								<button
									onClick={tasksCloseToggler}
									type='button'
									className='popupTasks__close'
								>
									<Icons.Close />
								</button>
							</div>
							<div className='popupTasks__coins'>
								<div className='popupTasks__coinBox'>
									{user?.wallet_balance && (
										<>
											<div className='popupTasks__coinImg' draggable='false'>
												<img src={tigerCoin} alt='Tiger coin' />
											</div>
											<div className='popupTasks__coinAmount'>
												<span id='coinAmount'>{user?.wallet_balance}</span>
											</div>
										</>
									)}
								</div>
							</div>
							<div className='popupTasks__tabs-btns'>
								<div
									className={`popupTasks__tabs-btn ${activeTab === 0 ? 'active' : ''}`}
									onClick={() => handleTabClick(0)}
								>
									<button>{t('tasksTabSocial')}</button>
								</div>
								<div
									className={`popupTasks__tabs-btn ${activeTab === 1 ? 'active' : ''}`}
									onClick={() => handleTabClick(1)}
								>
									<button>{t('tasksTabDaily')}</button>
									{/* <div className='footerMain__activitiesHint'>Coming Soon</div> */}
								</div>
								<div
									className={`popupTasks__tabs-btn ${activeTab === 2 ? 'active' : ''}`}
									onClick={() => handleTabClick(2)}
								>
									<button>{t('tasksTabPartners')}</button>
								</div>
							</div>
							<div className={`popupTasks__tasks ${activeTab === 0 ? 'active' : ''}`}>
								{/* ton wallet  */}
								{/* <div className='popupTasks__walletTask'>
									<TonConnectButton
										className='tonconnect-btn'
										style={{ position: 'relative' }}
									/>
									{!user?.wallet_address ? (
										<p>
											20000
											<img src={tigerCoin} alt='Tiger coin' />
										</p>
									) : (
										<p>{t('activityDone')}</p>
									)}
								</div> */}
								{/* simple wallet */}
								<div className='popupTasks__walletTask'>
									{inputFirst && (
										<>
											<div className='popupTasks__walletTask-title'>
												<span>{t('walletTaskDescr')}</span>
											</div>
											<div className='popupTasks__walletTask-input'>
												<input
													type='text'
													placeholder={t('walletTaskPlaceholder')}
													style={{
														background: 'transparent',
														color: '#fff',
														fontSize: '0.75rem!important',
													}}
													value={walletVaL}
													onChange={(e) => setWalletVal(e.target.value)}
													disabled={walletInputDisabled === true}
												/>
												<button
													className='popupTasks__walletTask-inputBtn'
													onClick={walletSubmitHandler}
													// disabled={walletInputDisabled === true}
												>
													<Icons.submitWallet />
												</button>
											</div>
										</>
									)}
									{inputSecond && (
										<>
											<div className='popupTasks__walletTask-title'>
												<span>{t('walletTaskTitle')}</span>
											</div>
											<div className='popupTasks__walletTask-input'>
												<input
													type='text'
													style={{
														background: 'transparent',
														color: '#fff',
														fontSize: '0.75rem!important',
													}}
													value={walletVaL}
													disabled
												/>
												<button
													className='popupTasks__walletTask-inputBtn'
													onClick={resetWalletEnabler}
												>
													<Icons.resetWallet />
												</button>
											</div>
										</>
									)}

									<div className='popupTasks__walletTask-box'>
										<div className='popupTasks__walletTask-right'>
											<div className='popupTasks__walletTask-rightHint'></div>
										</div>
										{!user?.wallet_address ? (
											<div className='popupTasks__walletTask-left'>
												<p>+20000</p>
											</div>
										) : (
											''
										)}
									</div>
								</div>
								<div className='popupTasks__task'>
									<button onClick={twitterClick} disabled={twitterTaskStatus === 1}>
										<span>
											{twitterTaskStatus === 0
												? `${t('followTwitter')}`
												: twitterTaskStatus === 2 || twitterTaskStatus === 3
												? `${t('activityCheck')}`
												: `${t('followTwitter')}`}
										</span>
										{twitterTaskStatus === 0 && (
											<p>
												10000
												<img src={tigerCoin} alt='Tiger coin' />
											</p>
										)}
										{twitterTaskStatus === 2 && (
											<p>
												{timerTwitter} {t('taskTimer')}
											</p>
										)}
										{twitterTaskStatus === 1 && <p>{t('activityDone')}</p>}
									</button>
									{twitterTaskStatus === 3 && (
										<div onClick={claimTwitter} className='claim-button'>
											{t('activityClaim')}
										</div>
									)}
								</div>
								<div className='popupTasks__task'>
									<button onClick={tgClickChat} disabled={chatTaskStatus === 1}>
										<span>
											{chatTaskStatus === 0
												? `${t('followTGChat')}`
												: chatTaskStatus === 2 || chatTaskStatus === 3
												? `${t('activityCheck')}`
												: `${t('followTGChat')}`}
										</span>
										{chatTaskStatus === 0 && (
											<p>
												10000
												<img src={tigerCoin} alt='Tiger coin' />
											</p>
										)}
										{chatTaskStatus === 2 && (
											<p>
												{timerChat} {t('taskTimer')}
											</p>
										)}
										{chatTaskStatus === 1 && <p>{t('activityDone')}</p>}
									</button>
									{chatTaskStatus === 3 && (
										<div onClick={claimChat} className='claim-button'>
											{t('activityClaim')}
										</div>
									)}
								</div>
								<div className='popupTasks__task'>
									<button onClick={tgClickChannel} disabled={channelTaskStatus === 1}>
										<span>
											{channelTaskStatus === 0
												? `${t('followTGChannel')}`
												: channelTaskStatus === 2 || channelTaskStatus === 3
												? `${t('activityCheck')}`
												: `${t('followTGChannel')}`}
										</span>
										{channelTaskStatus === 0 && (
											<p>
												10000
												<img src={tigerCoin} alt='Tiger coin' />
											</p>
										)}
										{channelTaskStatus === 2 && (
											<p>
												{timerChannel} {t('taskTimer')}
											</p>
										)}
										{channelTaskStatus === 1 && <p>{t('activityDone')}</p>}
									</button>
									{channelTaskStatus === 3 && (
										<div onClick={claimChannel} className='claim-button'>
											{t('activityClaim')}
										</div>
									)}
								</div>
								<div className='popupTasks__task'>
									<button onClick={websiteClick} disabled={websiteTaskStatus === 1}>
										<span>
											{websiteTaskStatus === 0
												? `${t('visitWebsite')}`
												: websiteTaskStatus === 2 || websiteTaskStatus === 3
												? `${t('activityCheck')}`
												: `${t('visitWebsite')}`}
										</span>
										{websiteTaskStatus === 0 && (
											<p>
												3000
												<img src={tigerCoin} alt='Tiger coin' />
											</p>
										)}
										{websiteTaskStatus === 2 && (
											<p>
												{timerWebsite} {t('taskTimer')}
											</p>
										)}
										{websiteTaskStatus === 1 && <p>{t('activityDone')}</p>}
									</button>
									{websiteTaskStatus === 3 && (
										<div onClick={claimWebsite} className='claim-button'>
											{t('activityClaim')}
										</div>
									)}
								</div>
							</div>
							<div className={`popupTasks__tasks ${activeTab === 1 ? 'active' : ''}`}>
								{/* Render quests dynamically based on their status */}
								{dailyQuests && dailyQuests.length > 0 && (
									<>
										{dailyQuests.map((quest) => (
											<div className='popupTasks__task' key={quest.id}>
												{/* Conditionally render button or div */}
												{quest.required_amount === 0 && quest.required_referrals === 0 ? (
													<button
														disabled={quest.status === 1}
														onClick={() =>
															passDailyHandler(quest.id, quest.daily_quest.link)
														}
													>
														<span>
															{currLanguage === 'ru'
																? quest.daily_quest.name_ru
																: quest.daily_quest.name}
														</span>
														{quest.status === 0 ? (
															<p className='popupTasks__task-rew'>
																<span
																	style={{
																		alignItems: 'center',
																		background: '#2cb726',
																		border: '1px solid #0d9047',
																		borderRadius: '31px',
																		color: '#ffffff',
																		display: 'flex',
																		justifyContent: 'center',
																		padding: '6px 12px',
																		width: '65%',
																	}}
																>
																	{t('activityClaim')}
																</span>
																{quest.reward}{' '}
																<div className='rewardCoin'>
																	<img src={tigerCoin} alt='Tiger coin' />
																</div>
															</p>
														) : (
															<span
																style={{
																	width: 'auto',
																	position: 'absolute',
																	right: '35px',
																}}
															>
																{t('activityDone')}
															</span>
														)}
													</button>
												) : (
													<button
														disabled={quest.status === 1}
														style={
															quest.required_amount > 0 || quest.required_referrals > 0
																? { paddingBottom: '24px' }
																: {}
														}
													>
														<span>
															{currLanguage === 'ru'
																? quest.daily_quest.name_ru
																: quest.daily_quest.name}
														</span>
														{quest.status === 0 ? (
															<p className='popupTasks__task-rew'>
																{quest.reward}{' '}
																<div className='rewardCoin'>
																	<img src={tigerCoin} alt='Tiger coin' />
																</div>
															</p>
														) : (
															<span
																style={{
																	width: 'auto',
																	position: 'absolute',
																	right: '35px',
																}}
															>
																{t('activityDone')}
															</span>
														)}
													</button>
												)}
												{(quest.required_amount > 0 || quest.required_referrals > 0) && (
													<div className='popupTasks__progressBar'>
														<progress
															max={quest.required_amount || quest.required_referrals}
															value={quest.amount || quest.referrals}
														></progress>
													</div>
												)}
											</div>
										))}
									</>
								)}
							</div>
							<div className={`popupTasks__tasks ${activeTab === 2 ? 'active' : ''}`}>
								{/* Render quests dynamically based on their status */}
								{partnerTaskStatus.length > 0 &&
									partnerTaskStatus
										.filter((quest) => quest.partners_quest.vis === 1)
										.map((quest) => (
											<div className='popupTasks__task' key={quest.id}>
												<button
													disabled={quest.status === 1}
													onClick={() => {
														partnerClick(quest.id, quest.partners_quest.link);
													}}
												>
													<span>
														{quest.status === 0
															? currLanguage === 'ru'
																? quest.partners_quest.name_ru
																: quest.partners_quest.name
															: quest.status === 2 || quest.status === 3
															? `${t('activityCheck')}`
															: currLanguage === 'ru'
															? quest.partners_quest.name_ru
															: quest.partners_quest.name}
													</span>
													{quest.status === 0 && (
														<p className='popupTasks__task-rew'>
															{quest.reward}
															<div className='rewardCoin'>
																<img src={tigerCoin} alt='Tiger coin' />
															</div>
														</p>
													)}
													{quest.status === 2 && (
														<p>
															{timers[quest.id]} {t('taskTimer')}
														</p>
													)}
													{quest.status === 1 && <p>{t('activityDone')}</p>}
												</button>
												{quest.status === 3 && (
													<div
														onClick={() => {
															claimPartner(quest.id);
														}}
														className='claim-button'
													>
														{t('activityClaim')}
													</div>
												)}
											</div>
										))}
							</div>
						</div>
					</div>
				</div>
			)}
			<Modal
				modalText={modalText}
				modalVisible={isModalVisible}
				onClose={closeModal}
				modalType={modalType}
				buttonText={buttonText}
				onButtonClick={closeModal}
			/>
		</>
	);
};

export default Footer;
