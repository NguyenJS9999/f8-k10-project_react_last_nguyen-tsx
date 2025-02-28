// import React from 'react'
import { lazy, Suspense } from 'react';

// import useAuth from "@/hooks/useAuth";
import { useRoutes } from 'react-router-dom';
import AtomLoading from '../compoents/atoms/AtomLoading/AtomLoading.jsx';

// import AuthPage from '../pages/auth/authPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
// Lazy load các thành phần
const ClientLayout = lazy(() => import('../layouts/clientLayout/ClientLayout.jsx'));
const AdminLayout = lazy(() => import('../layouts/adminLayout/AdminLayout.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));
// Client
const HomePage = lazy(() => import('../pages/client/homePage/HomePage.jsx'));
const AboutPage = lazy(() => import('../pages/client/aboutPage/AboutPage'));
const NewsPage = lazy(() => import('../pages/client/newsPage/NewsPage'));
const ProjectPage = lazy(() => import('../pages/client/projectPage/ProjectPage'));
const RecruitmentPage = lazy(() => import('../pages/client/recruitmentPage/RecruitmentPage'));
const CartPage = lazy(() => import('../pages/client/cardPage/CardPage.jsx'));
const ProductsPage = lazy(() => import('../pages/client/categoriesPage/CategoriesPage.jsx'));
const ProducDetailPage = lazy(() => import('../pages/client/productDetail/ProducDetailPage.jsx'));

// Admin
const ProductTable = lazy(() => import('../pages/admin/productTable/ProductTable.jsx'));
const ProductForm = lazy(() => import('../pages/admin/productForm/ProductForm'));

// HOC: Yêu cầu quyền đăng nhập
const RequireAuth = ({ children }) => {
	// const { isAuthenticated } = useAuth();
	// console.log('RequireAuth isAuthenticated: ',isAuthenticated);
	return children;
	// return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// HOC: Kiểm tra quyền admin
const RequireAdmin = ({ children }) => {
	// const { user } = useAuth();
	// console.log('RequireAdmin user: ',user);
	return children;
	// return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
const AppRouters = () => {
	const routes = [
		{
			path: '/',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<ClientLayout />
				</Suspense>
			),
			children: [
				{ path: '/', element: <HomePage /> },
				{ path: '/cart', element: <CartPage /> },
				{ path: '/about', element: <AboutPage /> },
				{ path: '/news', element: <NewsPage /> },
				{ path: '/project', element: <ProjectPage /> },
				{ path: '/recruitment', element: <RecruitmentPage /> },

				{ path: '/collections/:slug', element: <ProductsPage /> },
				{ path: '/products/:id', element: <ProducDetailPage /> },
			]
		},
		// Auth
		// {
		// 	path: '/auth',
		// 	element: (
		// 		<Suspense fallback={<AtomLoading />}>
		// 			<AuthPage />
		// 		</Suspense>
		// 	)
		// },
		{
			path: 'auth/register',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<RegisterPage />
				</Suspense>
			)
		},
		{
			path: 'auth/login',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<LoginPage />
				</Suspense>
			)
		},
		// ADMIN
		{
			path: '/admin',
			element: (
				<RequireAuth>
					<RequireAdmin>
						<Suspense fallback={<AtomLoading />}>
							<AdminLayout />
						</Suspense>
					</RequireAdmin>
				</RequireAuth>
			),
			children: [
				{
					path: 'products',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductTable />
						</Suspense>
					)
				},
				{
					path: 'product/add',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductForm />
						</Suspense>
					)
				},
				{
					path: 'product/update/:id',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductForm />
						</Suspense>
					)
				}
			]
		},
		// Other
		{
			path: '*',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<NotFoundPage />
				</Suspense>
			)
		}
	];
	return <div className="pages-layout ">{useRoutes(routes)}</div>;
};

export default AppRouters;
