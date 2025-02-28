import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css'; // Import CSS từ Ant Design

// Import file CSS của Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// (Tùy chọn) Nếu bạn đã cài Bootstrap Icons, hãy import thêm:
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
