import { Menu, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import getUserDetails from "../../utils/user-details";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const RightMenu: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{
    id: number;
    username: string;
    email: string;
    role: string;
    phone_number: string;
    profile_pic: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    };

    fetchUserData();
  }, []);

  const logoutUser = () => {
    axiosInstance
      .post("logout/blacklist/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Handle logout error, such as displaying a message to the user
      });
  };

  const goProfile = () => {
    navigate('/profile')
  }

  return (
    <Menu
      style={{ width: "10rem", padding: "0" }}
      mode="inline"
      items={[
        {
          key: "sub1",
          label: userDetails?.username,
          icon: <UserOutlined />,
          children: [
            {
              key: "g1",
              type: "group",
              children: [
                { icon: <UserOutlined />, key: "1", label: "Profile", onClick: goProfile },
                { icon: <CodeOutlined />, key: "2", label: "Settings" },
                {
                  icon: <LogoutOutlined />,
                  key: "3",
                  label: "Logout",
                  onClick: logoutUser,
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};

export default RightMenu;
