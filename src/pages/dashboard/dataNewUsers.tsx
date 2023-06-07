import { Api } from '@/api/api'
import { Nunito } from '@next/font/google'
import { Button, notification, Space, Table } from 'antd'
import { useEffect, useState } from 'react'

const nunito = Nunito({ subsets: ['latin'] })

const columns = [
  {
    title: 'Name',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
]

interface IProps {
  token: string
  title: string
}

const DataNewUsers = ({ token, title }: IProps) => {
  const [user, setUser] = useState<any>({
    data: [],
  })
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState(1)

  const initUser = async (page: number) => {
    setLoading(true)

    Api.get(`dashboard/user-to-review`, token, { day: day, page: page })
      .then((res: any) => {
        setUser(res.data)
      })
      .catch((err) => {
        notification.error(err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initUser(1)
  }, [day])

  const handleTableChange = (pagination: any) => {
    console.log(pagination)
    initUser(pagination.current)
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
                type={day === 1 ? 'primary' : 'default'}
                onClick={() => setDay(1)}
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
            dataSource={user.data}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              total: user?.total,
              current: user?.current_page,
              pageSize: 5,
              showSizeChanger: false,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  console.log(record)
                },
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DataNewUsers
