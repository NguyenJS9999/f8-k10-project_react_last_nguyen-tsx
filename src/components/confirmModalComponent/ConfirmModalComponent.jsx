import PropTypes from 'prop-types';
import ComponentCategoryForm from '../componentCategoryForm/ComponentCategoryForm';
import ComponentBrandForm from '../componentBrandForm/ComponentBrandForm';
import { useSelector } from 'react-redux';

const ConfirmModalComponent = ({ show, onClose, title }) => {
	const { typeAddOption } = useSelector(state => state.products);
	function handleCloseFrom() {
		onClose();
	}

	return (
		<div
			className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
			tabIndex="-1"
			role="dialog"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title || ''}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={handleCloseFrom}
						></button>
					</div>

					<div className="modal-body">
						{ typeAddOption === "category"  && <ComponentCategoryForm />}
						{ typeAddOption === "brand"  && <ComponentBrandForm
						 />}
					</div>
				</div>
			</div>
		</div>
	);
};
ConfirmModalComponent.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string
};
export default ConfirmModalComponent;
