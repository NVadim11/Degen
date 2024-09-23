import React, { useEffect } from 'react';
import './DashboardModal.scss';

export default function DashboardModal({ dashboardData }) {
	return (
		<>
			<div className='popupDashboard__table'>
				<div className='popupDashboard__table-header'>
					<span>dashboardLvl</span>
					<span>dashboardUsers</span>
					<span>dashboardBonus</span>
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
