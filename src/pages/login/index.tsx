import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input/input";
import { CustomButon } from "../../components/custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title="Войдите"
          style={{
            width: "30rem",
          }}
        >
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButon type="primary" htmlType="submit">
              Войти
            </CustomButon>
          </Form>

          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
