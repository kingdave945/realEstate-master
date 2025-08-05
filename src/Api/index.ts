
import api from "./Interceptor";
//import { loginForm, onboardForm, updateInfo } from "../Types";
import { saveUserDetails } from "./saveDetails";


interface formData {
  email: string;
  password: string;
}
// interface messageform{
//   propertyId: string;
//   content: string;
//     receiverEmail: string;
// }
interface TwoFA{
  email: string;
  code: string;
}

interface registerData {
  email: string;
  password: string;
  fullName: string;
  userName: string;
  phoneNumber: string;
}
// export const registerAdmin = async (formData:registerData) => {
//   try {
//     const response = await api.post(`/api/Auth/register-admin`, formData);
//     //saveUserDetails("Adtoken", response.data.token);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const registerAgent = async (formData:registerData) => {
//   try {
//     const response = await api.post(`/api/Auth/register-agent`, formData);
//     //saveUserDetails("Adtoken", response.data.token);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const register = async (formData:registerData) => {
  try {
    const response = await api.post(`/api/Auth/register`, formData);
    //saveUserDetails("Adtoken", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const getRoleId = async () => {
//   try {
//     const response = await api.get(`​/api​/Auth​/roles`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getProperties = async (location:any,pageNumber:any,pageSize:any) => {
  try {
    const response = await api.get(`/api/Properties/search?location=${location}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    //saveUserDetails("Adtoken", response.data.token);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getimage = async (id:any) => {
  try {
    const response = await api.get(`api/Upload/image/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const sendMessage = async (email: string, message: { propertyId: number; content: string }) => {
  try {
   
    const response = await api.post(`/api/Messages/send?email=${email}`, message);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// export const getMessages = async (email:string,pageNumber:any) => {
//   try {
//     const response = await api.get(`/api/Messages/sent?email=${email}&pageNumber=${pageNumber}&pageSize=10`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const getMessages = async (email: string, pageNumber: number) => {
  try {
    const response = await api.get(
      `/api/Messages/received?email=${email}&pageNumber=${pageNumber}&pageSize=10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ​/api​/Messages​/sent
export const getListing = async (
  agentId: number,
  location = "",
  pageNumber = 1,
  pageSize = 10
) => {
  const token = localStorage.getItem("Adtoken");

  const res = await api.get(
    `/api/Agent/${agentId}/properties`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        location,
        pageNumber,
        pageSize,
      },
    }
  );

  return res.data;
};



export const getProperty = async (id:any) => {
  try {
    const response = await api.get(`/api/Properties/${id}`);
    //saveUserDetails("Adtoken", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const resendconfirmemail = async (email:string) => {
  try {
    const response = await api.post(`/api/Auth/resend-confirmation`, { email });
    //saveUserDetails("Adtoken", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const disableAccount = async (password: string) => {
  try {
    const response = await api.delete(`/api/Auth/disable-account`, {
      data: { password },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWatchlist = async (propertyId: number, email: string) => {
  try {
    const response = await api.delete(
      `/api/Watchlist/remove?email=${encodeURIComponent(email)}&propertyId=${propertyId}`
    );
    console.log("Deleted Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to delete watchlist:", error.response?.data || error.message);
    throw error;
  }
};
export const deleteProperty = async (id: number) => {
  try {
    const response = await api.delete(`/api/Properties/${id}`);
    console.log("✅ Deleted Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to delete property:", error.response?.data || error.message);
    throw error;
  }
};



export const addToWatchlist = async (propertyId: number, email: string) => {
  try {
    console.log("🟢 Sending watchlist payload:", { propertyId, email });

    const response = await api.post(
      `/api/Watchlist/add?email=${encodeURIComponent(email)}`,
      { propertyId }
    );

    console.log("✅ Add to watchlist response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Add to watchlist failed:", error.response?.data || error.message);
    throw error;
  }
};

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePicture", file); // must match `[FromForm] IFormFile profilePicture` on backend

  const response = await api.post(`/api/ProfilePicture/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // expected: { filePath: "uploads/profile-pictures/xxx.jpg" }
};

export const receivedWatchlist = async (email: string, pageNumber: number) => {
  try {
    const response = await api.get(
      `/api/Watchlist/my?email=${email}&pageNumber=${pageNumber}&pageSize=10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(`/api/Auth/forgot-password`, {
      data: { email },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};






export const TwoFAVerification = async (formData:TwoFA) => {
  try {
    const response = await api.post(`/api/Auth/verify-2fa`, formData);
    saveUserDetails("2fa", response.data);
    switch (response.data.roles[0]) {
      case "User":
        saveUserDetails("Ustoken", response.data.token);
    saveUserDetails("user", response.data.user);
        break;
        case "Agent":
        saveUserDetails("Agtoken", response.data.token);
    saveUserDetails("agent", response.data.user);
        break;
        case "Admin":
        saveUserDetails("Adtoken", response.data.token);
    saveUserDetails("admin", response.data.user);
        break;
    
      default:
        break;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const loginUser = async (formData: formData) => {
  try {
    const response = await api.post(`/api/Auth/login-user`, formData);
    //console.log(response)
    return response.data;
  } catch (error:any) {
    // console.log();
    saveUserDetails("notconfirmed",error.response?.data.message)
    if (error.response?.data === "2FA Required") {
      throw new Error("2FA Required");
    }
    throw error;
  }
};
export const loginAgent = async (formData: formData) => {
  try {
    const response = await api.post(
      `/api/Auth/login-agent`,
      formData
    );
    saveUserDetails("Agtoken", response.data.token);
saveUserDetails("agent", response.data.agent);

    return response.data;
  } catch (error:any) {
    saveUserDetails("notconfirmed",error.response?.data.message)
    if (error.response?.data === "2FA Required") {
      throw new Error("2FA Required");
    }
    throw error;
  }
};
export const loginAdmin = async (formData: formData) => {
  try {
    const response = await api.post(
      `api/Auth/login-admin`,
      formData
    );
    return response.data;
  } catch (error:any) {
    saveUserDetails("notconfirmed",error.response?.data.message)
    if (error.response?.data === "2FA Required") {
      throw new Error("2FA Required");
    }
    throw error;
  }
};


