import React from "react";
import Layout from "../../components/layout";
import { CustomButon } from "../../components/custom-button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Paths } from "../../paths";
import { useGetAllRealEstatesQuery } from "../../app/services/real-estate";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Серия",
    dataIndex: "series",
    key: "series",
  },
  {
    title: "Тип",
    dataIndex: "type",
    key: "type",
  },
];

export const RealEstate = () => {
  const nav = useNavigate();
  const { data, isLoading } = useGetAllRealEstatesQuery();

  return (
    <Layout>
      <CustomButon
        type="primary"
        icon={<PlusCircleOutlined />}
        // onClick={goToAddEmployee}
      >
        Добавить недвижимость
      </CustomButon>

      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        // onRow={(employee) => {
        //   return {
        //     onClick: () => nav(`${Paths.realEstate}/${employee.id}`),
        //   };
        // }}
      />
    </Layout>
  );
};
