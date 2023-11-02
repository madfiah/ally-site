import {
  AccountBookOutlined,
  BankOutlined,
  BlockOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Divider,
  Dropdown,
  InputNumber,
  Modal,
  notification,
  Space,
  Table,
  Tabs,
  Tooltip,
} from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { TabsProps } from 'antd'
import UserInformation from './components/userInformation'
import ResultVeriff from './components/resultVeriff'
import { Api } from '@/api/api'
import { getSession } from 'next-auth/react'
import moment from 'moment'
import ModalDetailUser from './components/detailUser'

interface IProps {
  user: any
}

const Users = ({ user }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<any>(null)
  const [userId, setUserId] = useState<any>(null)

  const initUser = () => {
    setLoading(true)

    Api.get(`users`, user?.token)
      .then((res: any) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)

        notification.error({ message: 'Failed to fetch data user' })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initUser()
  }, [])

  const showModal = (data: any) => {
    setIsModalOpen(true)
    setUserId(data.id)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setUserId(null)
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
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Wallet Amount',
      dataIndex: 'wallet_amount',
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
      title: 'Registered at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) =>
        moment(created_at).format('DD-MM-YYYY h:m:s'),
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Open details">
            <Button size="small" onClick={() => showModal(data)}>
              <BlockOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Edit user">
            <Link href="/users/1/edit">
              <Button size="small">
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>

          <Dropdown
            menu={{
              items: [
                {
                  key: '2',
                  label: <Link href={'/users/1/banks'}>Banks</Link>,
                },
                {
                  key: '3',
                  label: (
                    <Link href={'/users/1/transactions'}>
                      Detail transaction
                    </Link>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <Button size="small">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Card title="Data Users">
        <Table dataSource={users} columns={columns} loading={loading} />
      </Card>

      <ModalDetailUser
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        userSession={user}
        userId={userId}
      />
    </>
  )
}

export default Users

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
