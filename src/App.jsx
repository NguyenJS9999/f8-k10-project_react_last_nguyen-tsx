import AppRouters from '@/routers/AppRouters';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
	return (
		<>
			<AuthProvider>
				<AppRouters />
			</AuthProvider>
		</>
	);
};

export default App;
