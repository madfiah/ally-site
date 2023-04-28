import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Input, Space, Table, Tooltip } from 'antd'
import Link from 'next/link'

const { Search } = Input

const ContractTemplates = () => {
  const dataSource = [
    {
      key: '1',
      name: `Invoice Financing Template`,
      updated_at: '2021-10-30 01:53:16',
      created_at: '2021-10-30 01:53:16',
    },
    {
      key: '2',
      name: `Kapital Boost Asset Financing`,
      updated_at: '2021-10-30 01:53:16',
      created_at: '2021-10-30 01:53:16',
    },
    {
      key: '3',
      name: `Asset Purchase Financing (SGD)`,
      updated_at: '2021-10-30 01:53:16',
      created_at: '2021-10-30 01:53:16',
    },
    {
      key: '4',
      name: `Murabaha Financing SGD`,
      updated_at: '2021-10-30 01:53:16',
      created_at: '2021-10-30 01:53:16',
    },
  ]

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      width: 60,
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
      title: 'Last update',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 175,
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 175,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Edit master payout">
            <Button size="small">
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete master payout">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const onSearch = (value: string) => {
    console.log(value)
  }

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Contact templates</h3>

        <Space wrap>
          <Search
            placeholder="Search contract"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <Tooltip title="Create new template" placement={`topRight`}>
            <Link href={'/contract-templates/new'}>
              <Button type="dashed">
                <PlusOutlined />
              </Button>
            </Link>
          </Tooltip>
        </Space>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
    </Card>
  )
}

export default ContractTemplates
