
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schemas/authSchema';
import { useNavigate } from 'react-router-dom';
import ComponentCustomToast from '@/components/componentCustomToast/ComponentCustomToast';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import ComponentLoading from '@/components/componentLoading/ComponentLoading';
import { loginService } from '@/services/authService';
import axiosClient from '@/services';
import { useDispatch } from 'react-redux';
import { getProfileUser } from '@/services/userServices';
import { fetchProfileUser } from '@/features/user/userActions';
function LoginPage() {
	const nav = useNavigate();
	const { login, loading, statusCode } = useAuth();
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit
		// reset
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	async function handleAuthForm(formData) {
		// login(formData); // Check role admin -> dashboard
		try {
			const res = await loginService(formData);

			if (!res.status) {
				ComponentCustomToast(res?.message, 'error');
			}
			if (res.status === 200 || res.status === 201) {
				console.log("handleAuthForm res?.data: ", res?.data);
				localStorage.setItem('accessToken',res?.data?.accessToken);
				ComponentCustomToast(res?.data?.message, 'success');

                dispatch(fetchProfileUser());

				setTimeout(() => {
					nav(`/`);
				}, 2000);
			} else {
				ComponentCustomToast(
					res?.response?.data?.message || res?.message,
					'error'
				);
			}
		} catch (error) {
			console.log('file Auth context login else (error): ', error);
		}
	}
	useEffect(()  => {

	}, [dispatch])

	function handleChangePage(urlPage) {
		nav(`/${urlPage}`);
	}

	return (
		<>
			{loading && <ComponentLoading />}
			<div className="flex flex-col items-center justify-center min-h-screen bg-background">
				<div className="bg-card rounded-lg shadow-lg p-8 max-w-md w-full">
					<h1 className="text-2xl font-bold text-foreground text-center">
						Login account
					</h1>

					<form
						className="mt-6"
						onSubmit={handleSubmit(handleAuthForm)}
					>
						<div className="form-group mt-2">
							<label htmlFor="title" className="form-label">
								Email
							</label>
							<input
								className="form-control"
								type="email"
								id="email"
								placeholder="email"
								{...register('email', { required: true })}
							/>
							{errors.email && (
								<p className="text-danger">
									{errors.email?.message}
								</p>
							)}
						</div>

						<div className="form-group mt-3">
							<label htmlFor="title" className="form-label">
								Password
							</label>
							<input
								className="form-control"
								type="password"
								id="password"
								placeholder="password"
								{...register('password', { required: true })}
							/>
							{errors.password && (
								<p className="text-danger">
									{errors.password?.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="mt-4 w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 text-white"
						>
							Login
						</button>
					</form>

					<p className="w-full text-center text-muted-foreground mt-2">
						<span className="mr-2">
							Already don{`'`}t have an account?
						</span>
						<a
							href="#"
							className="text-primary"
							onClick={() => handleChangePage('auth/register')}
						>
							Register
						</a>
					</p>

					{/* <div className="mt-4 text-center">
						<span className="text-muted-foreground">
							Or register with
						</span>
						<div className="flex justify-center mt-2">
							<button className="bg-secondary text-secondary-foreground p-2 rounded-md mr-2">
								Google
							</button>
							<button className="bg-secondary text-secondary-foreground p-2 rounded-md">
								Apple
							</button>
						</div>
					</div> */}
				</div>
				<ToastContainer />
			</div>
		</>
	);
}

export default LoginPage;
