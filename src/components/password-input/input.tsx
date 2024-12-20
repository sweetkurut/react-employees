import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
import React from "react";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const PasswordInput = ({
  name,
  placeholder,
  dependencies = [],
}: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        ({ getFieldValue }) => ({
          validator(_: unknown, value: string) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли должны совпадать!"));
            }

            if (name === "password") {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Пароль должен быть больше 6-ти символов!")
                );
              }
              return Promise.resolve();
            }

            return Promise.resolve(); // Возвращаем успешный результат, если нет других условий
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
