import './OrganismHeaderDB.scss';
import AtomLogo from '../../atoms/AtomLogo/atomLogo';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OrganismHeaderCategory from './multiMenu/OrganismHeaderCategory';
// import { useDispatch } from 'react-redux';
// import { fetchProducts } from '../../../features/products/productActions';
// import MoleculeAuthForm from '../../molecules/moleculeAuthForm/moleculeAuthForm';

function OrganismHeaderDB() {
	const nav = useNavigate();
	// 	const dispatch = useDispatch();
	//
	const [isShowSearch, setIsShowSearch] = useState(false);
	const [isOpenCategory, setIsOpenCategory] = useState(false);
	// const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);


	const onChangePageUrl = urlPage => {
		console.log('onChangePageUrl urlPage: ', urlPage);
		// Mở ui danh mục sp riêng
		if (urlPage === 'product') {
			// setisOpenSearch(false);
			setIsOpenCategory(!isOpenCategory);
		} else {
			nav(`/${urlPage}`);
		}
	};

	// function handleAuth(urlPage) {
	// 	console.log('handleAuth');
	// 	// setIsOpenModalAuth(!isOpenModalAuth);
	// 	nav(`/${urlPage}`);
	// }

	return (
		<>
			<div
				id="organism-header"
				className="[.home\_content_&]:fixed relative w-full z-50 [.fixed-top&]:fixed duration-500 transition-all"
			>
				<div className="header-section" id="header-one">
					<div className="container">
							<div className="navbar__links">
								<button
									id="header-noti"
									className="navbar__links__item"
								>
									<i className="fa-solid fa-bell"></i>
								</button>
								<button
									id="change-language"
									className="navbar__links__item"
								>
									vi
								</button>
								<button
									id="header-auth"
									className="navbar__links__item content-truncate"
									onClick={() =>
										onChangePageUrl('auth')
									}
								>
									{/* <i className="fa-regular fa-user"></i> */}
									Nguyên
								</button>
							</div>
						</div>
			</div>
				<div className="bg-primary [.fixed-top_&]:bg-opacity-50">
					<div className="container max-w-screen-xl">
						<div className="flex items-center justify-between h-[86px]">
							<Link to="/">
								<AtomLogo />
							</Link>
							<div className="flex justify-end flex-1">
								<nav className="flex-1 hidden min-w-0 menu-nav xl:block">
									<ul className="[&.menu]:static flex items-center justify-center menu h-100 m-0">
										<li
											className="item-menu"
											onClick={() =>
												onChangePageUrl('about')
											}
										>
											<span className="menu-item">
												Giới thiệu
											</span>
										</li>
										<li
											className="item-menu"
											onClick={() =>
												onChangePageUrl('news')
											}
										>
											<span className="menu-item">
												Tin tức
											</span>
										</li>

										<li
											className="item-menu"
											onClick={() =>
												onChangePageUrl('product')
											}
										>
											<span className="menu-item">
												Sản phẩm
											</span>
										</li>
										<li
											className="item-menu"
											onClick={() =>
												onChangePageUrl('project')
											}
										>
											<span className="menu-item">
												Dự án
											</span>
										</li>
										<li
											className="item-menu"
											onClick={() =>
												onChangePageUrl('recruitment')
											}
										>
											<span className="menu-item">
												Tuyển dụng
											</span>
										</li>

										{/* <span className="w-[1px] mx-6 h-4 bg-[#FFA800] opacity-50" /> */}
									</ul>
								</nav>
								<div className="flex items-center justify-center gap-1">
									{/* Locale */}
									<span className="inline-flex items-center justify-center cursor-pointer header-search w-9 h-9">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#FFA800"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
											/>
										</svg>
									</span>
									{/* Cart */}
									<span
										onClick={() =>
											onChangePageUrl('cart')
										}
										className="inline-flex items-center justify-center cursor-pointer header-search w-9 h-9"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#FFA800"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
											/>
										</svg>
									</span>
									{/* Search */}
									<span
										onClick={() =>
											setIsShowSearch(!isShowSearch)
										}
										className="inline-flex items-center justify-center cursor-pointer header-search w-9 h-9"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											fill="none"
										>
											<path
												d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
												stroke="#FFA800"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								</div>
								{/* hidden */}
								{isShowSearch && (
									<div
										className="search-component absolute right-0 justify-center
									w-full p-3 transition-all md:w-1/2 current-active:flex top-full bg-slate-600 dekstop-search current-active"
									>
										<div className="w-full">
											<div className="relative flex flex-wrap items-stretch w-full input-group">
												<input
													id="keyword"
													type="search"
													className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
													placeholder="Tìm kiếm"
													aria-label="Tìm kiếm"
													aria-describedby="button-addon2"
												/>
											</div>
											{/* <div className="bg-white">
												<ul
													className="max-h-72"
													id="autocomplete_result"
												></ul>
											</div> */}
										</div>
									</div>
								)}
								{/* Menu đa cấp */}
								{/*js thêm cho mỗi trang*/}

								<div className="inline-flex items-center flex-shrink-0 header-info flex-nowrap">
									<a
										id="hamburger"
										href="#menu"
										className="/h-[25px] /w-[25px] relative inline-flex xl:hidden items-center justify-center /before:bg-white /after:bg-white ml-5 uppercase"
										title="Menu"
									>
										<svg
											className="scale-110"
											width={40}
											height={29}
											viewBox="0 0 40 29"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="0.5"
												width={39}
												height={4}
												fill="white"
											/>
											<rect
												x="0.5"
												y={7}
												width={39}
												height={4}
												fill="white"
											/>
											<path
												d="M1.05682 17.2727H2.31818L5.28409 24.517H5.38636L8.35227 17.2727H9.61364V26H8.625V19.3693H8.53977L5.8125 26H4.85795L2.13068 19.3693H2.04545V26H1.05682V17.2727ZM12.9326 26V17.2727H18.1996V18.2102H13.9894V21.1591H17.9269V22.0966H13.9894V25.0625H18.2678V26H12.9326ZM28.2249 17.2727V26H27.2022L22.4465 19.1477H22.3613V26H21.3045V17.2727H22.3272L27.0999 24.142H27.1852V17.2727H28.2249ZM37.2669 17.2727H38.3237V23.0511C38.3237 23.6477 38.1831 24.1804 37.9018 24.6491C37.6234 25.1151 37.23 25.483 36.7214 25.7528C36.2129 26.0199 35.6163 26.1534 34.9317 26.1534C34.247 26.1534 33.6504 26.0199 33.1419 25.7528C32.6334 25.483 32.2385 25.1151 31.9572 24.6491C31.6788 24.1804 31.5396 23.6477 31.5396 23.0511V17.2727H32.5964V22.9659C32.5964 23.392 32.6902 23.7713 32.8777 24.1037C33.0652 24.4332 33.3322 24.6932 33.6788 24.8835C34.0283 25.071 34.4459 25.1648 34.9317 25.1648C35.4175 25.1648 35.8351 25.071 36.1845 24.8835C36.5339 24.6932 36.801 24.4332 36.9857 24.1037C37.1732 23.7713 37.2669 23.392 37.2669 22.9659V17.2727Z"
												fill="white"
											/>
										</svg>
									</a>
								</div>
								{/*  */}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpenCategory && (
				<div className="category-menu-component">
					category-menu-component
				</div>
			)}
		</>
	);
}

export default OrganismHeaderDB;
