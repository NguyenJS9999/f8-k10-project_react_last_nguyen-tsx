import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfileUser } from '@/features/user/userActions';

const ProtectedRoute = ({ allowedRoles }) => {
    // const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		(async() => {
			try {
				const res = dispatch(fetchProfileUser());
				// console.log(res)
			} catch (error) {
				console.log(error)
			}
		})()
	},[dispatch])

	// console.log("ProtectedRoute  user: ", user)

	const user = {
	role: 'admin',
	role: 'manager',
	// role: 'staff',
	// role: 'accountant',
	// role: 'customer',
	};

	if (!user) return <Navigate to="/auth/login" replace />; // Chưa đăng nhập → Chuyển hướng login
	if (!allowedRoles.includes(user.role)) {
		console.log('không có role trong mảng allowedRoles');
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
ProtectedRoute.propTypes = {
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedRoute;
