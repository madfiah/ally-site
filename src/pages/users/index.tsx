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
  Space,
  Table,
  Tabs,
  Tooltip,
} from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import type { TabsProps } from 'antd'
import UserInformation from './components/userInformation'
import ResultVeriff from './components/resultVeriff'

const Users = () => {
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

  const onChangeTab = (key: string) => {
    console.log(key)
  }

  const dataSource = [
    {
      key: '1',
      firstname: 'Mike',
      lastname: 'Ropo',
      email: 'mike@mail.com',
      country: 'VRINDAVAN',
      phone_no: '09210129301',
      status: 'New',
      wallet_amount: 0,
      created_at: '2023-03-10 11:46:38',
    },
    {
      key: '2',
      firstname: 'John',
      lastname: 'Miller',
      email: 'john.miller@mail.com',
      country: 'SINGAPORE',
      phone_no: '09210129301',
      status: 'Approved',
      wallet_amount: 13105.75,
      created_at: '2023-02-17 11:46:38',
    },
    {
      key: '3',
      firstname: 'Mike',
      lastname: 'Thompson',
      email: 'mike@mail.com',
      country: 'VRINDAVAN',
      phone_no: '09210129301',
      status: 'Rejected',
      wallet_amount: 0,
      created_at: '2023-02-15 11:46:38',
    },
  ]

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
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
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
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Open details">
            <Button size="small" onClick={showModal}>
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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `User Information`,
      children: <UserInformation />,
    },
    {
      key: '2',
      label: `Verif Information`,
      children: <ResultVeriff />,
    },
  ]

  return (
    <>
      <Card title="Data Users">
        <Table dataSource={dataSource} columns={columns} />
      </Card>

      <Modal
        title="Detail User : Ahmad Ramli"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        <div className="mt-2">
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={items}
            onChange={onChangeTab}
          />

          <Divider orientation="left" dashed />

          <Space size={10} className="space-between">
            <Space size={10}>
              <Button danger icon={<CloseOutlined />}>
                REJECT
              </Button>
              <Button type="primary" danger icon={<CloseOutlined />}>
                BLACKLIST
              </Button>
            </Space>
            <Tooltip title="Veriff has not been approved">
              <Button
                disabled
                type="primary"
                icon={<CheckOutlined />}
                style={{ width: '200px' }}
              >
                APPROVE
              </Button>
            </Tooltip>
          </Space>
        </div>
      </Modal>
    </>
  )
}

export default Users
