import React from "react";
import { Empty, Typography } from "antd";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "../components/Navbar/AppBar";

const { Text, Link } = Typography;

const ErrorPage: React.FC<{ content?: string | null }> = ({ content }) => {
  return (
    <div>
      <AppBar />
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
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
