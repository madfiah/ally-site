import { BankOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Table, Tooltip } from 'antd'

const Banks = () => {
  const dataSource = [
    {
      key: '1',
      user_fullname: 'Gael Ulrich ZAFIMINO',
      amount: 221.57,
      bank_name: 'DBS Bank Ltd',
      account_name: 'Gael Ulrich ZAFIMINO',
      bank_number: '1181000179',
      swift_code: 'DBSSSGSGXXX',
      iban_code: '',
      status: 1,
      date_requested: '1/25/2023, 10:13:01',
      proof: null,
    },
    {
      key: '1',
      user_fullname: 'Gael Ulrich ZAFIMINO',
      amount: 221.57,
      bank_name: 'DBS Bank Ltd',
      account_name: 'Gael Ulrich ZAFIMINO',
      bank_number: '1181000179',
      swift_code: 'DBSSSGSGXXX',
      iban_code: '',
      status: 1,
      date_requested: '1/25/2023, 10:13:01',
      proof: null,
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
      title: 'User',
      dataIndex: 'user_fullname',
      key: 'user_fullname',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Bank name',
      dataIndex: 'bank_name',
      key: 'bank_name',
    },
    {
      title: 'Account name',
      dataIndex: 'account_name',
      key: 'account_name',
    },
    {
      title: 'Account number',
      dataIndex: 'bank_number',
      key: 'bank_number',
    },
    {
      title: 'SWIFT Code',
      dataIndex: 'swift_code',
      key: 'swift_code',
    },
    {
      title: 'IBAN code',
      dataIndex: 'iban_code',
      key: 'iban_code',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date requested',
      dataIndex: 'date_requested',
      key: 'date_requested',
    },
    {
      title: 'Proof',
      dataIndex: 'proof',
      key: 'proof',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          {/* <Tooltip title="Detail bank">
            <Button size="small">
              <BankOutlined />
            </Button>
          </Tooltip> */}
          <Tooltip title="Edit">
            <Button size="small">
              <EditOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Space className="space-between mb-1">
            <h3 className="m-0 fw-300">KB wallet withdrawals</h3>
          </Space>

          <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
        </Col>
      </Row>
    </Card>
  )
}

export default Banks
