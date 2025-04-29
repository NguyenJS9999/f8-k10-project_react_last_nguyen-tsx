import axiosClient from ".";

export const getAllBrands = async () => {
	const { data } = await axiosClient.get("/brands");
	return data;
};
export const getBrandByid = async (id) => {
	const { data } = await axiosClient.get(`/brands/${id}`);
	return data;
};


export const addBrand = async (brand) => {
	const { data } = await axiosClient.post("/brands", brand);
	return data;
};
export const updateBrand = async (id, brand) => {
	const { data } = await axiosClient.patch(`/brands/${id}`, brand);
	return data;
};

export const deleteBrand = async (id) => {
	const res = await axiosClient.delete(`/brands/${id}`);
	// Logic return sẽ thay đổi sau khi thay đổi services
	return res.ok;
};

