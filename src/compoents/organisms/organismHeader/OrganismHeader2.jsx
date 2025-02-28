import './OrganismHeader2.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganismHeaderCategory from './multiMenu/OrganismHeaderCategory';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../features/products/productActions';
import AtomLogo from '../../atoms/AtomLoading/AtomLoading';
// import MoleculeAuthForm from '../../molecules/moleculeAuthForm/moleculeAuthForm';

function OrganismHeader2() {
	const nav = useNavigate();
	const dispatch = useDispatch();

	const [isOpenCategory, setIsOpenCategory] = useState(false);
	const CategoryRef = useRef(null);

	const [isOpenSearch, setisOpenSearch] = useState(false);
	const [isDelayedOpenSearch, setisDelayedOpenSearch] = useState(false);
	const searchRef = useRef(null);
	const timeoutRef = useRef(null); // Lưu timeout

	const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);

	const onChangePageUrl = urlPage => {
		console.log('onChangePageUrl urlPage: ', urlPage);
		// Mở ui danh mục sp riêng
		if (urlPage === 'product') {
			setIsOpenCategory(!isOpenCategory);
			setisOpenSearch(false);
		} else {
			setIsOpenCategory(false);
			setisOpenSearch(false);
			nav(`/${urlPage}`);
		}
	};

	const handleShowSearch = () => {
		setisOpenSearch(prev => !prev);
		// Nếu timeout trước đó tồn tại => Xóa trước khi đặt timeout mới
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		// Tạo độ trễ trước khi mở `isDelayedOpenSearch`
		timeoutRef.current = setTimeout(() => {
			setisDelayedOpenSearch(prev => !prev);
		}, 1000);
	};

	// Đóng search box khi click ngoài
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				setisOpenSearch(false);
				setisDelayedOpenSearch(false);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Đóng menu khi click ra ngoài
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				CategoryRef.current &&
				!CategoryRef.current.contains(event.target)
			) {
				setIsOpenCategory(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	function handleSearchProduct(event) {
		const querryText = event.target.valuel;
		console.log('handleSearchProduct querryText: ', querryText);
		if (event) {
			const searchParams = { _q: querryText };
			dispatch(fetchProducts(searchParams));
		}
	}

	function handleRidirect(path) {
		if (path === '/search') {
			nav(`/${path}`);
		}
	}

	function handleAuth() {
		console.log('handleAuth');
		setIsOpenModalAuth(!isOpenModalAuth);
	}
	return (
		<>
			<div className="organism-header">
				<div className="organism-wrapper">
					<div className="header-section" id="header-one">
						<div className="container">
							<div className="navbar__links">
								<button
									className="navbar__links__item"
									id="header-noti"
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
									onClick={handleAuth}
								>
									<i className="fa-regular fa-user"></i>
									{/* Nguyên */}
								</button>
							</div>
						</div>
					</div>

					<div className="header-section" id="header-two">
						<div className="header-main container">
							<AtomLogo />
							{/* Center */}
							{/* <div id="search-header">
								<input type="text" placeholder="Search" />
							</div> */}
							<div className="b_menu__list">
								<button
									onClick={() => onChangePageUrl('about')}
									className="b_menu__item"
								>
									Giới thiệu
								</button>
								<button
									onClick={() => onChangePageUrl('news')}
									className="b_menu__item"
								>
									Tin tức
								</button>
								<button
									onClick={() => onChangePageUrl('product')}
									className="b_menu__item"
									// onMouseEnter={() => setIsOpenCategory(true)}
									// onMouseLeave={() => setIsOpenCategory(false)}
									// onFocus={() => setIsOpenCategory(true)} // Hỗ trợ bàn phím
									// onBlur={() => setIsOpenCategory(false)} // Khi mất focus
									// ref={CategoryRef}
								>
									Sản phẩm
								</button>
								<button
									onClick={() => onChangePageUrl('project')}
									className="b_menu__item"
								>
									Dự án
								</button>
								<button
									onClick={() =>
										onChangePageUrl('recruitment')
									}
									className="b_menu__item"
								>
									Tuyển dụng
								</button>
							</div>

							<div className="header-right">
								<button
									id="header-search"
									onClick={handleShowSearch}
								>
									{isOpenSearch ? (
										<i className="fa-solid fa-xmark"></i>
									) : (
										<i className="fa-solid fa-magnifying-glass"></i>
									)}
								</button>
								<button id="header-location">
									<i className="fa-solid fa-location-dot"></i>
								</button>

								<button id="header-cart" onClick={handleRidirect('cart')}>
									<i className="fa-solid fa-cart-shopping"></i>
								</button>
							</div>
						</div>
					</div>

					<div
						id="header-three"
						className={`${
							isOpenSearch && 'show-header-search'
						} "header-section b_menu--sub"`}
					>
						{isDelayedOpenSearch && (
							<div className="search-header-container container">
								<button className="search-header-icon">
									<i className="fa-solid fa-magnifying-glass"></i>
								</button>
								<input
									type="text"
									placeholder="Tìm kiếm"
									className="search-header-component"
									onChange={event =>
										handleSearchProduct(event)
									}
								/>
							</div>
						)}
					</div>

					{isOpenCategory && <OrganismHeaderCategory />}
					{/*  */}
				</div>
			</div>

			{/* { isOpenModalAuth && <MoleculeAuthForm />} */}
		</>
	);
}

export default OrganismHeader2;
