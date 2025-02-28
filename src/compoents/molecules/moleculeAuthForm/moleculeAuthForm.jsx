import './MoleculeAuthForm.scss';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema validation cho login & register
const loginSchema = z.object({
	email: z.string().email('Email không hợp lệ'),
	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

const registerSchema = z.object({
	fullName: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
	email: z.string().email('Email không hợp lệ'),
	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

const MoleculeAuthForm = () => {
	const [isLogin, setIsLogin] = useState(true); // Toggle giữa login & register

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(isLogin ? loginSchema : registerSchema)
	});

	const onSubmit = data => {
		console.log('Form Data:', data);
		alert(`Bạn đã ${isLogin ? 'đăng nhập' : 'đăng ký'} thành công!`);
	};

	return (
		<div className="molecule-auth-form flex justify-center items-center min-h-screen bg-gray-100">
			<div className="molecule-auth-form-inner w-full max-w-md bg-white shadow-lg rounded-lg p-6">
				<h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
					{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
				</h2>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{!isLogin && (
						<div>
							<label className="block text-gray-700">
								Họ & Tên
							</label>
							<input
								type="text"
								{...register('fullName')}
								className="w-full p-2 border border-gray-300 rounded mt-1"
								placeholder="Nguyễn Văn A"
							/>
							{errors.fullName && (
								<p className="text-red-500 text-sm mt-1">
									{errors.fullName.message}
								</p>
							)}
						</div>
					)}

					<div>
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							{...register('email')}
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="example@gmail.com"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-gray-700">Mật khẩu</label>
						<input
							type="password"
							{...register('password')}
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="********"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
					>
						{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
					</button>
				</form>

				<p className="text-center text-gray-600 mt-4">
					{isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-blue-500"
					>
						{isLogin ? 'Đăng ký' : 'Đăng nhập'} ngay
					</button>
				</p>
			</div>
		</div>
	);
};

export default MoleculeAuthForm;
