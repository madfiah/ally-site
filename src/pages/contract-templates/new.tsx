import { BlockOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tooltip,
  Typography,
} from 'antd'
import { useState } from 'react'
import ContractEditorForm from './components/editor'

const ContractEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [campaignSelected, setCampaignSelected] = useState<any>(null)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Edit contact template</h3>
      </Space>

      {/* <Divider orientation="left" dashed /> */}
      <Row className="mt-1">
        <Col span={8}>
          <Input placeholder="Enter contract template name" />
        </Col>
        <Col span={16}>
          <Space className="space-end">
            <Select
              showSearch
              allowClear
              style={{ width: 350 }}
              placeholder="Select campaign"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
              onChange={() => setCampaignSelected('')}
            />
            <Button type="primary">{`Save`}</Button>
          </Space>
        </Col>
      </Row>

      <Divider orientation="left" dashed />

      <Tabs
        defaultActiveKey="1"
        style={{ marginBottom: 32 }}
        items={[
          {
            label: `Main Content`,
            key: 'main-content',
            children: <ContractEditorForm content="<p>Main contract</p>" />,
          },
          {
            label: `Sign Content`,
            key: 'sign content',
            children: <ContractEditorForm content="<p>Signer contract</p>" />,
          },
          {
            label: `Attachment Content`,
            key: 'attachment-content',
            children: (
              <ContractEditorForm content="<p>Attachment contract</p>" />
            ),
          },
          {
            label: (
              <Tooltip
                title={
                  campaignSelected === null
                    ? `Please select a campaign to access preview contract`
                    : ''
                }
              >
                Preview Contract
              </Tooltip>
            ),
            key: 'preview-contract',
            disabled: campaignSelected === null,
            children: <span>Preview Contract</span>,
          },
        ]}
      />

      <Modal
        title={`Select Contract Template`}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item onClick={handleOk}>
              <Button type="link" style={{ width: '100%', textAlign: 'left' }}>
                <Space className="space-between">
                  {item.title}
                  <Typography.Text>
                    <small>{`27-March-2023 10:23:19`}</small>
                  </Typography.Text>
                </Space>
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </Card>
  )
}

export default ContractEditor
