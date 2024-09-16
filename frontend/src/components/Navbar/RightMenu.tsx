import { Menu, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import getUserDetails from "../../utils/user-details";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const RightMenu: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{
    username: string;
    email: string;
    id: number;
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
        navigate('/login')
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Handle logout error, such as displaying a message to the user
      });
  };

  return (
    <Menu
      style={{ width: "10rem" }}
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
                { icon: <UserOutlined />, key: "1", label: "Profile" },
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
