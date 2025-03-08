import './HeaderComponent.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ComponentLogo from '../componentLogo/componentLogo';
import useAuth from '@/hooks/useAuth';

const HeaderComponent = () => {
	const nav = useNavigate();

	const [isOpenCategory, setIsOpenCategory] = useState(false);
	const [isOpenOptionAuth, setIsOpenOptionAuth] = useState(false);
	const { user, logout } = useAuth();

	const onChangePageUrl = path => {
		if (path === 'product') {
			setIsOpenCategory(!isOpenCategory);
		} else {
			// console.log('onChangePageUrl path', path);
			nav(`/${path}`);
		}
	};
	const onOptionAuth = () => {
		setIsOpenOptionAuth(!isOpenOptionAuth);
	};

	const handleLogOut = () => {
		logout();
	};
	const onChangeLanguage = () => {
		console.log('onChangeLanguage');
	};

	return (
		<>
			<header className="header">
				<div id="header-top">
					<div className="container">
						<ul className="w-100 d-flex justify-content-end gap-3">
							<li
								onClick={() =>
									onChangePageUrl('notifications/order')
								}
							>
								<i className="fa-solid fa-bell"></i>
							</li>
							<li onClick={() => onChangeLanguage('lang')}>
								<span>Vi</span>
							</li>
							<li id="auth-header">
								<i
									className="fa-solid fa-user"
									onClick={onOptionAuth}
								></i>
								{isOpenOptionAuth && (
									<div id="auth-dropdown-option">
										{
											user ? (
												<div className="auth-ropdown">
													<span className="auth-ropdown__item content-truncate">
														Thông tin người dùng
													</span>
													<span
														className="auth-ropdown__item content-truncate"
														onClick={handleLogOut}
													>
														Đăng xuất
													</span>
												</div>
											) : (
												<span
													onClick={() =>
														onChangePageUrl(
															'auth/login'
														)
													}
												>
													Đăng nhập
												</span>
											)
											// <span onClick={() => onChangePageUrl('auth/register')}>Đăng ký</span>
										}
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>

				<div id="header-main">
					<div className="container">
						<div className="logo">
							<ComponentLogo />
						</div>
						<nav className="nav">
							<ul className="[&.menu]:static flex items-center justify-end menu">
								<li
									onClick={() => onChangePageUrl('about')}
									className="menu-item"
								>
									<Link to="/about">Giới thiệu</Link>
								</li>
								<li
									onClick={() => onChangePageUrl('news')}
									className="menu-item"
								>
									<Link to="/">Tin tức</Link>
								</li>
								<li
									onClick={() => onChangePageUrl('product')}
									className="menu-item"
								>
									<Link to="/products">Sản phẩm</Link>
								</li>
								<li
									onClick={() => onChangePageUrl('project')}
									className="menu-item"
								>
									<Link to="/project">Dự án</Link>
								</li>
								<li
									onClick={() =>
										onChangePageUrl('recruitment')
									}
									className="menu-item"
								>
									<Link to="/recruitment">Tuyển dụng</Link>
								</li>
								<li
									onClick={() => onChangePageUrl('admin')}
									className="menu-item"
								>
									<Link to="/admin">Admin</Link>
								</li>
							</ul>
						</nav>

						<div className="header-action d-flex justify-content-center align-items-center gap-3">
							<button id="location">
								<i className="fa-solid fa-location-dot"></i>
							</button>
							<button id="top-search">
								<i className="fa-solid fa-cart-shopping"></i>
							</button>
							<button id="top-search">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="menu-dropdown">
					<div className="menu-dropdown__content container">
						<div className="menu-dropdown__content__item">
							<div className="menu-dropdown__content__item__title">4 Accoustic</div>
							<div className="menu-dropdown__content__item__content">
								<div className="menu-dropdown__content__item__content__item">
									Loa
								</div>
							</div>
						</div>
					</div>
				</div>

				{/*  */}
			</header>
		</>
	);
};

export default HeaderComponent;
