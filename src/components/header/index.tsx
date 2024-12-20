import { Button, Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import { TeamOutlined } from "@ant-design/icons";
import { CustomButon } from "../custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space className={styles.iconWrapper}>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={1}>Сотрудники</Typography.Title>
        </Link>
      </Space>

      <Space>
        <Link to={Paths.register}>
          <CustomButon type="default">Регистрация</CustomButon>
        </Link>
        <Link to={Paths.login}>
          <CustomButon type="default">Войти</CustomButon>
        </Link>
      </Space>
    </Layout.Header>
  );
};

export default Header;
