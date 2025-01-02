import { Button, Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import {
  LoginOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CustomButon } from "../custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    nav(Paths.login);
    localStorage.removeItem("token");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space className={styles.iconWrapper}>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={1}>Дежурка</Typography.Title>
        </Link>
      </Space>

      {user ? (
        <div className={styles.nav}>
          <div className={styles.nav_link}>
            <Space>
              <Link
                className={styles.route_link}
                to={Paths.realEstate}
                // style={{
                //   color: "white",
                // }}
              >
                <span className={styles.navBtn}>Недвижимость</span>
              </Link>
            </Space>
            <Space>
              <Link
                className={styles.route_link}
                to={Paths.profile}
                // style={{
                //   color: "white",
                // }}
              >
                <span className={styles.navBtn}>Профиль</span>
              </Link>
            </Space>
          </div>
          <Space>
            <CustomButon
              type="default"
              icon={<LoginOutlined />}
              onClick={handleLogoutClick}
            >
              Выйти
            </CustomButon>
          </Space>
        </div>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButon
              type="text"
              icon={<UserAddOutlined />}
              className={styles.authBtn}
            >
              Зарегистрировать
            </CustomButon>
          </Link>
          <Link to={Paths.login}>
            <CustomButon
              type="text"
              icon={<LoginOutlined />}
              className={styles.authBtn}
            >
              Войти
            </CustomButon>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
