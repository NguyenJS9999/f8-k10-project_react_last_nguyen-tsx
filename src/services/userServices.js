import axiosClient from ".";

export const getAllUsers = async () => {
	const { data } = await axiosClient.get("/user");
	return data;
};
export const getProfileUser = async () => {
	const { data } = await axiosClient.get("/auth/me/profile");
	return data.user;
};

export const addUser = async (user) => {
	const { data } = await axiosClient.post("/user", user);
	return data;
};

export const deleteUser = async (id) => {
	const res = await axiosClient.delete(`/user/${id}`);
	// Logic return sẽ thay đổi sau khi thay đổi services
	return res.ok;
};

export const updateUser = async (id, user) => {
	const { data } = await axiosClient.patch(`/user/${id}`, user);
	return data;
};
