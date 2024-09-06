import React from "react";
import { Empty } from "antd";

const ErrorPage: React.FC = () => {
  return (
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
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default ErrorPage;
