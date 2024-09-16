import React from "react";
import styles from "./AppBar.module.css";
import { Layout, Button } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/authenticated";

const AppBar: React.FC = ({}) => {
  return (
    <nav className={styles.navbar}>
      <Layout>
        <Layout.Header className={styles.navHeader}>
          <div className={styles.logo}>
            <h3>Staff Management</h3>
          </div>
          <div className={styles.navbarMenu}>
            <div className={styles.leftMenu}>
              <LeftMenu mode={"horizontal"} />
            </div>
            {isAuthenticated() ? (
              <div className={styles.rightMenu}>
                <RightMenu mode={"horizontal"} />
              </div>
            ) : (
              <div className={styles.rightMenu}>
                <Link to="/login">
                  <Button size="large" shape="default" type="link">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="large" shape="default" type="primary">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default AppBar;
