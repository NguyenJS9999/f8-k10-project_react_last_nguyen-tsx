import instance from '.';

export const login = async params => {
	const { data } = await instance.post('/login', params);
	return data;
};

export const register = async params => {
	const { data } = await instance.post('/register', params);
	return data;
};
