import HeaderComponent from '@/components/headerComponent/HeaderComponent';
import './ClientLayout.scss';
import { Outlet } from 'react-router-dom';
// import OrganismHeaderDB from '../../compoents/organisms/organismHeader/OrganismHeaderDB';
// import OrganismFooter from '../../compoents/organisms/organismFooter/organismFooter';

function ClientLayout() {
	return (
		<>
			{/* <OrganismHeader2 /> */}
			<HeaderComponent />
			<div className="container">
				<Outlet />
			</div>
			{/* <OrganismFooter /> */}
		</>
	);
}

export default ClientLayout;
