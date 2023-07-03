import { Api } from '@/api/api'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from 'antd'
import { useState } from 'react'

interface KBProps {
  isModalOpen: boolean
  handleOk: any
  handleCancel: any
  user: any
}

const { Option } = Select

const NewCampaignPopup = ({
  isModalOpen,
  handleOk,
  handleCancel,
  user,
}: KBProps) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    Api.post(`campaign/create`, user.token, null, values)
      .then((res: any) => {
        message.success(res.message)
        handleOk(res.data.slug)
      })
      .catch((err) => {
        message.error('Please check again your input')
      })
      .finally(() => setLoading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title="Create New Campaign"
      open={isModalOpen}
      onCancel={loading ? () => console.log('cannot close') : handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Divider />
        <Row gutter={[20, 0]}>
          <Col span={24}>
            <Form.Item
              label="Company Name"
              name="company_name"
              rules={[
                { required: true, message: 'Please enter company name!' },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Campaign Name"
              name="campaign_name"
              rules={[
                { required: true, message: 'Please enter campaign name!' },
              ]}
            >
              <Input placeholder="Enter campaign name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Acronim"
              name="acronim"
              rules={[
                { required: true, message: 'Please enter campaign acronim!' },
              ]}
            >
              <Input placeholder="Enter campaign acronim" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Project Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please select project type!',
                },
              ]}
            >
              <Select placeholder="Select project type" allowClear>
                <Option value="sme">SME Crowdfunding</Option>
                <Option value="donation">Donation</Option>
                <Option value="private">Private Crowdfunding</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SME Sub Type"
              name="subtype"
              rules={[{ required: true, message: 'Please select subtype!' }]}
            >
              <Select placeholder="Select SME subtype" allowClear>
                <Option value="ASSET PURCHASE FINANCING">
                  ASSET PURCHASE FINANCING
                </Option>
                <Option value="INVOICE FINANCING">INVOICE FINANCING</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Campaign
              </Button>
              <Button onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default NewCampaignPopup
