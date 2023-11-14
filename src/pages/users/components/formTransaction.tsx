import { Api } from '@/api/api'
import { SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
  Space,
} from 'antd'
import { useEffect, useState } from 'react'

interface Props {
  action: string
  wallet_transaction: any
  modalOpen: boolean
  handleCloseModal: any
  onReloadData: any
  token: string
  user_id: any
}

const FormTransaction = ({
  action,
  wallet_transaction,
  modalOpen,
  handleCloseModal,
  onReloadData,
  token,
  user_id,
}: Props) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!modalOpen) {
      form.resetFields()
    } else {
      form.setFieldsValue(wallet_transaction)
    }
  }, [form, modalOpen, wallet_transaction])

  const onFinish = (values: any) => {
    setLoading(true)

    const url =
      action === 'edit'
        ? `transactions/${wallet_transaction?.id}?_method=put`
        : `transactions/${user_id}`

    Api.post(url, token, null, values)
      .then((res: any) => {
        onReloadData()
        notification.success({ message: 'success to add new transaction' })

        setTimeout(() => {
          handleCloseModal()
        }, 500)
      })
      .catch((err) => {
        message.error({ content: err.data.message })
      })
      .finally(() => setLoading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    console.log('Data Wallet: ', wallet_transaction)
  }

  const onReset = () => {
    form.setFieldsValue(wallet_transaction)
  }

  return (
    <Modal
      title={action === 'new' ? 'Create New Transaction' : 'Edit Transaction'}
      open={modalOpen}
      onCancel={handleCloseModal}
      footer={null}
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
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Select placeholder="Select title" allowClear>
            <Select.Option value="Top Up">Top Up</Select.Option>
            <Select.Option value="Withdrawal">Withdrawal</Select.Option>
            <Select.Option value="Investment">Investment</Select.Option>
            <Select.Option value="Donation">Donation</Select.Option>
            <Select.Option value="Payout">Payout</Select.Option>
            <Select.Option value="Cash Back">Cash Back</Select.Option>
            <Select.Option value="Reduce Balance">Reduce Balance</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea rows={2} placeholder="Enter the description" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input amount!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            placeholder="Enter the amount"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space size={10}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{ width: 150 }}
              loading={loading}
            >
              Save
            </Button>
            {action === 'new' ? (
              <Button htmlType="reset">Reset</Button>
            ) : (
              <Button onClick={onReset}>Reset</Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormTransaction
