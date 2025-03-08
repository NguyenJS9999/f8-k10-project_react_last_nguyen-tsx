import {
	loginService,
	logoutService,
	registerService
} from '@/services/authService';
import { createContext, useEffect, useState } from 'react';
import ComponentCustomToast from '@/components/componentCustomToast/ComponentCustomToast';
import { jwtDecode } from 'jwt-decode';

/**
- Khởi tạo context
- Xây dựng provider
- Tạo các giá trị và hàm xử lý
- Lưu trạng thái đăng nhập
- Cung cấp các hàm xử lý về auth
- Bọc vào component chính và chia sẻ dữ liệu này vào file app cho toàn bộ ứng dụng
*/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [statusCode, setStatusCode] = useState();

	// 	const login = async params => {
	// 		try {
	// 			setLoading(true);
	// 			const res = await loginService(params);
	// 			console.log('file Auth context : ', res);
	//
	// 			if (!res.status) {
	// 				// Lỗi URL
	// 				setLoading(false);
	// 				ComponentCustomToast(res?.message, 'error');
	// 			}
	//
	// 			if (res.status === 200 || res.status === 201) {
	// 				console.log('login Auth context res.status === 200: ', res);
	// 				setStatusCode(res.status);
	// 				localStorage.setItem(
	// 					'accessToken',
	// 					JSON.stringify(res?.data?.accessToken)
	// 				);
	// 				localStorage.setItem('user', JSON.stringify(res?.data?.user));
	//                 setUser(res?.data?.user);
	// 				setMessage(res?.data?.message); // State
	// 				ComponentCustomToast(res?.data?.message, 'success');
	// 				setLoading(false);
	// 			} else {
	// 				// 400 thiếu params
	// 				setLoading(false);
	// 				setMessage(
	// 					res?.response?.data?.message || 'Đăng nhập thất bại'
	// 				);
	// 				ComponentCustomToast(
	// 					res?.response?.data?.message || res?.message,
	// 					'error'
	// 				);
	// 				setStatusCode(res?.response.status);
	// 			}
	// 		} catch (error) {
	// 			console.log('file Auth context login else (error): ', error);
	// 			setLoading(false);
	// 		}
	// 	};
	const registerAction = async params => {
		try {
			setLoading(true);
			const res = await registerService(params);
			console.log('registerAction in chung res : ', res);

			if (!res.status) {
				// Lỗi URL
				console.log('registerAction !res.status : ', res);
				setLoading(false);
				ComponentCustomToast(res?.message, 'error');
			}

			if (res.status === 200 || res.status === 201) {
				console.log('registerAction res.status === 200 : ', res);
				setStatusCode(res.status);
				localStorage.setItem(
					'accessToken',
					JSON.stringify(res?.data?.accessToken)
				);
				localStorage.setItem('user', JSON.stringify(res?.data?.user));

				setMessage(res?.data?.message); // State
				ComponentCustomToast(res?.data?.message, 'success');
				setLoading(false);
			} else {
				// 400 thiếu params | Trùng email
				console.log('registerAction res.status !== 200 : ', res);
				setLoading(false);
				setMessage(
					res?.response?.data?.message || 'Đăng nhập thất bại'
				);
				ComponentCustomToast(res?.response?.data?.message, 'error');
				setStatusCode(res?.response.status);
			}
		} catch (error) {
			console.log('registerAction error: ', error);
			setLoading(false);
		}
	};
	const logout = async () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('user');
		setUser({}); //

		// setMessage('Đăng xuất thành công');
		// ComponentCustomToast('Đăng xuất thành công!', 'success');

		try {
			setLoading(true);
			const res = await logoutService();
			console.log('logoutAction in chung res : ', res);

			if (!res.status) {
				// Lỗi URL
				console.log('logoutAction !res.status : ', res);
				setLoading(false);
				ComponentCustomToast(res?.message, 'error');
			}

			if (res.status === 200 || res.status === 201) {
				console.log('logoutAction res.status === 200 : ', res);
				setStatusCode(res.status);

				setMessage(res?.data?.message); // State
				ComponentCustomToast(res?.data?.message, 'success');
				setLoading(false);
			} else {
				// 400
				console.log('logoutAction res.status !== 200 : ', res);
				setLoading(false);
				setMessage(
					res?.response?.data?.message || 'Đăng xuất thất bại'
				);
				ComponentCustomToast(res?.response?.data?.message, 'error');
				setStatusCode(res?.response.status);
			}
		} catch (error) {
			console.log('registerAction error: ', error);
			setLoading(false);
		}
	};
	return (
		<AuthContext.Provider
			value={{
				registerAction,
				logout,
				loading,
				statusCode,
				user,
				message
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
