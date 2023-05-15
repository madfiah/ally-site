import { Button, Card, Col, Form, Input, Row } from 'antd'
import { signOut } from 'next-auth/react'

const ResetPassword = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)

    signOut({
      callbackUrl: '/login',
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      <Row justify={'center'}>
        <Col span={10}>
          <p className="" style={{ fontSize: '1.25rem' }}>
            Reset your password periodically to maintain the security of this
            system
          </p>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col span={10}>
          <Form
            form={form}
            name="basic"
            style={{ marginTop: 25 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your latest password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Re-enter New Password"
              name="new_password_verification"
              rules={[
                {
                  required: true,
                  message: 'Please input new password confirmation!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {`Change password & re-login`}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

export default ResetPassword
