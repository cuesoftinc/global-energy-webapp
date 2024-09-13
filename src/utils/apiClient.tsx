import axios from "axios";
import Cookies from "js-cookie";
const accessToken = Cookies.get("gblATK");
const refreshToken = Cookies.get("glbRTK");

const confiG = {
	headers: {
		"Content-Type": "application/json",
	},
	credentials: "same-origin",
};

const getRequest = async (url: string) => {
	try {
		const response = await axios.get(url, confiG);
		return response.data;
	} catch (error) {
		return error;
	}
};

const getAuthRequest = async (url: string) => {
	const AuthConfig = {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
		},
	};
	try {
		const response = await axios.get(url, AuthConfig);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

const postRequest = async (url: string, data: object) => {
	try {
		const response = await axios.post(url, data, confiG);
		return response.data;
	} catch (error) {
		return error;
	}
};

const postAuthRequest = async (
	url: string,
	data: object,
	accessToken: string,
	refreshToken: string
) => {
	const AuthConfig = {
		headers: {
			"Content-Type": "application/json",
			token: accessToken,
			refreshtoken: refreshToken,
		},
		credentials: "same-origin",
	};
	try {
		const response = await axios.post(url, data, AuthConfig);
		return response.data;
	} catch (error) {
		return error;
	}
};

const FormDataPostRequest = async (
	url: string,
	data: FormData,

) => {
	const AuthConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "multipart/form-data",
		},
	};
	try {
		const response = await axios.post(url, data, AuthConfig);
		return response.data;
	} catch (error) {
		return error;
	}
}

const putAuthRequest = async (
	url: string,
	data: object,
) => {
	const authConfig = {
		headers: {
			"Content-Type": "application/json",
			token: accessToken,
			refreshtoken: refreshToken,
		},
		credentials: "same-origin",
	};
	try {
		const response = await axios.put(url, data, authConfig);
		return response.data;
	} catch (error) {
		return error;
	}
};

const deleteAuthRequest = async (
	url: string,
) => {
	const authConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		credentials: "same-origin",
	};
	try {
		const response = await axios.delete(url, authConfig);
		return response.data;
	} catch (error) {
		return error;
	}
};


export { getRequest, getAuthRequest, postRequest, postAuthRequest, FormDataPostRequest, putAuthRequest, deleteAuthRequest };
