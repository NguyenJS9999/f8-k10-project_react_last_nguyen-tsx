import axios from "axios";
import { refreshTokenService } from "./authService";

const axiosClient = axios.create({
	baseURL: "http://localhost:8888/api",
	headers: {
		"Content-Type": "application/json",

	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	 (config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.authorization= `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		// Xử lý lỗi khi tạo request
		return Promise.reject(error);
	}
)

axiosClient.interceptors.response.use( response => response,
	async error => {
		console.log('axiosClient.interceptors.response.use in error:', error);
		const originalRequest = error.config;
		console.log('originalRequest:', originalRequest);

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log('error.response?.status === 401 && !originalRequest._retry');

			try {
				const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
				if (!refreshToken) throw new Error('No refresh token');

				// Gọi API refresh token
				const res = await refreshTokenService(refreshToken);

				const newAccessToken = res.data.accessToken;
				localStorage.setItem('accessToken', JSON.stringify(newAccessToken));

				// Gửi lại request với token mới
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosClient(originalRequest);
			} catch (refreshError) {
				console.error('Refresh token failed', refreshError);
				localStorage.removeItem('accessToken');
				// localStorage.removeItem('refreshToken');
				window.location.href = '/auth/login';
				return Promise.reject(refreshError);
			}
		}
		// Xử lý các lỗi khác
		return Promise.reject(error);
	}
);

export default axiosClient;
