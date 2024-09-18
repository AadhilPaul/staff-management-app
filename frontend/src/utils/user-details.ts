import axiosInstance from "./axios"

interface UserDetails {
    id: number,
    username: string,
    email: string;
    role: string;
    phone_number: string;
    profile_pic: string;
}

const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get<UserDetails>("user-details/");
      const data = response.data
      console.log(data)
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        profile_pic: data.profile_pic,
        role: data.role
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return null;
    }
  };


export default getUserDetails;
