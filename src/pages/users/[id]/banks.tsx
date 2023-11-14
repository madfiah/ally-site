import { Api } from '@/api/api'
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const { Search } = Input

interface IProps {
  user: any
}

const Banks = ({ user }: IProps) => {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [banks, setBanks] = useState<any>(null)
  const [filteredBanks, setFilteredBanks] = useState<any>(null)
  const [dataUser, setDataUser] = useState<any>(null)

  const user_id = router.query.id

  const initData = () => {
    setloading(true)

    Api.get(`users/${user_id}/banks`, user?.token)
      .then((res: any) => {
        setBanks(res.data.bank_accounts)
        setFilteredBanks(res.data.bank_accounts)
        setDataUser(res.data.user)
      })
      .catch((err) => {
        setBanks(null)
        setDataUser(false)
        notification.error({ message: err.data.message })
      })
      .finally(() => setloading(false))
  }
  useEffect(() => {
    initData()
  }, [])

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
      dataIndex: 'account_number',
      key: 'account_number',
    },
    {
      title: 'Country of bank',
      dataIndex: 'bank',
      key: 'bank',
      render: (bank: any) => bank.country,
    },
    {
      title: 'Currency',
      dataIndex: 'bank',
      key: 'bank',
      render: (bank: any) => bank.currency,
    },
    {
      title: 'SWIFT code',
      dataIndex: 'bank',
      key: 'bank',
      render: (bank: any) => bank.bic_code,
    },
    {
      title: 'IBAN code',
      dataIndex: 'bank',
      key: 'bank',
      render: (bank: any) => bank.iban_code,
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'x',
    //   width: '70px',
    //   render: (data: any) => (
    //     <Space size={`small`} className="space-end">
    //       {/* <Tooltip title="Edit">
    //         <Button size="small">
    //           <EditOutlined />
    //         </Button>
    //       </Tooltip> */}
    //       <Tooltip title="Delete data bank">
    //         <Button size="small" danger>
    //           <DeleteOutlined />
    //         </Button>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ]

  const onSearch = (value: string) => {
    const result = banks.filter((contract: any) => {
      return (contract?.bank_name ?? '').includes(value)
    })

    setFilteredBanks(result)
  }

  return (
    <Card>
      {dataUser === false ? (
        <div className="text-center my-5">
          <Typography.Title level={2} type={'danger'}>
            <CloseCircleOutlined style={{ fontSize: '5rem' }} />

            <span style={{ display: 'block', marginTop: '0.565rem' }}>
              User not found
            </span>
          </Typography.Title>
          <br />
          <Link href={`/users`}>
            <Button size="middle">BACK</Button>
          </Link>
        </div>
      ) : (
        <Row>
          <Col span={24}>
            <Space className="space-between mb-1">
              <Typography.Title level={4} className="m-0">
                Data Banks - {dataUser?.full_name}
              </Typography.Title>
              <Search
                allowClear
                onSearch={onSearch}
                placeholder="Find by bank name"
              />
            </Space>

            <Table
              dataSource={filteredBanks}
              columns={columns}
              className={'mt-1'}
              loading={loading}
            />
          </Col>
        </Row>
      )}
    </Card>
  )
}

export default Banks

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
