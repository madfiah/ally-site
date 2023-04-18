import { Button, Form, Input, Modal, Select, Space } from 'antd'

import { useEffect, useState } from 'react'

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  admin?: any
}

const FormAdmin = ({ isShow, handleHide, action, admin }: Props) => {
  const [form] = Form.useForm()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!isShow) {
      setData({})
      form.resetFields()
    } else {
      form.setFieldsValue(admin)
    }
  }, [form, isShow, admin])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title={action === 'create' ? 'Create new admin' : 'Edit data admin'}
      open={isShow}
      onCancel={handleHide}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-2"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input placeholder="Enter the name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input project email!' }]}
        >
          <Input placeholder="Enter the email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select role" allowClear>
            <Select.Option value="admin">admin</Select.Option>
            <Select.Option value="super admin">super admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAdmin
