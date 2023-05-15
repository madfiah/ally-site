import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Table, Tooltip } from 'antd'

const Banners = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]

  const columns = [
    {
      title: 'Desktop Banner',
      dataIndex: 'desktop',
      key: 'desktop',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">List of Banners</h3>

        <Tooltip title="Add new banner">
          <Button size="small" icon={<PlusOutlined />}></Button>
        </Tooltip>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={`mt-1`} />
    </Card>
  )
}

export default Banners
