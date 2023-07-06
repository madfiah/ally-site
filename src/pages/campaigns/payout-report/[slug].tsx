import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Card, InputNumber, Modal, Space, Table, Tooltip } from 'antd'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface DataType {
  key: React.Key
  name: string
  bic_code: string
  account_name: string
  account_number: string
  email: string
  payout_1: number
  payout_2: number
  payout_3: number
  payout_4: number
  payout_5: number
  payout_6: number
  payout_7: number
  payout_8: number
}

interface IProps {
  user: any
}

const InvestmentReport = ({ user }: IProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [report, setReport] = useState([])

  const slug = router.query.slug

  const initData = () => {
    setLoading(true)
    Api.get(`campaign/payout-report/${slug}`, user?.token)
      .then((res: any) => {
        setCampaignName(res.data.campaign_name)
        setReport(res.data.report)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initData()
  }, [])

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      width: 150,
      render: (key: any, data: any, idx: number) => {
        return <>{idx + 1}</>
      },
    },
    {
      title: 'Investor',
      dataIndex: 'investor',
      key: 'investor',
      width: '200px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '200px',
    },
    {
      title: 'BIC Code',
      dataIndex: 'bic_code',
      key: 'bic_code',
      width: '150px',
    },
    {
      title: 'Account Name',
      dataIndex: 'account_name',
      key: 'account_name',
      width: '200px',
    },
    {
      title: 'Account Number',
      dataIndex: 'account_number',
      key: 'account_number',
      width: '150px',
    },
    {
      title: 'Payout 1',
      dataIndex: 'payout_1',
      key: 'payout_1',
      width: '150px',
      render: (payout_1: number) => <>{payout_1 ? currency(payout_1) : '-'}</>,
    },
    {
      title: 'Payout 2',
      dataIndex: 'payout_2',
      key: 'payout_2',
      width: '150px',
      render: (payout_2: number) => <>{payout_2 ? currency(payout_2) : '-'}</>,
    },
    {
      title: 'Payout 3',
      dataIndex: 'payout_3',
      key: 'payout_3',
      width: '150px',
      render: (payout_3: number) => <>{payout_3 ? currency(payout_3) : '-'}</>,
    },
    {
      title: 'Payout 4',
      dataIndex: 'payout_4',
      key: 'payout_4',
      width: '150px',
      render: (payout_4: number) => <>{payout_4 ? currency(payout_4) : '-'}</>,
    },
    {
      title: 'Payout 5',
      dataIndex: 'payout_5',
      key: 'payout_5',
      width: '150px',
      render: (payout_5: number) => <>{payout_5 ? currency(payout_5) : '-'}</>,
    },
    {
      title: 'Payout 6',
      dataIndex: 'payout_6',
      key: 'payout_6',
      width: '150px',
      render: (payout_6: number) => <>{payout_6 ? currency(payout_6) : '-'}</>,
    },
    {
      title: 'Payout 7',
      dataIndex: 'payout_7',
      key: 'payout_7',
      width: '150px',
      render: (payout_7: number) => <>{payout_7 ? currency(payout_7) : '-'}</>,
    },
    {
      title: 'Payout 8',
      dataIndex: 'payout_8',
      key: 'payout_8',
      width: '150px',
      render: (payout_8: number) => <>{payout_8 ? currency(payout_8) : '-'}</>,
    },
  ]

  return (
    <Card
      title={campaignName}
      extra={
        <Button size="small" icon={<DownloadOutlined />}>
          Export to Excel
        </Button>
      }
    >
      <Table
        dataSource={report}
        columns={columns}
        scroll={{ x: 1300 }}
        loading={loading}
      />
    </Card>
  )
}

export default InvestmentReport

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
