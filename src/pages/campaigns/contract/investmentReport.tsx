import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import {
  DeleteOutlined,
  EditOutlined,
  FieldNumberOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
  OrderedListOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Button,
  Divider,
  InputNumber,
  Modal,
  Space,
  Table,
  Timeline,
  Tooltip,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'

const { Text, Link } = Typography

interface Iprops {
  user: any
  slug: any
}

const InvestmentReport = ({ user, slug }: Iprops) => {
  const [investors, setInvestors] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openLogLoading, setOpenLogLoading] = useState(false)

  const initData = () => {
    setLoading(true)

    Api.get(`campaign/investors/${slug}`, user?.token)
      .then((res: any) => {
        console.log(res)
        setInvestors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    initData()
  }, [])

  const openLogs = (data: any) => {
    // api to get the data of logs
    setIsModalOpen(true)
    setOpenLogLoading(true)

    setTimeout(() => {
      setOpenLogLoading(false)
    }, 2500)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      width: '25%',
      render: (user: any) => user?.ic_name,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
      width: '25%',
      render: (user: any) => user?.email,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '15%',
      render: (amount: number) => currency(amount),
    },
    {
      title: 'Invest Date',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip
            title={
              data.has_contract
                ? data.sent_contract
                  ? 'Contract has been sent'
                  : 'Send contract to user'
                : 'The contract has not been made'
            }
          >
            <Button
              type="primary"
              size="small"
              disabled={
                !data.has_contract ? true : data.sent_contract ? true : false
              }
            >
              <SendOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Contract logs">
            <Button size="small" onClick={() => openLogs(data)}>
              <FieldTimeOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left" dashed>
        Investor Report
      </Divider>
      <Table dataSource={investors} columns={columns} loading={loading} />

      <Modal
        title="Eversign Document"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        {openLogLoading ? (
          <div className="text-center my-5">
            <LoadingOutlined style={{ fontSize: '2.5rem' }} />
            <h3>Fetching data..</h3>
          </div>
        ) : (
          <>
            <h4>Title : 20 PT BMJ (9) - Norliana Mohammad Hamber</h4>
            <h4 className="m-0">Signer</h4>
            <ol className="mt-0 mb-2">
              <li>
                norliana.hamber@gmail.com{' '}
                <Text type="danger">[not signed yet]</Text>
              </li>
              <li>
                erly@kapitalboost.com <Text type="success">[signed]</Text>
              </li>
            </ol>
            <h4>Logs</h4>
            <Timeline
              items={[
                {
                  color: 'blue',
                  children: (
                    <>
                      <p className="p-0 m-0">
                        document_sent - norliana.hamber@gmail.com
                      </p>
                      <Text type="secondary">
                        <small>2021-11-23 17:26:02</small>
                      </Text>
                    </>
                  ),
                },
                {
                  color: 'gray',
                  children: (
                    <>
                      <p className="p-0 m-0">document_created -</p>
                      <Text type="secondary">
                        <small>2021-11-23 17:26:01</small>
                      </Text>
                    </>
                  ),
                },
              ]}
            />
          </>
        )}
      </Modal>
    </>
  )
}

export default InvestmentReport
