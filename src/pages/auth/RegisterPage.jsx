// import './RegisterForm.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/authSchema';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authActions';
import { ToastContainer, toast } from 'react-toastify';
import AtomLoading from '../../compoents/atoms/AtomLoading/AtomLoading';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { loading, error, message } = useSelector(state => state.auth);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({
		resolver: zodResolver(
			registerSchema
		),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			phone: '',
			address: '',
			avatar: '',
			age: ''
		}
	});

	useEffect(() => {
		return () => {
			dispatch({ type: 'auth/clearState' });
		};
	}, []);

	function handleRegisterForm(data) {
		console.log("Dữ liệu từ form:", data); // Kiểm tra dữ liệu có hợp lệ không
		try {
			dispatch(registerUser(data));
			toast.success(message || 'Đăng ký thành công!');
			setTimeout(() => {
				// nav('/login');
				console.log("Đăng ký thành công");
			}, 2000);
		} catch (error) {
			console.log('handleRegisterForm error', error);
		}
	}


  if (error) {
    if (typeof error === 'string') {
        toast.error(error);
    } else {
        toast.error(error || 'An error occurred');
    }
}
	function handleResetForm() {
		reset({
			avatar: '',
			name: '',
			email: '',
			password: '',
			phone: '',
			address: '',
			age: ''
		});
	}

	// Xử lý ảnh đại diện
	const [image, setImage] = useState(null);
	const [errorImage, setErrorImage] = useState('');

	const handleFileInput = event => {
		const file = event.target.files[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			setErrorImage('Vui lòng chọn một tệp ảnh hợp lệ!');
			return;
		}
		const reader = new FileReader();
		reader.onload = e => setImage(e.target.result);
		reader.readAsDataURL(file);
	};

	const removeImage = () => setImage(null);

	return (
		<div className="register-form-page container">
			<h1>Đăng ký tài khoản</h1>

			{loading && <AtomLoading />}

			<form
				onSubmit={handleSubmit(handleRegisterForm)}
				className="register-form"
			>
				{/* Avatar */}
				<div className="image-upload-container">
					<div className="drop-zone">
						{image ? (
							<div className="image-preview">
								<img src={image} alt="Uploaded" />
								<button
									className="remove-btn"
									onClick={removeImage}
								>
									Xóa ảnh
								</button>
							</div>
						) : (
							<>
								<p>Chọn ảnh đại diện</p>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileInput}
									{...register('avatar')}
								/>
							</>
						)}
					</div>
					{errorImage && <p className="error-text">{errorImage}</p>}
				</div>

				{/* Name */}
				<div className="form-group mt-2">
					<label htmlFor="name">Họ và Tên</label>
					<input
						className="form-control"
						type="text"
						id="name"
						{...register('name')}
					/>
					{errors.name && (
						<p className="text-danger">{errors.name?.message}</p>
					)}
				</div>

				{/* Email */}
				<div className="form-group mt-2">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						type="email"
						id="email"
						{...register('email')}
					/>
					{errors.email && (
						<p className="text-danger">{errors.email?.message}</p>
					)}
				</div>

				{/* Password */}
				<div className="form-group mt-2">
					<label htmlFor="password">Mật khẩu</label>
					<input
						className="form-control"
						type="password"
						id="password"
						{...register('password')}
					/>
					{errors.password && (
						<p className="text-danger">
							{errors.password?.message}
						</p>
					)}
				</div>

				{/* Phone */}
				<div className="form-group mt-2">
					<label htmlFor="phone">Số điện thoại</label>
					<input
						className="form-control"
						type="text"
						id="phone"
						{...register('phone')}
					/>
					{errors.phone && (
						<p className="text-danger">{errors.phone?.message}</p>
					)}
				</div>

				{/* Address */}
				<div className="form-group mt-2">
					<label htmlFor="address">Địa chỉ</label>
					<input
						className="form-control"
						type="text"
						id="address"
						{...register('address')}
					/>
					{errors.address && (
						<p className="text-danger">{errors.address?.message}</p>
					)}
				</div>

				{/* Age */}
				<div className="form-group mt-2">
					<label htmlFor="age">Tuổi</label>
					<input
						className="form-control"
						type="number"
						id="age"
                        {...register('age', { required: true, valueAsNumber: true })}
					/>
					{errors.age && (
						<p className="text-danger">{errors.age?.message}</p>
					)}
				</div>

				{/* Action Buttons */}
				<div className="form-group mt-2">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={handleResetForm}
					>
						Nhập lại
					</button>
					<button type="submit" className="btn btn-primary">
						Đăng ký
					</button>
				</div>
			</form>

			<ToastContainer />
		</div>
	);
};

export default RegisterPage;
