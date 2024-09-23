import React from 'react';
import './DynamicScreen.scss'; // Import the CSS file for styling

const DynamicScreen = ({ variant }) => {
	// Define the different backgrounds and texts
	const variants = {
		error: {
			text: `We’re sorry, the page you requested cloud was not found.`,
		},
		maintenance: {
			text: `Repairs and upgrades 
			are underway`,
		},
		comingSoon: {
			text: `The line to enter will clear soon`,
		},
	};

	// Default to error variant if an unknown variant is passed
	const { text, style } = variants[variant] || variants.error;

	return (
		<div className='component-container' style={style}>
			<div className='componentText'>
				<h4>{text}</h4>
			</div>
		</div>
	);
};

export default DynamicScreen;
