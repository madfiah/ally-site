import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Table, Tooltip } from 'antd'

const Banks = () => {
  const dataSource = [
    {
      key: '1',
      bankName: 'CIMB',
      accountName: 'Mike',
      accountNumber: '26618255381',
      countryOfBank: 'SINGAPORE',
      currency: 'SGD',
      SWIFTCode: '128',
      IBANCode: '-',
    },
    {
      key: '1',
      bankName: 'BCA',
      accountName: 'Mike',
      accountNumber: '7218261',
      countryOfBank: 'SINGAPORE',
      currency: 'SGD',
      SWIFTCode: '110',
      IBANCode: '-',
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
      title: 'Bank name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'Account name',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Account number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Country of bank',
      dataIndex: 'countryOfBank',
      key: 'countryOfBank',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'SWIFT code',
      dataIndex: 'SWIFTCode',
      key: 'SWIFTCode',
    },
    {
      title: 'IBAN code',
      dataIndex: 'IBANCode',
      key: 'IBANCode',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '70px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          {/* <Tooltip title="Edit">
            <Button size="small">
              <EditOutlined />
            </Button>
          </Tooltip> */}
          <Tooltip title="Delete data bank">
            <Button size="small" danger>
              <DeleteOutlined />
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
            <h3 className="m-0 fw-300">Data Banks - Ahmad Ramli</h3>
          </Space>

          <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
        </Col>
      </Row>
    </Card>
  )
}

export default Banks
