import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileUser  } from "./userActions";

const initialState = {
	user: [],
	user: {},
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
            // Read
			.addCase(fetchProfileUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProfileUser.fulfilled, (state, action) => {
                // console.log("fetchProfileUser.fulfilled ", action.payload)
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchProfileUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

	},
});

const userReducer = userSlice.reducer;

export default userReducer;
