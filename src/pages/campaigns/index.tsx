import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import {
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  FileProtectOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Nunito } from '@next/font/google'
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  notification,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import ExpandedCampaign from './components/ExpandedCampaign'

const { Search } = Input
const { Text } = Typography

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  data: any[]
  error?: any
  errorMessage?: string
}

const columns = [
  {
    title: 'Acronim',
    dataIndex: 'acronim',
    key: 'acronim',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => (
      <>
        {type === 'sme' ? (
          <Tag color={`#108ee9`} className={nunito.className}>
            SME
          </Tag>
        ) : (
          <Tag color={`#87d068`} className={nunito.className}>
            DONATION
          </Tag>
        )}
      </>
    ),
  },
  {
    title: 'Release date',
    dataIndex: 'release_datetime',
    key: 'release_datetime',
  },
  {
    title: 'Closing date',
    dataIndex: 'expiry_datetime',
    key: 'expiry_datetime',
  },
  {
    title: 'Current funding ($)',
    dataIndex: 'investments_count',
    key: 'investments_count',
    render: (investments_count: any) => (
      <div className="text-end">
        {investments_count ? currency(parseFloat(investments_count)) : '$0'}
      </div>
    ),
  },
  {
    title: 'Total funding ($)',
    dataIndex: 'total_invest_amount',
    key: 'total_invest_amount',
    render: (total_invest_amount: any) => (
      <div className="text-end">
        {total_invest_amount ? currency(parseFloat(total_invest_amount)) : '$0'}
      </div>
    ),
  },
  {
    title: 'Enable',
    dataIndex: 'is_enable',
    key: 'is_enable',
    render: (is_enable: boolean) => (
      <>{is_enable ? <CheckOutlined /> : <CloseOutlined />}</>
    ),
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    width: '150px',
    render: (data: any) => (
      <Space size={`small`} className="space-end">
        <Button size="small">
          <Tooltip title="Edit campaign">
            <EditOutlined />
          </Tooltip>
        </Button>
        <Link href={`/campaigns/contract`}>
          <Button size="small">
            <Tooltip title="Contract Campaign">
              <FileProtectOutlined />
            </Tooltip>
          </Button>
        </Link>
        <Dropdown
          menu={{
            items: [
              {
                key: '2',
                label: (
                  <Link href={'/campaigns/investment-report'}>
                    Investment Report
                  </Link>
                ),
              },
              {
                key: '3',
                label: (
                  <Link href={'/campaigns/payout-report'}>Payout Report</Link>
                ),
              },
              {
                key: '6',
                label: <span>Duplicate</span>,
              },
              {
                key: '7',
                label: <Text type="danger">Delete</Text>,
              },
            ],
          }}
          placement="bottomRight"
        >
          <Button size="small">
            <MoreOutlined />
          </Button>
        </Dropdown>
      </Space>
    ),
  },
]

const index = ({ data, error, errorMessage }: IProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (error) {
      notification.error({ message: errorMessage })

      signOut({
        callbackUrl: '/login',
      })
    }
  }, [])

  const onSearch = (value: string) => {
    console.log(value)
  }
  return (
    <>
      <div className="kb-card card-shadow">
        <div className="card-title">
          <Space className="space-between">
            <p className={nunito.className}>Campaigns</p>
            <Space wrap>
              <Search
                placeholder="Search campaign"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              <Tooltip title="Create new campaign" placement={`topRight`}>
                <Link href={'/campaigns/new'}>
                  <Button type="dashed">
                    <PlusOutlined />
                  </Button>
                </Link>
              </Tooltip>
            </Space>
          </Space>
        </div>
        <div className="card-body">
          <Table
            bordered
            rowKey="id"
            dataSource={data}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <ExpandedCampaign campaign={record} />
              ),
              rowExpandable: (record) => record.id !== 'Not Expandable',
            }}
            scroll={{ x: 800 }}
          />
        </div>
      </div>
    </>
  )
}

export default index

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return await Api.get('campaign?limit=25', user.token, user.id)
    .then((res: any) => {
      return {
        props: {
          data: res.data,
        },
      }
    })
    .catch((err) => {
      return {
        props: {
          data: [],
          error: err.status,
          errorMessage: 'Your login session was expired',
        },
      }
    })
}
