import axios from "axios";

const API = "http://localhost:4000/api/users";

export const getProfile = async () => {
  return axios.get(`${API}/profile`, {
    withCredentials: true,
  });
};

export const updateProfile = async (data) => {
  return axios.put(
    `${API}/profile`,
    data,
    {
      withCredentials: true,
    }
  );
};

//employee mgmt 

export const getEmployees =
  async () => {
    return axios.get(
      `${API}/employees`,
      {
        withCredentials: true,
      }
    );
  };

export const createEmployee =
  async (data) => {
    return axios.post(
      `${API}/employees`,
      data,
      {
        withCredentials: true,
      }
    );
  };

  export const updateEmployee =
  async (id, data) => {
    return axios.put(
      `${API}/employees/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  };

export const getEmployeeById =
  async (id) => {
    return axios.get(
      `${API}/employees/${id}`,
      {
        withCredentials: true,
      }
    );
  };

  export const deactivateEmployee =
  async (id) => {
    return axios.patch(
      `${API}/employees/${id}/deactivate`,
      {},
      {
        withCredentials: true,
      }
    );
  };

  export const reactivateEmployee = async (id) => {
  return axios.patch(
    `${API}/employees/${id}/reactivate`,
    {},
    {
      withCredentials: true,
    }
  );
};
  export const getAllAttendance = async () => {
  return axios.get(`${API}/attendance`, {
    withCredentials: true,
  });
};

export const deleteAttendance = async (id) => {
  return axios.delete(`${API}/${id}`, {
    withCredentials: true,
  }); // the rputer needs to be checked 
  // if it is present in the controller
};

export const updateAttendance = async (
  id,
  data
) => {
  return axios.put(
    `${API}/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
};

export const getManagers = async () => {
  return axios.get(
    `${API}/managers`,
    {
      withCredentials: true,
    }
  );
};

export const promoteEmployee = (
  id
) => {
  return axios.patch(
    `${API}/employees/${id}/promote`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getMyDepartmentEmployees = async () => {
  return axios.get(
    `${API}/manager/my-employees`,
    {
      withCredentials: true,
    }
  );
};