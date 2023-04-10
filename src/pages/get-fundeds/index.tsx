import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Table, Tooltip } from 'antd'

const Banks = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Gael Ulrich ZAFIMINO',
      email: 'gaelulrichzafimino@gmail.com',
      phone_no: '0327370130',
      company_name: 'Expert Gael',
      company_reg_number: '192636718872',
      industry: 'Tech',
      annual_revenue: 'above $ 1 mn',
      financing_solution: 'Asset Purchase Financing',
    },
    {
      key: '2',
      name: 'Bakar Haythar',
      email: 'cloudbakarr@gmail.com',
      phone_no: '5864312765',
      company_name: 'Islamly llc',
      company_reg_number: '-',
      industry: '-',
      annual_revenue: '$ 100k-299k',
      financing_solution: 'Invoice Financing',
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone no',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
    {
      title: 'Company name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Company registration number',
      dataIndex: 'company_reg_number',
      key: 'company_reg_number',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: 'Annual revenue',
      dataIndex: 'annual_revenue',
      key: 'annual_revenue',
    },
    {
      title: 'Financing Solution',
      dataIndex: 'financing_solution',
      key: 'financing_solution',
    },
  ]

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Space className="space-between mb-1">
            <h3 className="m-0 fw-300">List of get fundeds</h3>
          </Space>

          <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
        </Col>
      </Row>
    </Card>
  )
}

export default Banks
