import instance from ".";

const handleRequest = async (callback) => {
	try {
		const res = await callback();
        console.log('handleRequest res:', res);
		return { success: true, data: res.data, error: null };
	} catch (error) {
        console.log('handleRequest error:', error);
		let errorMessage = "Something went wrong!";
		let errorData = null;

		if (error.response) {
			errorMessage = error.response.data?.message || "Request failed";
			errorData = error.response.data;
		} else {
			errorMessage = error.message;
		}

		return { success: false, data: null, error: { message: errorMessage, details: errorData } };
	}
};

// API Calls
export const getAllItems = (path ,params = {}) => handleRequest(() => instance.get(`/${path}`, { params }));
export const getOneItem = (path ,id) => handleRequest(() => instance.get(`/${path}/${id}`));
export const addItem = (path ,product) => handleRequest(() => instance.post(`/${path}`, product));
export const updateItem = (path ,id, product) => handleRequest(() => instance.patch(`/${path}/${id}`, product));
export const deleteItem = (path ,id) => handleRequest(() => instance.delete(`/${path}/${id}`));
