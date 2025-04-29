import axiosClient from ".";

export const getAllCategorys = async () => {
	const { data } = await axiosClient.get("/categories");
	return data;
};
export const getCategoryById = async () => {
	const { data } = await axiosClient.get(`/categories/${id}`, category);
	return data;
};

export const addCategory = async (category) => {
	const { data } = await axiosClient.post("/categories", category);
	return data;
};


export const updateCategory = async (id, category) => {
	const { data } = await axiosClient.patch(`/categories/${id}`, category);
	return data;
};

export const deleteCategory = async (id) => {
	const res = await axiosClient.delete(`/categories/${id}`);
	// Logic return sẽ thay đổi sau khi thay đổi services
	return res.ok;
};
