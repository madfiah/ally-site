import {
  DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileProtectOutlined,
  HistoryOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Input, Modal, Space, Table, Tag, Tooltip } from 'antd'
import { useState } from 'react'
import FormCampaignUpdate from './forms/campaignUpdate'

const { TextArea } = Input

const CampaignUpdates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [campaignUpdate, setCampaignUpdate] = useState({})
  const [selectedNews, setSelectedNews] = useState({
    key: null,
    title: null,
    created_at: null,
    sent_at: null,
    content: '',
  })

  const openNews = (news: any) => {
    setIsModalOpen(true)
    setSelectedNews(news)
  }

  const dataSource = [
    {
      key: '1',
      title: 'Delay information',
      created_at: '2022-12-15 11:46:38',
      sent_at: '2022-12-15 11:47:20',
      content: `Dear Investors,\n\nAfter winning the legal case against PT RAM at the Syariah Court, Kapital Boost is currently waiting for the decision of granting the asset execution letter from the Court.\n\nOnce received, the registration of asset execution application will begin on 03 March 2023, and we may start to liquidate the owner's property via an auction.\n\nWe appreciate your patience on this.\n\nRegards,\nKapital Boost.`,
    },
    {
      key: '2',
      title: 'Agreement to change the maturity date',
      created_at: '2022-12-26 14:27:52',
      sent_at: null,
      content: `Dear Investors,\n\nAfter winning the legal case against PT RAM at the Syariah Court, Kapital Boost is currently waiting for the decision of granting the asset execution letter from the Court.\n\nOnce received, the registration of asset execution application will begin on 03 March 2023, and we may start to liquidate the owner's property via an auction.\n\nWe appreciate your patience on this.\n\nRegards,\nKapital Boost.`,
    },
  ]

  const onOpenForm = (action: string, data: any) => {
    setFormAction(action)
    setCampaignUpdate(data)
    setIsFormOpen(true)
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Sent At',
      dataIndex: 'sent_at',
      key: 'sent_at',
    },
    {
      title: 'Status',
      dataIndex: 'sent_at',
      key: 'sent_at',
      render: (sent_at: any) => (
        <>{sent_at === null ? '-' : <Tag color="cyan">Sent</Tag>}</>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Open detail news">
            <Button size="small" onClick={() => openNews(data)}>
              <EyeOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Edit news">
            <Button size="small" onClick={() => onOpenForm('edit', data)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete news">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        title={() => (
          <Space className="space-between">
            <h4 className="m-0">Campaign Updates</h4>
            <Space>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => onOpenForm('create', {})}
              ></Button>
            </Space>
          </Space>
        )}
        scroll={{ x: 800 }}
      />
      <Modal
        title={selectedNews.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <TextArea
          className="mt-1"
          value={selectedNews.content}
          rows={14}
          readOnly
          bordered={false}
        />
      </Modal>

      <FormCampaignUpdate
        isShow={isFormOpen}
        action={formAction}
        handleHide={() => setIsFormOpen(false)}
        campaign_update={campaignUpdate}
      />
    </>
  )
}

export default CampaignUpdates
