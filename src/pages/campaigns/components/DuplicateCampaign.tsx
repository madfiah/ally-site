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
import { teamAnalyst, teamBD } from '@/utils/teamReview'

interface KBProps {
  isModalOpen: boolean
  handleOk: any
  handleCancel: any
  user: any
  campaign: any
}

const { Option } = Select

const DuplicateCampaignPopup = ({
  isModalOpen,
  handleOk,
  handleCancel,
  user,
  campaign,
}: KBProps) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  form.setFieldsValue(campaign)

  const onFinish = (values: any) => {
    setLoading(true)

    form.setFieldsValue(values)

    // get selected analyst and bd
    const bdData: any = teamBD.filter((opt) => opt.value === values.bd)
    const analystData: any = teamAnalyst.filter(
      (opt) => opt.value === values.analyst
    )

    // set pic to parameters
    values['pic'] = {
      name_bd: bdData[0]?.label,
      email_bd: bdData[0]?.value,
      name_analyst: analystData[0]?.label,
      email_analyst: analystData[0]?.value,
    }

    Api.post(`campaign/duplicate/${campaign?.slug}`, user.token, null, values)
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
      title="Create New Campaign (Duplicate)"
      open={isModalOpen}
      onCancel={loading ? () => console.log('cannot close') : handleCancel}
      footer={false}
      centered
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
            <Form.Item label="Company Name" name="company_name">
              <Input placeholder="Enter company name" readOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Campaign Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter campaign name!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('name') !== campaign.name) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        `Please to change the campaign name, You cannot create campaigns with the same name`
                      )
                    )
                  },
                }),
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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue('acronim') !== campaign.acronim
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        `Please to change the acronim, You cannot create campaigns with the same acronym`
                      )
                    )
                  },
                }),
              ]}
            >
              <Input placeholder="Enter campaign acronim" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Project Type" name="type">
              <Select placeholder="Select project type" allowClear>
                <Option value="sme">SME Crowdfunding</Option>
                <Option value="donation">Donation</Option>
                <Option value="private">Private Crowdfunding</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="SME Sub Type" name="subtype">
              <Select placeholder="Select SME subtype" allowClear>
                <Option value="ASSET PURCHASE FINANCING">
                  ASSET PURCHASE FINANCING
                </Option>
                <Option value="INVOICE FINANCING">INVOICE FINANCING</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[30, 0]}>
          <Col span={12}>
            <Form.Item
              label="Select Bussines Development"
              name="bd"
              rules={[{ required: true, message: 'Please select BD' }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={teamBD}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Select Analyst"
              name="analyst"
              rules={[{ required: true, message: 'Please select Analyst' }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={teamAnalyst}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

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

export default DuplicateCampaignPopup
