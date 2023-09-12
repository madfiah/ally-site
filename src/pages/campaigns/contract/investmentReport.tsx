import { Api } from '@/api/api'
import { currency } from '@/utils/helpers'
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FieldNumberOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
  OrderedListOutlined,
  ReloadOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Select,
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

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const InvestmentReport = ({ user, slug }: Iprops) => {
  const [investors, setInvestors] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openLogLoading, setOpenLogLoading] = useState(false)
  const [contractFileId, setContractFileId] = useState<any>(null)
  const [investorsId, setInvestorsId] = useState<any>([])

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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Space size={15}>
            <Select
              showSearch
              allowClear
              placeholder="Select Contract"
              style={{ width: 200 }}
              options={[
                { label: 'Investor (IDR)', value: 12 },
                { label: 'Investor (SGD)', value: 13 },
              ]}
            />
          </Space>
        </Col>
        <Col span={12}>
          <Space className="space-end">
            <Button
              type="primary"
              icon={<SendOutlined />}
              disabled={contractFileId === null || investorsId.length === 0}
            >{`Send Contract`}</Button>
            <Button
              onClick={initData}
              icon={<ReloadOutlined />}
            >{`Refresh`}</Button>
          </Space>
        </Col>
      </Row>

      <Divider orientation="left" dashed>
        Campaign Investors
      </Divider>

      <Table
        rowKey={`id`}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        dataSource={investors}
        columns={columns}
        loading={loading}
      />

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
