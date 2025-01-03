import { Employee } from "@prisma/client";
import {
  Avatar,
  Button,
  Card,
  Form,
  message,
  Space,
  Upload,
  UploadProps,
} from "antd";
import { CustomInput } from "../custom-input";
import ErrorMessage from "../error-message";
import { CustomButon } from "../custom-button";
import { useState } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Получаем URL загруженного файла (например, от сервера)
      const url = URL.createObjectURL(info.file.originFileObj as Blob);
      setImageUrl(url);
      setLoading(false);
      message.success("Фото профиля успешно обновлено!");
    }
  };

  const uploadButton = (
    <div>
      <Button icon={<UploadOutlined />} loading={loading}>
        Загрузить фото
      </Button>
    </div>
  );

  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            size={128}
            icon={!imageUrl && <UserOutlined />}
            src={imageUrl || undefined}
            style={{ marginBottom: "20px" }}
          />
          <Upload
            name="profilePicture"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Можно загружать только изображения!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </div>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput type="text" name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput type="text" name="address" placeholder="Адресс" />
        <CustomInput type="text" name="experiens" placeholder="Опыт работы" />
        {/* <CustomInput type="text" name="sales" placeholder="" /> */}
        <Space>
          <ErrorMessage message={error} />
          <CustomButon htmlType="submit">{btnText}</CustomButon>
        </Space>
      </Form>
    </Card>
  );
};
