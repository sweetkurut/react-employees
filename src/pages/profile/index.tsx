import React from "react";
import { Card, Avatar, Typography, Row, Col } from "antd";
import Layout from "../../components/layout";

const { Title, Text } = Typography;

interface ProfileProps {
  role: "employee" | "admin"; // Роли: сотрудник или администратор
  email: string;
  password: string;
  fullName: string;
  avatar: string;
  salesCount: number;
  realEstateCount: number;
  employeesCount?: number; // Только для администратора
}

export const Profile: React.FC<ProfileProps> = ({
  role,
  email,
  password,
  fullName,
  avatar,
  salesCount,
  realEstateCount,
  employeesCount,
}) => {
  return (
    <Layout>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card
            style={{ borderRadius: 10 }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar size={120} src={avatar} style={{ marginBottom: 20 }} />
            <Title level={3}>{fullName}</Title>
            <Text>Email: {email}</Text>
            <Text>Пароль: {password}</Text>
            <Row gutter={16} style={{ marginTop: 20, width: "100%" }}>
              <Col span={12}>
                <Card bordered={false} style={{ textAlign: "center" }}>
                  <Text strong>Продажи</Text>
                  <Title level={4}>{salesCount}</Title>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ textAlign: "center" }}>
                  <Text strong>Объекты</Text>
                  <Title level={4}>{realEstateCount}</Title>
                </Card>
              </Col>
            </Row>
            {role === "admin" && (
              <Row style={{ marginTop: 20, width: "100%" }}>
                <Col span={24}>
                  <Card bordered={false} style={{ textAlign: "center" }}>
                    <Text strong>Сотрудники</Text>
                    <Title level={4}>{employeesCount}</Title>
                  </Card>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
