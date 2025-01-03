import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButon } from "../../components/custom-button";
import Layout from "../../components/layout";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const columns = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адресс",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Опыт работы",
    dataIndex: "experiens",
    key: "address",
  },
  {
    title: "Кол-во продаж",
    dataIndex: "sales",
    key: "address",
  },
];

export const Employees = () => {
  const nav = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading, error } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      nav(Paths.login);
    }
  }, [nav, user]);

  const goToAddEmployee = () => {
    nav(Paths.emloyeeAdd);
  };

  return (
    <Layout>
      <CustomButon
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={goToAddEmployee}
      >
        Добавить сотрудника
      </CustomButon>

      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(employee) => {
          return {
            onClick: () => nav(`${Paths.emloyee}/${employee.id}`),
          };
        }}
      />
    </Layout>
  );
};
