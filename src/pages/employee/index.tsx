import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import { CustomButon } from "../../components/custom-button";
import { DeleteFilled, EditOutlined, HomeOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/error-message";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-message";
import { Loader } from "../../ui/loader";

export const EmployeeDetail = () => {
  const nav = useNavigate();
  const [error, setError] = useState<string>("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const user = useSelector(selectUser);

  console.log(data, "sdcsdc");

  if (isLoading) return <Loader />;

  if (!data) return <Navigate to={"/"} />;

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    hideModal();
    try {
      await deleteEmployee(data.id).unwrap();
      nav(`${Paths.status}/deleted`);
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
      <CustomButon type="default" icon={<HomeOutlined />}>
        Недвижимости данного сотрудника
      </CustomButon>
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>

        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Опыт работы" span={3}>
          {data.experiens}
        </Descriptions.Item>
        <Descriptions.Item label="Кол-во продаж" span={3}>
          {data.sales}
        </Descriptions.Item> */}
      </Descriptions>

      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButon shape="round" type="default" icon={<EditOutlined />}>
                Редактировать
              </CustomButon>
            </Link>
            <CustomButon
              type="default"
              icon={<DeleteFilled />}
              shape="round"
              danger
              onClick={showModal}
            >
              Удалить
            </CustomButon>
          </Space>
        </>
      )}

      <ErrorMessage message={error} />
      <Modal
        title="Потвердите удаление"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Потвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника?
      </Modal>
    </Layout>
  );
};
