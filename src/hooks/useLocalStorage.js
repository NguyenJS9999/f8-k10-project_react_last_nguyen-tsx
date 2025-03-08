import { useState, useEffect } from 'react';

// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
    // 🟢 useState: Lấy giá trị từ localStorage nếu có, nếu không dùng giá trị mặc định
    const [value, setValue] = useState(() => {
        try {
            // Lấy dữ liệu từ localStorage
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error(`Lỗi khi đọc localStorage key: ${key}`, error);
        }
    });

    // 🔵 useEffect: Mỗi khi 'key' hoặc 'value' thay đổi, lưu giá trị vào localStorage
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Lỗi khi lưu vào localStorage key: ${key}`, error);
        }
    }, [key, value]);

    // 🟣 Trả về giá trị hiện tại và hàm setValue để cập nhật giá trị
    return [value, setValue];
}


export default useLocalStorage;


// setAccessToken(res?.data?.accessToken); // Localstorage
// setUser(res?.data?.user); // Localstorage