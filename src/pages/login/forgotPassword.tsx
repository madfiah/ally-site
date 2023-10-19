import { Api } from '@/api/api'
import { Col, Row, Button, Modal, Form, Input, Space, message } from 'antd'
import { useEffect, useState } from 'react'

interface Props {
  handleClose: any
}

const ForgotPassword = ({ handleClose }: Props) => {
  const [forgotLoading, setForgotLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    setForgotLoading(true)
    console.log('Success:', values)
    Api.post(`auth/forgot-password`, null, null, values)
      .then((res: any) => {
        console.log(res)
        message.success({
          content:
            'verification email sent successfully. Please check your email inbox',
        })
        handleClose()
      })
      .catch((err) => {
        console.log(err)

        message.error({ content: err.data.message })
      })
      .finally(() => {
        setForgotLoading(false)
        form.setFieldValue('email', '')
      })
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
        form={form}
        name="basic"
        style={{ marginTop: 25 }}
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
          <Button type="primary" htmlType="submit" loading={forgotLoading}>
            Send Request
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ForgotPassword
