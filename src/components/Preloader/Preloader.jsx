import React from 'react';
import bgWave from '../../img/bgWave.webp';
import preloaderLogo from '../../img/Dchef_preload.webp';
import logoText from '../../img/dChef_name.webp';

import './Preloader.scss'; // Import the CSS file for styling

const Preloader = ({ loaded }) => {
	return (
		<div
			className={`preloader${loaded ? ' loaded' : ''}`}
			style={{
				backgroundColor: '#F4BD44',
			}}
		>
			<div className='bgWave'>
				<img src={bgWave} alt='background waves' />
			</div>
			<div className='preloaderLogo'>
				<img src={preloaderLogo} alt='preloader logo' />
			</div>
			<div className='logoText'>
				<img src={logoText} alt='Text logo' />
			</div>
			<div className='progressBar'>
				<div className='progress'></div>
			</div>
		</div>
	);
};

export default Preloader;
