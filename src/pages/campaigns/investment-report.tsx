import {
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Card, InputNumber, Modal, Space, Table, Tooltip } from 'antd'

const dataSource = [
  {
    key: '1',
    full_name: 'AZMI BIN SALLEH',
    ic_number: 'S1634816C',
    nationality: 'SINGAPORE',
    amount: '3000',
    payout: '3063.00',
  },
  {
    key: '2',
    full_name: 'Ebadullah Bin Siddiq',
    ic_number: 'S2714048C',
    nationality: 'BANGLADESH',
    amount: '1640',
    payout: '1674.44',
  },
]

const InvestmentReport = () => {
  const [modal, contextHolder] = Modal.useModal()

  const confirm = (data: any) => {
    modal.confirm({
      title: 'Delete Action',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete data investment ${data.full_name}`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        console.log('Deleting investment data for name ', data.full_name)
      },
    })
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
      dataIndex: 'full_name',
      key: 'full_name',
      width: '30%',
    },
    {
      title: 'IC Number',
      dataIndex: 'ic_number',
      key: 'ic_number',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '15%',
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
      title: 'Total Payout',
      dataIndex: 'payout',
      key: 'payout',
      width: '15%',
      render: (payout: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={payout}
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
          <Tooltip title="Open detail user">
            <Button size="small">
              <UserOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete data investment">
            <Button size="small" danger onClick={() => confirm(data)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]
  return (
    <Card
      title="Investments Report : Worldtrans Indopersada (40)"
      extra={
        <Button size="small" icon={<DownloadOutlined />}>
          Export to Excel
        </Button>
      }
    >
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 800 }} />
      {contextHolder}
    </Card>
  )
}

export default InvestmentReport
