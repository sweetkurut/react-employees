import { Row } from "antd";
import Layout from "../../components/layout";
import { EmployeeForm } from "../../components/employee-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Paths } from "../../paths";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-message";

export const AddEmployee = () => {
  const [error, setError] = useState("");
  const nav = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      nav(Paths.login);
    }
  }, [nav, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      nav(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Не удалось добавить сотрудника");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
