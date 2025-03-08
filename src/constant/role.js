export const Role = {
	ADMIN: 'admin', // 1 Quản lý tổng thể	Dashboard, Quản lý sản phẩm, đơn hàng, nhân viên, báo cáo tài
	MANAGER: 'manager', // 2 Quản lý nhân viên, kho	Danh sách nhân viên, kho hàng, đơn hàng
	STAFF: 'staff', // 3 Hỗ trợ bán hàng	Xử lý đơn hàng, hỗ trợ khách hàng
	ACCOUNTANT: 'accountant', // 4 Quản lý tài chính	Hóa đơn, báo cáo doanh thu, công nợ
	CUSTOMER: 'customer', // 5 Đặt hàng, xem đơn	Lịch sử mua hàng, Wishlist
	GUEST: 'guest' // 6 Guest	Xem sản phẩm	Sản phẩm, giỏ hàng, thanh toán
};
