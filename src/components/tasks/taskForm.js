import React from "react";
import styled from "styled-components";
import { Form, Input, DatePicker,  Button } from "antd";

const { TextArea } = Input;
const StyledInput = styled(Input)`
`;

export const TaskForm = ({ createOrEditTask }) => {
  const onFinish = (values) => {
    createOrEditTask(values);
    form.resetFields();
  };
  const [form] = Form.useForm();
  return (
    <Form
      style={{ margin: "0 auto", width: 400 }}
      name="nest-messages"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      form={form}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "title is required" }]}
      >
        <StyledInput placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="content"
        label="Content"
        rules={[{ required: true, message: "Content is required" }]}
      >
        <TextArea showCount placeholder="Content" autoSize={ {minRows: 3, maxRows: 10 }} maxLength={1024}/>
      </Form.Item>
      <Form.Item
        name="deadline"
        label="Deadline"
        rules={[{ required: true, message: "Deadline is required" }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          className="match-datePicker"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
