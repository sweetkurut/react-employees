import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input";
import ErrorMessage from "../error-message";
import { CustomButon } from "../custom-button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  error?: string;
  employee?: T;
  title: string;
};

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput type="text" name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput type="text" name="address" placeholder="Адресс" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButon htmlType="submit">{btnText}</CustomButon>
        </Space>
      </Form>
    </Card>
  );
};
