import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../services';
// import axios from 'axios';

// Action Đăng ký
export const registerUser = createAsyncThunk( 'auth/createUser', async (userData, { rejectWithValue }) => {
    console.log("Action registerUser userData", userData);
            try {
            const response = await instance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration Failed');
        }
    }
);

// Action Đăng nhập
export const loginUser = createAsyncThunk( 'auth/fetchUser', async (userData, { rejectWithValue }) => {
        console.log("Action loginUser userData", userData);
        try {
            const response = await instance.post('/auth/login', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login Failed');
        }
    }
);
