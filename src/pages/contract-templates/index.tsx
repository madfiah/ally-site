import { Api } from '@/api/api'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Nunito } from '@next/font/google'
import { Button, Card, Input, message, Space, Table, Tooltip } from 'antd'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Search } = Input

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  user: any
}

const ContractTemplates = ({ user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [contracts, setContracts] = useState<any>([])
  const [filteredContracts, setFilteredContracts] = useState<any>([])

  const initContract = () => {
    setLoading(true)

    Api.get(`contract-templates`, user?.token)
      .then((res: any) => {
        setContracts(res.data)
        setFilteredContracts(res.data)
      })
      .catch((err) => {
        message.error({ content: 'failed to load data' })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initContract()
  }, [])

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
    const result = contracts.filter((contract: any) => {
      return (contract?.name ?? '').includes(value)
    })
    setFilteredContracts(result)
  }

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">Contact templates</h3>

        <Space wrap>
          <Search
            allowClear
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
        dataSource={filteredContracts}
        columns={columns}
        className={'mt-1'}
        loading={loading}
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
