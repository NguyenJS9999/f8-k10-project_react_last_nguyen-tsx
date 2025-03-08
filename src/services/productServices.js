import axiosClient from ".";

export const getAllProducts = async () => {
	const { data } = await axiosClient.get("/products");
	return data;
};

export const addProduct = async (product) => {
	const { data } = await axiosClient.post("/products", product);
	return data;
};

export const deleteProduct = async (id) => {
	const res = await axiosClient.delete(`/products/${id}`);
	// Logic return sẽ thay đổi sau khi thay đổi services
	return res.ok;
};

export const updateProduct = async (id, product) => {
	const { data } = await axiosClient.patch(`/products/${id}`, product);
	return data;
};
