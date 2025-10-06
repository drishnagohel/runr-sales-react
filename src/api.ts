import axios from "axios";

const API_URL = "http://localhost/kohinoor-group-portal/api";
const API_URL_SALES = "http://localhost/runr_sales/api";


// Login 
export const login = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/login`, data);
  return response.data;
};

// Creator
export const getAllCreator = async (offset = 0, limit = 5, search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallcreator`, {
      offset,
      limit,
      search,
    });

    return response.data; 
    console.log(response.data);
    
  } catch (error) {
    return { status: false, data: [], count: 0 };
  } 
};
export const addCreator = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/addcreator`, data);
  return response.data;
};
export const updateCreator = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/updatecreator`, data);
  return response.data;
};
export const deleteCreator = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/deletecreator`, data);
  return response.data;
};
// Charts
export const getCreatorChart = async () => {
  const response = await axios.post(`${API_URL_SALES}/getCreatorChartData`);
  return response.data; // contains {status, count, data}
};
export const getSalesPersonChart = async () => {
  const response = await axios.post(`${API_URL_SALES}/getSalespersonChartData`);
  return response.data; // contains {status, count, data}
};
export const getSalesMangerChart = async () => {
  const response = await axios.post(`${API_URL_SALES}/getSalesmanagerChartData`);
  return response.data; // contains {status, count, data}
};
export const getClientChart = async () => {
  const response = await axios.post(`${API_URL_SALES}/getClientChartData`);
  return response.data; // contains {status, count, data}
};
export const getSalesChart = async () => {
  const response = await axios.post(`${API_URL_SALES}/getSalesChartData`);
  return response.data; // contains {status, count, data}
};

// Add Salesperson
export const addSalesperson = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/addsalesperson`, data);
  return response.data;
};
export const getAllSalesperson = async (offset = 0, limit = 5, search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallsalesperson`, {
      offset,
      limit,
      search,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, data: [], count: 0 };
  }
};
export const updateSalesperson = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/updatesalesperson`, data);
  return response.data;
};
export const deleteSalesperson = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/deletesalesperson`, data);
  return response.data;
};

//Client
export const addClient = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/addclient`, data);
  return response.data;
};
export const getAllClient = async (offset = 0, limit = 5, search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallclient`, {
      offset,
      limit,
      search,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, data: [], count: 0 };
  }
};
export const updateClient = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/updateclient`, data);
  return response.data;
};
export const deleteClient = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/deleteclient`, data);
  return response.data;
};

// Add Sales
export const addSales = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/addsales`, data);
  return response.data;
};
export const getAllSales = async (offset = 0, limit = 5, search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallsales`, {
      offset,
      limit,
      search,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, data: [], count: 0 };
  }
};
export const updateSales = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/updatesales`, data);
  return response.data;
};
export const deleteSales = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/deletesales`, data);
  return response.data;
};


// Add SMM
export const addSMM = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/addsalesmanager`, data);
  return response.data;
};
export const getAllSMM = async (offset = 0, limit = 5, search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallsalesmanager`, {
      offset,
      limit,
      search,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, data: [], count: 0 };
  }
};
export const updateSMM = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/updatesalesmanager`, data);
  return response.data;
};
export const deleteSMM = async (data) => {
  const response = await axios.post(`${API_URL_SALES}/deletesalesmanager`, data);
  return response.data;
};

// User
export const addUser = async (data) => {
  const response = await axios.post(`${API_URL}/adduser`, data);
  return response.data;
};
export const getAllUser = async () => {
  const response = await axios.post(`${API_URL_SALES}/getallusers`);
  return response.data; // contains {status, count, data}
};
export const updateUser = async (user_id, data) => {
  const payload = { ...data, user_id }; // include user_id in payload
  const response = await axios.post(`${API_URL_SALES}/updateuser`, payload);
  return response.data;
};

export const deleteUser = async (data) => {
  const response = await axios.post(`${API_URL}/deleteuser`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};



export const getAllProjectTypes = async () => {
  try {
    const response = await axios.post(`${API_URL}/getallprojecttype`);
    const result = response.data;

    if (result.status === 200) {
      return JSON.parse(atob(result.data)); // decode base64
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching project types:", error);
    return [];
  }
};

export const getAllRole = async () => {
  try {
    const response = await axios.post(`${API_URL}/listrole`);
    const result = response.data;

    if (result.status === 200) {
      return result.data; // assume it's already JSON
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const getAllSalesParson = async () => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallsalesmanager`);
    const result = response.data;

    if (result.status === 200) {
      return result.data; // assume it's already JSON
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const getAllParson = async () => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallsalesperson`);
    const result = response.data;

    if (result.status === 200) {
      return result.data; // assume it's already JSON
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const getAllCreatorDropdown = async () => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallcreator`);
    const result = response.data;

    if (result.status === 200) {
      return result.data; // assume it's already JSON
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const getAllClientDropdown = async () => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallclient`);
    const result = response.data;

    if (result.status === 200) {
      return result.data; 
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};


export const TotalCount = async (data) => {
  const response = await axios.post(`${API_URL}/count`, data);
  return response.data;
};

// export const Getallclientselect2 = async (data) => {
//   const response = await axios.post(`${API_URL_SALES}/getallclientselect2`, data);
//   return response.data;
// };

export const Getallclientselect2 = async (search = "") => {
  try {
    const response = await axios.post(`${API_URL_SALES}/getallclientselect2`, { search });
    return response.data; // [{ client_id, client_name }, ...]
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};

