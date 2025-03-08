/**
<Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterForm />} />

        {/* Admin Routes */}
		    {/* Layout khách đã đăng nhập */}
        <Route element={<ProtectedRoute allowedRoles={[Role.CUSTOMER,Role.ADMIN,Role.MANAGER]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="orders" element={<OrderList />} /> {/* Có thể đặt hàng */}

            {/* <Route path="employees" element={<EmployeeList />} /> */}
            {/* <Route path="finance" element={<FinanceReport />} /> */}
            {/* <Route path="customers" element={<CustomerList />} /> */}
          </Route>
        </Route>

        {/* Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={[Role.MANAGER]} />}>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<OrderManagement />} />
            <Route path="stock" element={<StockManagement />} />
          </Route>
        </Route>

        {/* Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={[Role.STAFF]} />}>
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffOrderList />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
        </Route>

        {/* Accountant Routes */}
        <Route element={<ProtectedRoute allowedRoles={[Role.ACCOUNTANT]} />}>
          <Route path="/accountant" element={<AccountantLayout />}>
            <Route index element={<InvoiceList />} />
            <Route path="sales-report" element={<SalesReport />} />
          </Route>
        </Route>

        {/* Customer = client Routes */}
        <Route element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}>
          <Route path="/customer" element={<ClientLayout />}>
            <Route index element={<CustomerOrders />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
        </Route>

        {/* Guest Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

*/