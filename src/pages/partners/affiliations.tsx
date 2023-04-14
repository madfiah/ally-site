import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Table, Tooltip } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

interface DataType {
  key: React.Key
  investor: string
  vendor: string
  description: string
}

const Affiliations = () => {
  const dataSource = [
    {
      key: '1',
      investor: 'Fithriyyah Konzan',
      vendor: 'IF@SG',
      description: 'Registration',
    },
    {
      key: '2',
      investor: `Isma'il Mustafa`,
      vendor: 'Islamic Finance Guru',
      description: 'Registration',
    },
  ]

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Investor',
      dataIndex: 'investor',
      key: 'investor',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Affiliations</h3>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
    </Card>
  )
}

export default Affiliations
