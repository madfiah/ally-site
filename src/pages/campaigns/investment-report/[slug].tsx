import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import {
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Card, InputNumber, Modal, Space, Table, Tooltip } from 'antd'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const dataSource = [
  {
    key: '1',
    full_name: 'AZMI BIN SALLEH',
    ic_number: 'S1634816C',
    nationality: 'SINGAPORE',
    amount: '3000',
    payout: '3063.00',
  },
  {
    key: '2',
    full_name: 'Ebadullah Bin Siddiq',
    ic_number: 'S2714048C',
    nationality: 'BANGLADESH',
    amount: '1640',
    payout: '1674.44',
  },
]

interface IProps {
  user: any
}

const InvestmentReport = ({ user }: IProps) => {
  const router = useRouter()
  const [modal, contextHolder] = Modal.useModal()
  const [loading, setLoading] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [report, setReport] = useState([])

  const slug = router.query.slug

  const initData = () => {
    setLoading(true)
    Api.get(`campaign/investment-report/${slug}`, user?.token)
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

  const confirm = (data: any) => {
    modal.confirm({
      title: 'Delete Action',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete data investment ${currency(
        data.amount
      )} from ${data.user.ic_name} `,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        console.log('Deleting investment data for name ', data.user.ic_name)
      },
    })
  }

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
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      width: '30%',
      render: (user: any) => <>{user.ic_name}</>,
    },
    {
      title: 'IC Number',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => <>{user.nric}</>,
    },
    {
      title: 'Nationality',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => <>{user.nationality}</>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '15%',
      render: (amount: number) => <>{currency(amount)}</>,
    },
    {
      title: 'Total Payout',
      dataIndex: 'payout',
      key: 'payout',
      width: '15%',
      render: (payout: number) => <>{currency(payout)}</>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Delete data investment">
            <Button size="small" danger onClick={() => confirm(data)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
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
        scroll={{ x: 800 }}
        loading={loading}
      />
      {contextHolder}
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
