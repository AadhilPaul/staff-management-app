import React, { useState, useEffect } from "react";
import AppBar from "../../components/Navbar/AppBar";
import { Typography, Card } from "antd";
import styles from "./Profile.module.css";
import getUserDetails from "../../utils/user-details";

const { Title, Text } = Typography;

const Profile: React.FC = () => {
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

  console.log(userDetails?.profile_pic);
  return (
    <div>
      <AppBar />
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.flex}>
            <div id="profile_pic">
              <img
                src={`http://127.0.0.1:8000/${userDetails?.profile_pic}`}
                alt=""
              />
            </div>
            <div id="content">
                <Title>{userDetails?.username}</Title>
                <Text>{userDetails?.email}</Text>
                <Text>{userDetails?.role}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
