import { useEffect, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productActions";
import { ToastContainer } from "react-toastify";
import ComponentLoading from "@/components/componentLoading/ComponentLoading";

const ProductTable = () => {
	const { products, loading, error } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const [ itemDelete , setItemDelete ] = useState({});
	const [ showModalConfirmDel, setShowModalConfirmDel ] = useState(false);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	function handleShowModal(item) {
		setItemDelete(item);
		setShowModalConfirmDel(true);
	}

	function handleCloseModal(item) {
		setShowModalConfirmDel(false);
	}

	const handleDelete = (id) => {
		// dispatch()
		console.log(id);
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;




	return (
		<>
		 	{ loading && <ComponentLoading/> }
			<table className="table table-bordered table-striped">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item) => (
						<tr key={item?.id ?? item?._id}>
							<td>{item?.id ?? item?._id}</td>
							<td>{item?.title}</td>
							<td>{item?.price_default}</td>
							<td>{item?.description}</td>
							<td>
								<button className="btn btn-danger" onClick={() => handleShowModal(item)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div
				className={`modal fade ${showModalConfirmDel ? 'showModalConfirmDel d-block' : 'd-none'}`}
				tabIndex="-1"
				role="dialog"
			>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Xác nhân xóa { itemDelete?.title }</h5>
						<button
							type="button"
							className="btn-close"
							onClick={handleCloseModal}
						></button>
					</div>

					<div className="modal-body">

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bỏ</button>
						<button type="button" class="btn btn-primary" onClick={handleDelete}>Xóa</button>
					</div>
				</div>
			</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default ProductTable;
