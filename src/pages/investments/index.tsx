import { Api } from '@/api/api'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Nunito } from '@next/font/google'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
} from 'antd'
// import Search from 'antd/es/input/Search'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const { Search } = Input

interface IProps {
  user: any
}

const nunito = Nunito({ subsets: ['latin'] })

const Investments = ({ user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [getFundeds, setGetFundeds] = useState<any>(null)

  const init = () => {
    setLoading(true)
    // Api.get(`get-fundeds`, user?.token)
    //   .then((res: any) => {
    //     setGetFundeds(res.data)
    //     setFilteredGetFundeds(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    //   .finally(() => setLoading(false))

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    init()
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
      title: 'Campaign',
      dataIndex: 'campaign_name',
      key: 'campaign_name',
    },
    {
      title: 'User',
      dataIndex: 'user_name',
      key: 'user_name',
    },
  ]

  // const onSearch = (value: string) => {
  //   const result = getFundeds.filter((contract: any) => {
  //     return (contract?.name ?? '').includes(value)
  //   })

  //   setFilteredGetFundeds(result)
  // }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Investment</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Row>
          <Col span={24}>
            <Space className="space-between mb-1">
              <h3 className="m-0 fw-300">
                <strong className={nunito.className}>List of Investment</strong>
              </h3>
            </Space>

            <Table
              dataSource={[]}
              columns={columns}
              className={'mt-1'}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Investments

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
