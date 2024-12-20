import { Button, Form } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  onClick?: () => void;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  className?: string;
};

export const CustomButon = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  className,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
