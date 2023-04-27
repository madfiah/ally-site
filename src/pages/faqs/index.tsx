import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Card, Input, Modal, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import FaqForm from './components/faqForm'

const { TextArea } = Input

const Faqs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})

  const dataSource = [
    {
      key: '1',
      question: 'What do I do if I have additional questions on Xfers?',
      category: 'e-Wallet',
      message: `<div id="faq449" class="panel-collapse FAQAns collapse in" aria-expanded="true"><div class="panel-body"><span class="allContentText">You may contact Xfers support at&nbsp;<strong>support@xfers.io</strong></span></div></div>`,
      updated_at: '2021-10-30 01:53:16',
      created_at: '2021-10-30 01:53:16',
    },
  ]

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => (
        <>
          <span dangerouslySetInnerHTML={{ __html: message }}></span>
        </>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Last update',
      dataIndex: 'updated_at',
      key: 'updated_at',
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
          <Tooltip title="Edit faq">
            <Button
              size="small"
              onClick={() => {
                setSelectedData(data)
                setIsModalOpen(true)
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete faq">
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

      <FaqForm
        isOpen={isModalOpen}
        faq={selectedData}
        handleCancel={() => setIsModalOpen(false)}
      />
    </Card>
  )
}

export default Faqs
