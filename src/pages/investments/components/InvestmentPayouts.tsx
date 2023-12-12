import { Button, Select, Space, Table, Typography } from 'antd'

const InvestmentPayouts = () => {
  const dataSource = [
    {
      key: '1',
      date: '2017-03-25',
      amount: 250,
      expected_payout: 262,
      status: 'on-going',
    },
    {
      key: '2',
      date: '2017-04-25',
      amount: 250,
      expected_payout: 262,
      status: 'on-going',
    },
    {
      key: '3',
      date: '2017-05-25',
      amount: 250,
      expected_payout: 262,
      status: 'on-going',
    },
  ]

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Final Amount',
      dataIndex: 'expected_payout',
      key: 'expected_payout',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <>
      <Space className="space-between mb-1">
        <Typography.Title level={4} className="m-0">
          Payout Schedule
        </Typography.Title>
        <Select placeholder="Select type method">
          <Select.Option value="follow">Follow</Select.Option>
          <Select.Option value="unfollow">Unfollow</Select.Option>
        </Select>
      </Space>
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default InvestmentPayouts
