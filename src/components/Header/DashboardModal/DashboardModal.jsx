import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './DashboardModal.scss';

export default function DashboardModal({ dashboardData }) {
	const { t } = useTranslation();

	return (
		<>
			<div className='popupDashboard__table'>
				<div className='popupDashboard__table-header'>
					<span>{t('dashboardLvl')}</span>
					<span>{t('dashboardUsers')}</span>
					{/* <span>{t('dashboardActiveUsers')}</span> */}
					<span>{t('dashboardBonus')}</span>
					{/* <span>{t('dashboardBonusAnn')}</span> */}
				</div>
				<ul className='popupDashboard__table-content'>
					{dashboardData.data.map((item) => (
						<li
							key={item.id}
							className={`popupDashboard__table-item ${
								item.current === true ? 'highlight' : ''
							}`}
						>
							<span>{item.id}</span>
							<span>{item.required_referrals}</span>
							<span>{item.reward}%</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
