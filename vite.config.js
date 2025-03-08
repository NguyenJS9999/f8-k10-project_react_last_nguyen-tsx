import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path'; // ✅ Dùng path từ Node.js thay vì import từ 'path'

export default defineConfig({
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			// '@': path.resolve(__dirname, './src')
			'@': path.resolve(__dirname, 'src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	server: {
		historyApiFallback: true, // Hỗ trợ reload không bị lỗi 404
	},
});

