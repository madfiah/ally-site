import { Col, Row, Button, Modal, Form, Input, Space } from 'antd'

interface Props {
  handleClose: any
}

const ForgotPassword = ({ handleClose }: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <p>
        Enter your admin email address and send request to reset your admin
        password.
      </p>
      <Form
        name="basic"
        style={{ marginTop: 25 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Request
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ForgotPassword
