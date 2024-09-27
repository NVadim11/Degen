import React from 'react';
import Icons from '../../Common/IconsComponent';
import bgWave from '../../../img/bgWave.webp';
import componentLogo from '../../../img/dChef_name.webp';
import './DynamicScreen.scss'; // Import the CSS file for styling

const DynamicScreen = ({ variant }) => {
	// Define the different backgrounds and texts
	const variants = {
		error: {
			icon: <Icons.noPageIcon />,
			title: `not found`,
			descr: `We’re sorry, the page you requested cloud was not found.`,
		},
		maintenance: {
			icon: <Icons.techIcon />,
			title: `Technical Maintenance`,
			descr: `Repairs and upgrades 
			are underway`,
		},
		comingSoon: {
			icon: <Icons.clockIcon />,
			title: `coming soon...`,
			descr: `The line to enter will clear soon`,
		},
	};

	// Default to error variant if an unknown variant is passed
	const { icon, title, descr, style } = variants[variant] || variants.error;

	return (
		<div className='component-container' style={style}>
			<div className='componentLogo'>
				<img src={componentLogo} alt='dChief logo' />
			</div>
			<div className='componentIcon'>{icon}</div>
			<div className='componentTitle'>
				<h4>{title}</h4>
			</div>
			<div className='componentDescr'>
				<p>{descr}</p>
			</div>
			<div className='bgWave'>
				<img src={bgWave} alt='background waves' />
			</div>
		</div>
	);
};

export default DynamicScreen;
