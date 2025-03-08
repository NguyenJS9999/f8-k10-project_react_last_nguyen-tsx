import axiosClient from '.';

export const loginService = async params => {
	try {
		const res = await axiosClient.post('/auth/login', params);
		return res;
	} catch (error) {
		// console.log(error.response.data.message)
		return error;
	}
};

export const registerService = async params => {
	try {
		const res = await axiosClient.post('/auth/register', params);
		return res;
	} catch (error) {
		// return error.response?.data || { message: "Đăng ký thất bại" };
		return error;
	}
};

export const getProfileService = async params => {
	// console.log('service getProfileService params', params);
	const { data } = await axiosClient.get('/profile', params);
	// console.log('service getProfileService data', data);
	return data;
};
export const fetchMeProfile = async(accessToken) => {
	try {
		const res = await axiosClient.post('/auth/me/profile', accessToken);
		return res;
	} catch (error) {
		return error;
	}
}

export const logoutService = async () => {
	const { data } = await axiosClient.post('/auth/logout');
	return data;
};

export const refreshTokenService = async () => {
	console.log('🔥 service Refresh Token...');
	const { data } = await axiosClient.post('/auth/refresh-token');
	return data;
};
