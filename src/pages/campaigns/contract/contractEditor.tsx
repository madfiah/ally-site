import { BlockOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  Button,
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
  Typography,
} from 'antd'
import { useState } from 'react'
import ContractEditorForm from './editor'

const ContractEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      <Divider orientation="left" dashed />
      <Row>
        <Col span={12}>
          <Button icon={<BlockOutlined />} onClick={showModal}>
            Change Template
          </Button>
        </Col>
        <Col span={12}>
          <Space className="space-end">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
            <Button>{`Save & Preview`}</Button>
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
    </>
  )
}

export default ContractEditor
