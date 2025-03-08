import { addUser, deleteUser, getAllUsers, getProfileUser, updateUser } from "@/services/userServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	return await getAllUsers();
});

export const fetchProfileUser = createAsyncThunk("users/fetchProfileUser", async () => {
	// console.log("Action getProfileUser")
	return await getProfileUser();
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
	return await addUser(user);
});

export const editUser = createAsyncThunk("users/editUser", async ({ id, user }) => {
	return await updateUser(id, user);
});

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
	await deleteUser(id);
	return id;
});
