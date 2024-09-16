import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu: React.FC= () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="dashboard"><Link to='/'>Dashboard</Link></Menu.Item>
      <Menu.Item key="notifications"><Link to='/notifications'>Notifications</Link></Menu.Item>
      <Menu.Item key="deadlines"><Link to='/deadlines'>Deadlines</Link></Menu.Item>
      <Menu.Item key="apply-for-loa"><Link to='/apply-for-loa'>Apply For LOA</Link></Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
