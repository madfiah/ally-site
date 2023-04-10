/* eslint-disable @next/next/no-img-element */
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  InputNumber,
  Modal,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'antd'
import type { TabsProps } from 'antd'
import { useState } from 'react'
import FormTransaction from '../components/formTransaction'
import FormWithdrawal from '../components/formWithdrawal'

const UserTransaction = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenAction, setModalOpenAction] = useState('')
  const [walletTransaction, setWalletTransaction] = useState<any>({})
  const [modalWithdrawal, setModalWithdrawal] = useState(false)
  const [modalWithdrawalAction, setModalWithdrawalAction] = useState('')
  const [walletWithdrawal, setWalletWithdrawal] = useState<any>({})
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const onChange = (key: string) => {
    console.log(key)
  }

  const handleCancel = () => {
    setPreviewImage('')
    setPreviewOpen(false)
    setPreviewTitle('')
  }

  const dataSource = [
    {
      key: '1',
      title: 'Top Up',
      description: 'Top Up',
      amount: 320,
      created_at: '2023-03-27 09:54:51',
    },
    {
      key: '2',
      title: 'Investment',
      description: 'Test Campaign KB - Investment',
      amount: -200,
      created_at: '2023-03-21 11:04:23',
    },
    {
      key: '3',
      title: 'Top Up',
      description: 'Top Up',
      amount: 200,
      created_at: '2023-03-21 10:32:01',
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Tag color={`${amount < 0 ? 'red' : 'green'}`}>
          <InputNumber
            defaultValue={amount}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            bordered={false}
            readOnly
          />
        </Tag>
      ),
    },
    {
      title: 'Created',
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
          <Tooltip title="Edit transaction">
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setWalletTransaction(data)
                setModalOpenAction('edit')
                setModalOpen(true)
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Delete transaction">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const dataSourceWithdrawal = [
    {
      key: '1',
      amount: 50,
      status: 1,
      created_at: '2023-03-27 09:54:51',
      transfer_at: '2023-03-27 10:31:21',
      proof:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/user-withdraw/aI6LEJu0g8llgMG7enV8hGm790nugBfAGtTunKbu.png',
    },
    {
      key: '2',
      amount: 100,
      status: 0,
      created_at: '2023-03-28 09:54:51',
      transfer_at: null,
      proof: null,
    },
  ]

  const openImage = (data: any) => {
    setPreviewImage(data.proof)
    setPreviewOpen(true)
    setPreviewTitle('Preview : proof requested at ' + data.created_at)
  }

  const columnsWithdrawal = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <InputNumber
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={`${status ? 'success' : 'warning'}`}>
          {status ? 'Paid' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Requested at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Transfered at',
      dataIndex: 'transfer_at',
      key: 'transfer_at',
      render: (transfer_at: string) => <>{transfer_at ? transfer_at : '-'}</>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="See Transfer Proof">
            <Button
              type="primary"
              size="small"
              disabled={data.proof === null}
              onClick={() => openImage(data)}
            >
              <FileSearchOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Edit withdrawal">
            <Button
              size="small"
              onClick={() => {
                setWalletWithdrawal(data)
                setModalWithdrawalAction('edit')
                setModalWithdrawal(true)
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Delete transaction">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Wallet Transaction`,
      children: (
        <>
          <Space className="space-between">
            <span>&nbsp;</span>
            <Tooltip title="Add new transaction">
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  setWalletTransaction({})
                  setModalOpenAction('new')
                  setModalOpen(true)
                }}
              ></Button>
            </Tooltip>
          </Space>

          <Table className="mt-1" dataSource={dataSource} columns={columns} />
        </>
      ),
    },
    {
      key: '2',
      label: `Wallet Withdrawal`,
      children: (
        <Table dataSource={dataSourceWithdrawal} columns={columnsWithdrawal} />
      ),
    },
  ]

  return (
    <>
      <Card>
        <Space className="space-between mb-1">
          <h3 className="m-0 fw-300">Data Wallet - Ahmad Ramli</h3>
          <h3 className="m-0 fw-300">
            Saldo is <b>$320</b>
          </h3>
        </Space>

        <Tabs
          tabPosition="right"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </Card>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <img
          alt={previewTitle}
          style={{ width: '100%', marginTop: '15px' }}
          src={previewImage}
        />
      </Modal>

      <FormTransaction
        modalOpen={modalOpen}
        handleCloseModal={() => setModalOpen(false)}
        wallet_transaction={walletTransaction}
        onReloadData={() => console.log('Reload data transaction')}
        action={modalOpenAction}
      />

      <FormWithdrawal
        modalOpen={modalWithdrawal}
        handleCloseModal={() => setModalWithdrawal(false)}
        wallet_withdrawal={walletWithdrawal}
        onReloadData={() => console.log('Reload data withdrawal')}
        action={modalWithdrawalAction}
      />
    </>
  )
}

export default UserTransaction
