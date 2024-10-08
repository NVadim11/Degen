import AOS from 'aos';
import moment from 'moment-timezone';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useGetUserByTgIdQuery } from '../services/phpService';

import DChef from '../img/DChef.webp';
import DChef_boost from '../img/DChef_boost.webp';
import DChef_paused from '../img/DChef_paused.webp';
import Dchef_preload from '../img/Dchef_preload.webp';
import deganBoost from '../img/deganBoost.webp';
import deganCoin from '../img/deganCoin.webp';
import energy from '../img/energy.webp';
import bgWave from '../img/bgWave.webp';
import altBgWave from '../img/altBgWave.webp';
import dChef_name from '../img/dChef_name.webp';

import Footer from './Footer/Footer';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Preloader from './Preloader/Preloader';
import DynamicScreen from './Screens/DynamicScreen/DynamicScreen';
import TelegramLinking from './Screens/QRcode/QRcode';

const MainComponent = () => {
	const tg = window.Telegram.WebApp;
	const initData = tg.initDataUnsafe;
	const userId = initData?.user?.id;
	const [skip, setSkip] = useState(true);
	const { data: user } = useGetUserByTgIdQuery(userId, {
		skip: skip,
		pollingInterval: 10000,
	});
	const [preloaderLoaded, setPreloaderLoaded] = useState(false);
	const imagesRef = useRef([]);

	const secretURL = process.env.REACT_APP_REGISTER_KEY;

	useEffect(() => {
		const registerUser = async () => {
			try {
				const body = {
					query_id: initData?.query_id,
					user: {
						id: initData?.user.id,
						is_bot: initData?.user.is_bot,
						is_premium: initData?.user.is_premium,
						first_name: initData?.user.first_name,
						last_name: initData?.user.last_name,
						username: initData?.user.username,
						language_code: initData?.user.language_code,
					},
					auth_date: initData?.auth_date,
					hash: initData?.hash,
					timezone: moment.tz.guess(),
				};

				if (initData?.start_param) {
					body.parent_id_telegram = initData.start_param;
				}

				const response = await fetch(`${secretURL}/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
			} catch (error) {
				console.error('Error:', error);
			}
		};

		if (!user) {
			registerUser();
		} else {
			console.log('No user data available');
		}
	}, [initData, user, secretURL]);

	useEffect(() => {
		const loadImage = (src) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = () => resolve(img);
				img.onerror = () => reject(new Error(`Failed to load image from ${src}`));
			});
		};

		const imageSources = [
			DChef,
			DChef_boost,
			DChef_paused,
			Dchef_preload,
			deganBoost,
			deganCoin,
			energy,
			bgWave,
			altBgWave,
			dChef_name,
		];

		const loadImages = async () => {
			const promises = imageSources.map((src) => loadImage(src));

			try {
				const loadedImages = await Promise.all(promises);
				imagesRef.current = loadedImages;
				checkAllLoaded();
			} catch (e) {
				console.log('Problem loading images');
			}
		};

		const checkAllLoaded = () => {
			if (imagesRef.current.length === imageSources.length) {
				if (user) {
					setTimeout(() => {
						setPreloaderLoaded(true);
						AOS.init({
							easing: 'custom',
						});
					}, 500);
				} else {
					console.log('User data is not available.');
				}
			}
		};

		loadImages();
	}, [user]);

	useEffect(() => {
		if (tg && userId) {
			setSkip(false);
		}
	}, [tg, userId]);

	// Detecting if the application is opened from a mobile device
	const isMobileDevice =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

	// Change the variant based on current state
	// 'error' | 'maintenance' | 'comingSoon'
	const [variant, setVariant] = useState('error');
	useEffect(() => {
		setVariant('error');
	}, []);

	return (
		<>
			<Preloader loaded={!preloaderLoaded} />
			{!preloaderLoaded && (
				<>
					{!isMobileDevice ? (
						<TelegramLinking />
					) : (
						<>
							{!user ? (
								<>
									<Header user={user} />
									<main id='main' className='main'>
										<MainContent user={user} />
									</main>
									<Footer user={user} />
								</>
							) : (
								<DynamicScreen variant={variant} />
							)}
						</>
					)}
				</>
			)}
		</>
	);
};

export default MainComponent;
