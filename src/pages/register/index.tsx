import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input/input";
import { CustomButon } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-message";
import ErrorMessage from "../../components/error-message";

type Registered = Omit<User, "id"> & { confirmPassword: string };

const Register = () => {
  const nav = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState<string>("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: Registered) => {
    try {
      await registerUser(data).unwrap();
      nav(Paths.home);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
    // if (user) {
    //   nav(Paths.home);
    // } else {
    //   setError("Пользователь уже существует");
    // }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title="Зарегистрируйтесь"
          style={{
            width: "30rem",
          }}
        >
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
            <CustomButon type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButon>
          </Form>

          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
