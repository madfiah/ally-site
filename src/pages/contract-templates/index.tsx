import { Api } from '@/api/api'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Input, Space, Table, Tooltip } from 'antd'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Search } = Input

interface IProps {
  user: any
}

const ContractTemplates = ({ user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [contractTemplates, setContractTemplates] = useState<any>(null)

  const initData = () => {
    setLoading(true)

    Api.get(`contract-templates`, user?.token)
      .then((res: any) => {
        // console.log(res)
        setContractTemplates(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      })
  }

  useEffect(() => {
    initData()
  }, [])

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

      <Table
        dataSource={contractTemplates}
        columns={columns}
        className={'mt-1'}
        loading={loading}
        rowKey={'id'}
      />
    </Card>
  )
}

export default ContractTemplates

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
