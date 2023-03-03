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
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { getSession } from 'next-auth/react'
import ExpandedCampaign from './components/ExpandedCampaign'

const { Search } = Input
const { Text } = Typography

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  data: any[]
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
    render: () => (
      <Space size={`small`} className="space-end">
        <Button size="small">
          <Tooltip title="Edit campaign">
            <EditOutlined />
          </Tooltip>
        </Button>
        <Button size="small">
          <Tooltip title="Contract Campaign">
            <FileProtectOutlined />
          </Tooltip>
        </Button>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button size="small">
            <MoreOutlined />
          </Button>
        </Dropdown>
      </Space>
    ),
  },
]

const items: MenuProps['items'] = [
  {
    key: '2',
    label: <span>Investment Report</span>,
  },
  {
    key: '3',
    label: <span>Payout Report</span>,
  },
  {
    key: '4',
    label: <span>Master Payout</span>,
  },
  {
    key: '5',
    label: <span>Campaign Updates</span>,
  },
  {
    key: '6',
    label: <span>Duplicate</span>,
  },
  {
    key: '7',
    label: <Text type="danger">Delete</Text>,
  },
]

const index = ({ data }: IProps) => {
  console.log(data)

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
                <Button type="dashed">
                  <PlusOutlined />
                </Button>
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

  return Api.get('campaign?limit=25', user.token, user.id).then((res) => {
    if (res.data) {
      return {
        props: {
          data: res.data,
        },
      }
    } else {
      return {
        props: {
          data: [],
        },
      }
    }
  })
}
