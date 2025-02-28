import './AuthPage.scss';

import OrganismFooter from '../../compoents/organisms/organismFooter/organismFooter';
import OrganismHeaderDB from '../../compoents/organisms/organismHeader/OrganismHeaderDB';

// import MoleculeAuthForm from "../../compoents/molecules/moleculeAuthForm/moleculeAuthForm.jsx";

function AuthPage() {
	return (
		<>
			{/* <MoleculeAuthForm /> */}
			<OrganismHeaderDB />
			<div className="auth-page">
				<div className="b_login__content-box">
					<div className="container b_container--middle">
						<div className="b_login__content-box">
							<div className="b_section b_section--mydb_authentication">
								<div className="b_container">
									<h1 className="b_login__h1">
										My dante. For easier everything.
									</h1>

									<div className="b_section">
										<div className="b_divider"></div>
									</div>

									<div className="b_login__authentication-container">
										{/*  */}
										<div>
											<h2 className="b_headline--h3">
												Log in to My dante
											</h2>
										</div>
										<div>
											<h2 className="b_headline--h3">
												Not a My dante member?
											</h2>
										</div>
									</div>
									{/*  */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<OrganismFooter />
		</>
	);
}

export default AuthPage;
