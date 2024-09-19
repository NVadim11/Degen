import React from 'react';
import GreenIcon from './Icons/GreenIcon';
import RedIcon from './Icons/RedIcon';
import YellowIcon from './Icons/YellowIcon';
import Icons from '../Common/IconsComponent.jsx';

import './Modal.scss';

export default function Modal({
	modalText,
	modalVisible,
	onClose,
	modalType,
	buttonText,
	onButtonClick,
}) {
	const errorCloseToggler = () => {
		onClose();
	};

	if (!modalVisible) return null;

	let IconComponent;
	switch (modalType) {
		case 'green':
			IconComponent = GreenIcon;
			break;
		case 'red':
			IconComponent = RedIcon;
			break;
		case 'yellow':
			IconComponent = YellowIcon;
			break;
		default:
			IconComponent = null;
	}

	return (
		<div id='modalWindow' aria-hidden='true' className='modalWindow'>
			<div className='modalWindow__layer'></div>
			<button onClick={errorCloseToggler} type='button' className='modalWindow__close'>
				<Icons.Close />
			</button>
			<div className='modalWindow__icon'>{IconComponent && <IconComponent />}</div>
			<div className='modalWindow__title'>
				<h4>{modalText}</h4>
			</div>
			<button onClick={onButtonClick} type='button' className='modalWindow__action'>
				{buttonText}
			</button>
		</div>
	);
}
