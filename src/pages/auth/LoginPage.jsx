import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../schemas/authSchema';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
function LoginPage() {
	const nav = useNavigate();
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
			password: '',
		}
	});



	async function handleAuthForm(dataBody) {
		try {
			console.log('handleAuthForm dataBody', dataBody);
            const response = await dispatch(loginUser(dataBody)).unwrap();
			console.log("Client login response", response )
            toast.success('Đăng nhập thành công!');
			nav(`/`);

		} catch (error) {
			console.log('handleAuthForm error', error);
		}
	}

	function handleChangePage(urlPage) {
        nav(`/${urlPage}`);
    }

	// const onSubmit = async (data) => {
    //     try {
    //         const response = await dispatch(loginUser(data)).unwrap();
    //         toast.success('Đăng nhập thành công!');
    //         setTimeout(() => navigate('/'), 2000);
    //     } catch (err) {
    //         toast.error(err);
    //     }
    // };

	return (
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
					<span className='mr-2'>Already don{`'`}t have an account?</span>
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
		</div>
	);
}

export default LoginPage;
