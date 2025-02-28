import './CartPage.scss';
// // import React from 'react'
//
// function CartPage() {
//   return (
//     <>CardPage</>
//   )
// }
//
// export default CartPage

import { useState } from 'react';

const CartPage = () => {
	const [cart, setCart] = useState([
		{
			id: 1,
			name: 'Loa Karaoke JBL',
			price: 5000000,
			quantity: 1,
			checked: false
		},
		{
			id: 2,
			name: 'Micro Không Dây',
			price: 1500000,
			quantity: 2,
			checked: false
		},
		{
			id: 3,
			name: 'Mixer Digital',
			price: 3500000,
			quantity: 1,
			checked: false
		}
	]);

	// 🟢 Cập nhật số lượng sản phẩm
	const updateQuantity = (id, type) => {
		setCart(prevCart =>
			prevCart.map(item =>
				item.id === id
					? {
							...item,
							quantity:
								type === 'increase'
									? item.quantity + 1
									: Math.max(1, item.quantity - 1)
					}
					: item
			)
		);
	};

	// 🟢 Xóa sản phẩm khỏi giỏ hàng
	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id));
	};

	// 🟢 Toggle chọn sản phẩm
	const toggleCheck = id => {
		setCart(prevCart =>
			prevCart.map(item =>
				item.id === id ? { ...item, checked: !item.checked } : item
			)
		);
	};

	// 🟢 Tính tổng tiền của các sản phẩm đã chọn
	const totalPrice = cart.reduce(
		(sum, item) => (item.checked ? sum + item.price * item.quantity : sum),
		0
	);

	return (
		<div className="cart-page">
			<div className="cart-container">
				<h2>Giỏ Hàng</h2>

				{cart.length === 0 ? (
					<p>Giỏ hàng trống</p>
				) : (
					<>
						<table className='mt-3'>
							<thead>
								<tr>
									<th>Chọn</th>
									<th>Sản phẩm</th>
									<th>Giá</th>
									<th>Số lượng</th>
									<th>Tổng</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>
								{cart.map(item => (
									<tr key={item.id}>
										<td>
											<input
												type="checkbox"
												checked={item.checked}
												onChange={() =>
													toggleCheck(item.id)
												}
											/>
										</td>
										<td>{item.name}</td>
										<td>{item.price.toLocaleString()}đ</td>
										<td>
											<button
												onClick={() =>
													updateQuantity(
														item.id,
														'decrease'
													)
												}
											>
												-
											</button>
											<span className='quantity-product-cart'>{item.quantity}</span>
											<button
												onClick={() =>
													updateQuantity(
														item.id,
														'increase'
													)
												}
											>
												+
											</button>
										</td>
										<td>
											{(
												item.price * item.quantity
											).toLocaleString()}
											đ
										</td>
										<td>
											<button
												onClick={() =>
													removeItem(item.id)
												}
											>
												Xóa
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="cart-summary mt-2" >
							<h3>Tổng tiền: {totalPrice.toLocaleString()}đ</h3>
							<button disabled={totalPrice === 0} className='mt-1'>
								Thanh Toán
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CartPage;
