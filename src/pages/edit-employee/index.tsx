import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import Layout from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-message";
import { CustomButon } from "../../components/custom-button";
import { LogoutOutlined } from "@ant-design/icons";

export const EditEmployee = () => {
  const nav = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState<string>("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) return <div>Загрузка...</div>;

  const handleEdit = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();
      nav(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Link to={"/"}>
        <CustomButon type="default" icon={<LogoutOutlined />}>
          Вернуться назад
        </CustomButon>
      </Link>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="редактировать"
          error={error}
          employee={data}
          onFinish={handleEdit}
        />
      </Row>
    </Layout>
  );
};
