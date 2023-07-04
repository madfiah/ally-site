/* eslint-disable react-hooks/exhaustive-deps */
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
  DatePicker,
  Dropdown,
  Input,
  MenuProps,
  notification,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import moment from 'moment'

import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ExpandedCampaign from './components/ExpandedCampaign'
import NewCampaignPopup from './components/NewCampaign'

const { Search } = Input
const { Text } = Typography

const nunito = Nunito({ subsets: ['latin'] })

interface IProps {
  user: any
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
    dataIndex: 'currenct_invest',
    key: 'currenct_invest',
    render: (currenct_invest: any) => (
      <div className="text-end">
        {currenct_invest ? currency(parseFloat(currenct_invest)) : '$0'}
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
        <Link href={`/campaigns/edit/${data.slug}`}>
          <Button size="small">
            <Tooltip title="Edit campaign">
              <EditOutlined />
            </Tooltip>
          </Button>
        </Link>
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
                  <Link href={`/campaigns/investment-report/${data.slug}`}>
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

const Index = ({ user }: IProps) => {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<any>({
    data: [],
  })
  const [filter, setFilter] = useState({
    campaign_name: '',
    type: null,
    release_date: '',
  })
  const [loading, setLoading] = useState(false)
  const [newCampaignPopup, setNewCampaignPopup] = useState(false)

  const initCampaigns = async (params: any) => {
    setLoading(true)
    Api.get('campaign', user.token, params, user.id)
      .then((res: any) => {
        console.log(res.data)
        setCampaigns(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.status === 401) {
          notification.error({ message: 'Your login session was expired' })

          signOut({
            callbackUrl: '/login',
          })
        } else {
          notification.error({ message: err.message })
        }
      })
      .finally(() => setLoading(false))
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    initCampaigns({
      ...filter,
      per_page: 10,
    })
  }, [filter])

  const onSearch = (value: string) => {
    setFilter({
      ...filter,
      campaign_name: value,
    })
  }

  const handleTableChange = (pagination: any) => {
    initCampaigns({
      ...filter,
      per_page: pagination.pageSize,
      page: pagination.current,
    })
  }

  const actionAfterCreateCampaign = (slug: string) => {
    router.push(`campaigns/edit/${slug}`)
  }

  return (
    <>
      <div className="kb-card card-shadow">
        <div className="card-title">
          <Space className="space-between">
            <p className={nunito.className}>Campaigns</p>
            <Space wrap>
              <Tooltip title="Create new campaign" placement={`topRight`}>
                <Button onClick={() => setNewCampaignPopup(true)}>
                  <PlusOutlined /> Create
                </Button>
              </Tooltip>
            </Space>
          </Space>
          <div className="mt-1">
            <Space>
              <Search
                allowClear
                placeholder="Search by name"
                onSearch={onSearch}
                style={{ width: 250 }}
              />
              <Select
                allowClear
                placeholder="Select type"
                style={{ width: 150 }}
                options={[
                  { value: 'SME', label: 'SME' },
                  { value: 'Donation', label: 'Donation' },
                ]}
                onChange={(vl) =>
                  setFilter({
                    ...filter,
                    type: vl,
                  })
                }
              />
              <DatePicker
                placeholder="Release date"
                format={'YYYY-MM-DD'}
                style={{ width: '100%' }}
                onChange={(e: any) => {
                  if (e) {
                    setFilter({
                      ...filter,
                      release_date: moment(e.$d).format('YYYY-MM-DD'),
                    })
                  } else {
                    setFilter({
                      ...filter,
                      release_date: '',
                    })
                  }
                }}
              />
            </Space>
          </div>
        </div>
        <div className="card-body">
          <Table
            bordered
            rowKey="id"
            loading={loading}
            dataSource={campaigns.data}
            columns={columns}
            onChange={handleTableChange}
            expandable={{
              expandedRowRender: (record) => (
                <ExpandedCampaign campaign={record} user={user} />
              ),
              rowExpandable: (record) => record.id !== 'Not Expandable',
            }}
            scroll={{ x: 800 }}
            pagination={{
              total: campaigns?.total,
              current: campaigns?.current_page,
              pageSize: 10,
              showSizeChanger: false,
            }}
          />
        </div>
      </div>

      <NewCampaignPopup
        user={user}
        isModalOpen={newCampaignPopup}
        handleOk={actionAfterCreateCampaign}
        handleCancel={() => setNewCampaignPopup(false)}
      />
    </>
  )
}

export default Index

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
