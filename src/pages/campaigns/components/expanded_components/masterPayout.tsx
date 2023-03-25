import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HistoryOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { Button, InputNumber, Space, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import FormMasterPayout from './forms/masterPayout'

const dataSource = [
  {
    key: '1',
    percentage: '25',
    return: '7.40',
    due_date: '4 April 2022',
    status: 'paid',
    amount: '18540.4',
  },
  {
    key: '2',
    percentage: '25',
    return: '7.40',
    due_date: '4 Mei 2022',
    status: 'delay',
    amount: '18540.4',
  },
  {
    key: '3',
    percentage: '25',
    return: '7.40',
    due_date: '4 June 2022',
    status: 'on going',
    amount: '18540.4',
  },
  {
    key: '4',
    percentage: '25',
    return: '7.40',
    due_date: '4 Jully 2022',
    status: 'on going',
    amount: '18540.4',
  },
]

const MasterPayout = () => {
  const [loading, setLoading] = useState(false)
  const [masterPayouts, setMasterPayouts] = useState<any>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [masterPayout, setMasterPayout] = useState({})

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMasterPayouts(dataSource)
    }, 2000)
  }, [])

  const onOpenForm = (action: string, data: any) => {
    setFormAction(action)
    setMasterPayout(data)
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
      dataIndex: 'due_date',
      key: 'due_date',
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
      render: (amount: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={amount}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
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
        dataSource={masterPayouts}
        columns={columns}
        loading={loading}
        title={() => (
          <Space className="space-between">
            <h4 className="m-0">Master Payout</h4>
            <Space>
              <Button size="small" icon={<HistoryOutlined />}>
                History Update
              </Button>
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

      <FormMasterPayout
        isShow={isFormOpen}
        handleHide={() => setIsFormOpen(false)}
        action={formAction}
        master_payout={masterPayout}
      />
    </>
  )
}

export default MasterPayout
