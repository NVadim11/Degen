import React, { useState, useEffect } from 'react';
import deganCoin from '../../../img/deganCoin.webp';
import Icons from '../../Common/IconsComponent';
import './Referral.scss';

const Referral = ({ user, totalReferrals, сloseToggler }) => {
	const [generatedUrl, setGeneratedUrl] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const storedUrl = localStorage.getItem('generatedUrl');
		if (storedUrl) {
			setGeneratedUrl(storedUrl);
		}
	}, []);

	const generateUrl = () => {
		if (user?.id_telegram) {
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
		<div id='popupInvite' aria-hidden='true' className='popupInvite_show'>
			<div className='popupInvite__wrapper'>
				<div className='popupInvite__content'>
					<button onClick={сloseToggler} type='button' className='popupInvite__close'>
						<Icons.Close />
					</button>
					<div className='popupInvite__title'>
						<h4>Invite friends. Get rewards together</h4>
					</div>
					<div className='popupInvite__refInfo'>
						<div className='popupInvite__refInfo-box'>
							<p>Your Bonus</p>
							<div className='popupInvite__refInfo-coins'>
								{Array.from({ length: 6 }).map((_, idx) => (
									<img key={idx} src={deganCoin} alt='Degan Coin Icon' />
								))}
							</div>
							<div className='popupInvite__refInfo-item'>
								<span>10 %</span>
							</div>
						</div>
						{totalReferrals >= 0 && (
							<div className='popupInvite__refInfo-box'>
								<p>Referral Count</p>
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
							<p>Generate your link</p>
							<p className='popupInvite__input'>
								{generatedUrl.length ? `${generatedUrl}` : 'Referral link'}
								<button onClick={copyToClipboard} className='popupInvite__input-btn'>
									<Icons.Copy />
								</button>
								{copied && <span className='copied-message'>Copied!</span>}
							</p>
						</div>
						<div className='popupInvite__item-group'>
							<button className='popupInvite__submit' onClick={generateUrl}>
								Generate
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Referral;
