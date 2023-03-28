import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Button, Divider, InputNumber, Space, Table, Tooltip } from 'antd'

const InvestmentReport = () => {
  const dataSource = [
    {
      key: '1',
      full_name: 'Mike',
      email: 'mike@mail.com',
      amount: 50000,
      invest_date: '2021-11-25',
    },
    {
      key: '2',
      full_name: 'John',
      email: 'john@mail.com',
      amount: 13500,
      invest_date: '2021-11-25',
    },
    {
      key: '3',
      full_name: 'Rully',
      email: 'rully@mail.com',
      amount: 5750,
      invest_date: '2021-11-25',
    },
    {
      key: '4',
      full_name: 'Mark',
      email: 'mark@mail.com',
      amount: 370,
      invest_date: '2021-11-25',
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
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      width: '25%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
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
      title: 'Invest Date',
      dataIndex: 'invest_date',
      key: 'invest_date',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Send email contract">
            <Button size="small">
              <SendOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Contract logs">
            <Button size="small">
              <OrderedListOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left" dashed>
        Investor Report
      </Divider>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default InvestmentReport
