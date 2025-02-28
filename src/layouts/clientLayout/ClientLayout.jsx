import './ClientLayout.scss';
import { Outlet } from 'react-router-dom';
// import OrganismHeader2 from '../../compoents/organisms/organismHeader/OrganismHeader2';
import OrganismHeaderDB from '../../compoents/organisms/organismHeader/OrganismHeaderDB';
import OrganismFooter from '../../compoents/organisms/organismFooter/organismFooter';

function ClientLayout() {
	return (
		<>
			{/* <OrganismHeader2 /> */}
			<OrganismHeaderDB />
			<div className="container">
				<Outlet />
			</div>
			<OrganismFooter />
		</>
	);
}

export default ClientLayout;
