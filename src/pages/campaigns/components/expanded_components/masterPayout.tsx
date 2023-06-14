import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HistoryOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  PlusSquareOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import {
  Button,
  InputNumber,
  notification,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from 'antd'
import { useEffect, useState } from 'react'
import FormMasterPayout from './forms/masterPayout'

interface CProps {
  campaign?: any
  user: any
}

const MasterPayout = ({ campaign, user }: CProps) => {
  const [loading, setLoading] = useState(false)
  const [masterPayouts, setMasterPayouts] = useState<any>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [masterPayout, setMasterPayout] = useState({})

  const initMasterPayout = async () => {
    setLoading(true)

    await Api.get(
      `master-payouts/campaign/${campaign.id}`,
      user?.token,
      {},
      user.id
    )
      .then((res: any) => {
        console.log(res)
        setMasterPayouts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    initMasterPayout()
  }, [])

  const onOpenForm = (action: string, data: any) => {
    setFormAction(action)
    setMasterPayout(data)
    setIsFormOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLElement>, data: any) => {
    console.log(data)
    Api.post(`master-payouts/delete/${data.id}`, user?.token, user.id, {})
      .then((res: any) => {
        notification.success({ message: res.message })
        initMasterPayout()
      })
      .catch((err: any) => {
        console.log(err)
        notification.error({ message: err.message })
      })
  }

  const columns = [
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => <>{`${percentage}%`}</>,
    },
    {
      title: 'Project Return',
      dataIndex: 'return',
      key: 'project_return',
      render: (project_return: number) => <>{`${project_return}%`}</>,
    },
    {
      title: 'Due Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Payout Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => currency(amount),
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Edit master payout">
            <Button size="small" onClick={() => onOpenForm('edit', data)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete master payout">
            <Popconfirm
              placement="bottomRight"
              title="Delete master payout"
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

  return (
    <>
      <Table
        bordered
        rowKey="id"
        dataSource={masterPayouts}
        columns={columns}
        loading={loading}
        title={() => (
          <Space className="space-between">
            <h4 className="m-0">Master Payout</h4>
            <Space>
              {/* <Button size="small" icon={<HistoryOutlined />}>
                History Update
              </Button> */}
              <Button
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => initMasterPayout()}
              >
                Refresh data
              </Button>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() =>
                  onOpenForm('create', {
                    campaign_id: campaign.id,
                    return: campaign.return,
                    date: null,
                  })
                }
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

      <FormMasterPayout
        isShow={isFormOpen}
        handleHide={() => setIsFormOpen(false)}
        action={formAction}
        master_payout={masterPayout}
        token={user?.token}
        reloadData={() => initMasterPayout()}
      />
    </>
  )
}

export default MasterPayout
