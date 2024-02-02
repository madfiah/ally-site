import { SendOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const ContactForm = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      style={{ width: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Your Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input style={{ height: '50px' }} />
      </Form.Item>

      <Row gutter={20}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email address!' },
            ]}
          >
            <Input style={{ height: '50px' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="Phone Number" name="phone_number">
            <Input style={{ height: '50px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<FieldType>
        label="Subject"
        name="subject"
        rules={[{ required: true, message: 'Please input your subject!' }]}
      >
        <Input style={{ height: '50px' }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Message"
        name="message"
        rules={[{ required: true, message: 'Please input your message!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined rotate={-30} />}
          style={{ width: '200px', height: '35px', background: '#008d7d' }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ContactForm
