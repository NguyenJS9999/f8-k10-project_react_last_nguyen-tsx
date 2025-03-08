import './RegisterForm.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/authSchema';
import ComponentCustomToast from '@/components/componentCustomToast/ComponentCustomToast';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ComponentLoading from '@/components/componentLoading/ComponentLoading';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

const RegisterForm = () => {
	const nav = useNavigate();

	const { registerAction, loading, statusCode } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const handleAuthForm = async formData => {
		console.log('handleAuthForm formData: ', formData);
		registerAction(formData);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if ( statusCode === 200 || statusCode === 201) {
				nav(`/login`);
			}
		}, 2000)
		return () => { clearTimeout(timer); }
	}, [statusCode, nav]);

	function handleChangePage(urlPage) {
		nav(`/${urlPage}`);
	}

	return (
		<>
			{loading && <ComponentLoading />}
			<div className="register-form  min-h-screen flex items-center justify-center bg-gray-100">
				<div className="register-form-frame items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-3xl font-bold text-center mb-2">
						Create Your Account
					</h2>
					<p className="text-center text-gray-500 mb-6">
						Welcome back! Please enter your details
					</p>

					{/* Nút Sign up with Google */}
					<button
						id="login-vs-google"
						className="w-fit flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg mb-4 hover:bg-gray-50"
					>
						<i className="fa-brands fa-google"></i>
						Sign up with Google
					</button>

					<form
						onSubmit={handleSubmit(handleAuthForm)}
						className="space-y-4"
					>
						{/* 1 Name */}
						<div>
							<label className="block text-sm text-gray-600 mb-1">
								Name
							</label>
							<input
								type="text"
								{...register('name')}
								placeholder="Enter your name"
								className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						{/* 2 Email */}
						<div>
							<label className="block text-sm text-gray-600 mb-1">
								Email
							</label>
							<input
								type="email"
								{...register('email')}
								placeholder="Enter your email"
								className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label className="block text-sm text-gray-600 mb-1">
								Password
							</label>
							<input
								type="password"
								{...register('password')}
								placeholder="••••••••"
								className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-black text-white py-2 	rounded-lg hover:bg-gray-800 transition"
						>
							Submit
						</button>
					</form>

					{/* Sign in Link */}
					<p className="text-center text-gray-500 mt-4">
						Already have an account?
						<a
							href="#"
							className="text-blue-600 hover:underline"
							onClick={() => handleChangePage('auth/login')}
						>
							Sign in
						</a>
					</p>
				</div>

				<ToastContainer />
			</div>
		</>
	);
};

export default RegisterForm;
