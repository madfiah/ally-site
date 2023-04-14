import {
  BankOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Upload,
} from 'antd'
import { useEffect, useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'
import FormWithdrawal from './components/formWithdrawal'

const Withdrawals = () => {
  const [form] = Form.useForm()

  const fileList: UploadFile[] = []

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSelected, setDataSelected] = useState<any>(null)
  const [addWithdrawalModalOpen, setAddWithdrawalModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields()
    } else {
      form.setFieldsValue(dataSelected)
    }
  }, [form, isModalOpen, dataSelected])

  const handleClosePreview = () => {
    setPreviewImage('')
    setPreviewOpen(false)
    setPreviewTitle('')
  }

  const openImage = (data: any) => {
    setPreviewImage(data.proof)
    setPreviewOpen(true)
    setPreviewTitle('Preview : proof withdrawal')
  }

  const dataSource = [
    {
      key: '1',
      user_fullname: 'Gael Ulrich ZAFIMINO',
      amount: 221.57,
      bank_name: 'DBS Bank Ltd',
      account_name: 'Gael Ulrich ZAFIMINO',
      bank_number: '1181000179',
      swift_code: 'DBSSSGSGXXX',
      iban_code: '',
      status: 1,
      date_requested: '1/25/2023, 10:13:01',
      proof: 'https://dummyimage.com/600x400/000/fff',
    },
    {
      key: '1',
      user_fullname: 'Gael Ulrich ZAFIMINO',
      amount: 221.57,
      bank_name: 'DBS Bank Ltd',
      account_name: 'Gael Ulrich ZAFIMINO',
      bank_number: '1181000179',
      swift_code: 'DBSSSGSGXXX',
      iban_code: '',
      status: 1,
      date_requested: '1/25/2023, 10:13:01',
      proof: 'https://dummyimage.com/600x400/000/fff',
    },
  ]

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
      title: 'User',
      dataIndex: 'user_fullname',
      key: 'user_fullname',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <InputNumber
          style={{ width: '100%' }}
          defaultValue={amount}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          bordered={false}
          readOnly
        />
      ),
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
      dataIndex: 'bank_number',
      key: 'bank_number',
    },
    {
      title: 'SWIFT Code',
      dataIndex: 'swift_code',
      key: 'swift_code',
    },
    {
      title: 'IBAN code',
      dataIndex: 'iban_code',
      key: 'iban_code',
      render: (iban_code: string) => <>{iban_code ? iban_code : 'N/A'}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (sent_at: boolean) => (
        <>
          {sent_at ? (
            <Tag color="cyan">Sent</Tag>
          ) : (
            <Tag color="orange">Pending</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Date requested',
      dataIndex: 'date_requested',
      key: 'date_requested',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="See Transfer Proof">
            <Button
              type="primary"
              size="small"
              disabled={data.proof === null}
              onClick={() => openImage(data)}
            >
              <FileSearchOutlined />
            </Button>
          </Tooltip>
          {/* <Tooltip title="Detail bank">
            <Button size="small">
              <BankOutlined />
            </Button>
          </Tooltip> */}
          <Tooltip title="Edit">
            <Button size="small" onClick={showModal}>
              <EditOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Space className="space-between mb-1">
            <h3 className="m-0 fw-300">KB wallet withdrawals</h3>
            <Tooltip title="Add withdrawal request">
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => setAddWithdrawalModalOpen(true)}
              ></Button>
            </Tooltip>
          </Space>

          <Table dataSource={dataSource} columns={columns} className={'mt-1'} />

          <FormWithdrawal
            isShow={addWithdrawalModalOpen}
            handleHide={() => setAddWithdrawalModalOpen(false)}
          />

          <Modal
            title="Update withdrawal - Gael Ulrich ZAFIMINO"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="mt-2"
            >
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true }]}
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select status" allowClear>
                  <Select.Option value={1}>Paid</Select.Option>
                  <Select.Option value={0}>Pending</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Proof"
                name="proof"
                rules={[
                  { required: true, message: 'Please upload the proof!' },
                ]}
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  defaultFileList={[...fileList]}
                  maxCount={1}
                >
                  {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button onClick={() => form.resetFields()}>Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleClosePreview}
            style={{ top: 20 }}
          >
            <img
              alt={previewTitle}
              style={{ width: '100%', marginTop: '15px' }}
              src={previewImage}
            />
          </Modal>
        </Col>
      </Row>
    </Card>
  )
}

export default Withdrawals
