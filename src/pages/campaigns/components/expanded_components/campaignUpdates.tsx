import {
  DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileProtectOutlined,
  HistoryOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import FormCampaignUpdate from './forms/campaignUpdate'
import { Api } from '@/api/api'

const { TextArea } = Input

interface Iprops {
  campaign: any
  user: any
}

const CampaignUpdates = ({ campaign, user }: Iprops) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [campaignUpdate, setCampaignUpdate] = useState({})
  const [data, setData] = useState<any>()
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

  const onOpenForm = (action: string, data: any) => {
    setFormAction(action)
    setCampaignUpdate(data)
    setIsFormOpen(true)
  }

  const columns = [
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
      render: (sent_at: any) => <>{sent_at === undefined ? '-' : sent_at}</>,
    },
    {
      title: 'Status',
      dataIndex: 'sent_at',
      key: 'sent_at',
      render: (sent_at: any) => (
        <>
          {sent_at === undefined ? (
            <Tag color="red">Not sent</Tag>
          ) : (
            <Tag color="cyan">Sent</Tag>
          )}
        </>
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
            <Popconfirm
              placement="bottomRight"
              title="Delete campaign update"
              description="Are you sure to delete this data?"
              onConfirm={(e: any) => confirmDelete(e, data)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const initData = () => {
    setLoading(true)
    Api.get(`campaign-updates/campaign/${campaign?.id}`, user?.token)
      .then((res: any) => {
        setData(res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initData()
  }, [campaign])

  const confirmDelete = (e: React.MouseEvent<HTMLElement>, data: any) => {
    setLoading(true)
    Api.post(`campaign-updates/delete/${data?.id}`, user?.token, user?.id, {})
      .then((res: any) => {
        notification.success({ message: res.message })
        initData()
      })
      .catch((err: any) => {
        console.log(err)
        notification.error({ message: err.message })
        setLoading(false)
      })
  }

  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        loading={loading}
        title={() => (
          <Space className="space-between">
            <h4 className="m-0">Campaign Updates</h4>
            <Space>
              <Button
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => initData()}
              >
                Refresh Data
              </Button>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => onOpenForm('create', { images: [] })}
              ></Button>
            </Space>
          </Space>
        )}
        scroll={{ x: 800 }}
        pagination={{
          pageSize: 3,
          showSizeChanger: false,
        }}
      />
      <Modal
        title={selectedNews.title}
        open={isModalOpen}
        centered
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
        user={user}
        campaign={campaign}
        reloadData={() => initData()}
      />
    </>
  )
}

export default CampaignUpdates
