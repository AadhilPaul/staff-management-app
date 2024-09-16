import React from "react";
import AppBar from "../components/Navbar/AppBar";
import { Empty } from "antd";

const Dashboard: React.FC = () => {
    return (
        <div>
            <AppBar/>
            <Empty/>
        </div>
    )
}

export default Dashboard;