import { Api } from '@/api/api'
import { Nunito } from '@next/font/google'
import { Button, InputNumber, notification, Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'

const nunito = Nunito({ subsets: ['latin'] })

const columns = [
  {
    title: 'Name',
    dataIndex: 'user_full_name',
    key: 'user_full_name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: any) => {
      return (
        <InputNumber
          style={{ width: '150px', paddingLeft: 0 }}
          defaultValue={parseFloat(amount)}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: boolean) => {
      return (
        <>
          {status ? (
            <Tag color="green">Paid</Tag>
          ) : (
            <Tag color="red">Unpaid</Tag>
          )}
        </>
      )
    },
  },
]

interface IProps {
  token: string
  title: string
}

const WithdrawalRequests = ({ token, title }: IProps) => {
  const [withdraw, setWithdraw] = useState<any>({
    data: [],
  })
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState(500)

  const iniWithdraw = async (page: number) => {
    setLoading(true)

    Api.get(`dashboard/withdraw-requests`, token, { day: day, page: page })
      .then((res: any) => {
        setWithdraw(res.data)
      })
      .catch((err) => {
        notification.error(err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    iniWithdraw(1)
  }, [day])

  const handleTableChange = (pagination: any) => {
    console.log(pagination)
    iniWithdraw(pagination.current)
  }

  return (
    <div>
      <div className="kb-card with-radius">
        <div className="card-title">
          <Space align={`center`} size={`small`} className="space-between">
            <p className={nunito.className}>Users need to be reviewed</p>
            <Space wrap>
              <Button
                size="small"
                type={day === 500 ? 'primary' : 'default'}
                onClick={() => setDay(500)}
              >
                Today
              </Button>
              <Button
                size="small"
                type={day === 3 ? 'primary' : 'default'}
                onClick={() => setDay(3)}
              >
                3 days
              </Button>
              <Button
                size="small"
                type={day === 7 ? 'primary' : 'default'}
                onClick={() => setDay(7)}
              >
                7 days
              </Button>
            </Space>
          </Space>
        </div>
        <div className="card-body p-0">
          <Table
            loading={loading}
            dataSource={withdraw.data}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              total: withdraw?.total,
              current: withdraw?.current_page,
              pageSize: 5,
              showSizeChanger: false,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default WithdrawalRequests
