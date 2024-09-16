import axiosInstance from "./axios"

interface UserDetails {
    id: number,
    username: string,
    email_address: string;
}

const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get<UserDetails>("user-details/");
      const data = response.data
      return {
        id: data.id,
        username: data.username,
        email: data.email_address,
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return null;
    }
  };


export default getUserDetails;