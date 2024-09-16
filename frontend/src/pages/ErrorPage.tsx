import React from "react";
import { Empty, Typography } from "antd";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "../components/Navbar/AppBar";

const { Link } = Typography;

const ErrorPage: React.FC<{ content?: string | null }> = ({ content }) => {
  return (
    <div>
      <AppBar />
      <div
        style={{
          height: "80vh",
          paddingBottom: "10rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Empty />
        {content ? (
          <p>
            <Link><RouterLink to="/login">Login Here</RouterLink></Link> to see your{" "}
            {content}
          </p>
        ) : (
          <p>Sorry, the page you are looking for does not exist.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
