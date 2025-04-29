import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routers/ProtectedRoute";
import { Role } from "@/constant/role";

// Layouts
import AdminLayout from "@/layouts/adminLayout/AdminLayout";
import StaffLayout from "@/layouts/staffLayout/StaffLayout";
import AccountantLayout from "@/pages/accountant/salesReport/SalesReport";
import ClientLayout from "@/layouts/clientLayout/ClientLayout";
// Pages
import LoginPage from "@/pages/auth/loginPage/LoginPage";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import ProductTable from "@/pages/admin/productTable/ProductTable";
import OrderList from "@/pages/admin/orderList/OrderList";

import StaffOrderList from "@/pages/staff/staffOrderList/StaffOrderList";
import SupportPage from "@/pages/staff/supportPage/SupportPage";
import InvoiceList from "@/pages/accountant/invoiceList/InvoiceList";
import SalesReport from "@/pages/accountant/salesReport/SalesReport";
import NotFoundPage from "@/pages/NotFoundPage";
import CustomerOrders from "@/pages/customer/customerOrders/CustomerOrders";
import AccountSettings from "@/pages/customer/AccountSettings/AccountSettings";
import RegisterForm from "@/pages/auth/registerPage/RegisterPage";
import HomePage from "@/pages/client/homePage/HomePage";
import CartPage from "@/pages/client/cartPage/CartPage";
import ProductForm from "@/pages/admin/productForm/ProductForm";
import ProductAdd from "@/pages/admin/productAdd/ProductAdd";
import RecruitmentPage from "@/pages/client/recruitmentPage/RecruitmentPage";

const AppRouter = () => {
  return (

      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterForm />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={[
          Role.ADMIN,
          Role.MANAGER
        ]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="products/add" element={<ProductAdd />} />

            <Route path="orders" element={<OrderList />} /> {/* Có thể đặt hàng ? */}
          </Route>
        </Route>


        {/* Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={[
          Role.ADMIN,
          Role.MANAGER,
          Role.STAFF,
        ]} />}>
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffOrderList />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
        </Route>

        {/* Accountant Routes */}
        <Route element={<ProtectedRoute allowedRoles={[
          Role.ADMIN,
          Role.MANAGER,
          Role.ACCOUNTANT,
        ]} />}>
          <Route path="/accountant" element={<AccountantLayout />}>
            <Route index element={<InvoiceList />} />
            <Route path="sales-report" element={<SalesReport />} />
          </Route>
        </Route>

        {/* Customer = client Routes */}
        <Route element={<ProtectedRoute allowedRoles={[
          Role.ADMIN,
          Role.MANAGER,
          Role.STAFF,
          Role.ACCOUNTANT,
          Role.CUSTOMER,
          Role.GUEST,
        ]} />}>
          <Route path="/user/account" element={<ClientLayout />}>
            <Route index path="profile" element={<AccountSettings />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="purchase" element={<CustomerOrders />} />

            {/* <Route path="purchase/order/:id" element={<CustomerOrderDetail />} ></Route> */}
          </Route>
        </Route>

        {/* Guest Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="products" element={<ProductTable />} /> */}
          <Route path="recruitment" element={<RecruitmentPage />} />

          {/* <Route path="/notifications/order" element={<CartPage />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
  );
};

export default AppRouter;