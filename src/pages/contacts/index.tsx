import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Card, Input, Modal, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'

const { TextArea } = Input

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})

  const dataSource = [
    {
      key: '1',
      name: 'Nisa',
      email: 'nisa_desouza@yahoo.com',
      message: `Hi,\nI recently opened an account with Kapital Boost. I would like to start investing in PT DAL (5) project, for which I'm left with 2 days. However, review of my documents will be completed only after 3 working days. Would you be able to help expedite? \n\nThanks,\nNisa`,
      created_at: '2021-10-30 01:53:16',
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Open detail">
            <Button
              size="small"
              onClick={() => {
                setSelectedData(data)
                setIsModalOpen(true)
              }}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete master payout">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">List of Contacts</h3>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />

      <Modal
        title={`Message from ${selectedData.name} `}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <TextArea
          className="mt-1"
          value={selectedData.message}
          rows={14}
          readOnly
          bordered={false}
        />
      </Modal>
    </Card>
  )
}

export default Contacts
