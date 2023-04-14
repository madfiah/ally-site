import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
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
      name: 'IF@SG',
      url: '/campaign?page=1&a=59bb2940-4b13-4ca0-a47a-54a02ebf915e',
      status: 1,
      affiliation: 2,
      created_at: '2023-03-10 11:46:38',
    },
    {
      key: '1',
      name: 'HHWT',
      url: '/campaign?page=1&a=59bb2940-4b13-4ca0-a47a-54a02ebf915e',
      status: 0,
      affiliation: 0,
      created_at: '2022-12-15 09:46:38',
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
      title: 'Active',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <>{status ? <CheckOutlined /> : <CloseOutlined />}</>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Affiliation',
      dataIndex: 'affiliation',
      key: 'affiliation',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '70px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Delete affiliation">
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
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Affiliations</h3>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
    </Card>
  )
}

export default Affiliations
