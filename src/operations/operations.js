import axios from "axios";

axios.defaults.baseURL = "https://1d41-92-244-109-27.ngrok-free.app";

let token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const signUp = async (data) => {
  const response = await axios.post("signup/", data);
  localStorage.setItem("token", response.data.token);
  token.set(response.data.token);

  return response.data;
};
export const logIn = async (data) => {
  const response = await axios.post("login/", data);
  if (response.status !== 200) {
    return response.statusText
  } else if (response.status === 200) {
     token.set(response.data.token);
  localStorage.setItem("token", response.data.token);
  return response.data;
  }
};

export const getUserTasks = async (userId) => {
  const token = localStorage.getItem("token");
  const headers = {
    "ngrok-skip-browser-warning": "1223",
    Authorization: `Token ${token}`,
  };
  const response = await axios.get(`/api/users/${userId}/task/`, {
    headers: headers,
  });
console.log(response.data);
  return response.data;
};
export const addTask = async (userId, data) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios.post(`api/users/${userId}/task/`, data, {
    headers: headers,
  });
  return response.data;
};

export const updateTask = async (userId, taskId, data) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Token ${token}`,
  };
  console.log(userId);
  const response = await axios.patch(
    `api/users/${userId}/task/${taskId}/`,
    data,
    {
      headers: headers,
    }
  );
  return response.data;
};

export const deleteTask = async (userId, taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios.delete(`api/users/${userId}/task/${taskId}`, {
    headers: headers,
  });
  return response.data;
};

export const logOut = async () => {
  const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
  };
  const response = await axios.post('/logout/', { headers: headers });
  if (response.status === 200) {
    localStorage.removeItem("token");
  }
  return response;
}