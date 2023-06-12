import { Api } from '@/api/api'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Space,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  master_payout?: any
  token: string
}

const FormMasterPayout = ({
  isShow,
  handleHide,
  action,
  master_payout,
  token,
}: Props) => {
  const [form] = Form.useForm()
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isShow) {
      setData({})
      form.resetFields()
    } else {
      form.setFieldsValue(master_payout)
    }
  }, [form, isShow, master_payout])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    const apiAction =
      action === 'create'
        ? `master-payouts/create/campaign/${data.campaign_id}`
        : `master-payouts/update/${data.id}`

    Api.post(apiAction, token, null, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        notification.error(err.data.message)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Modal
      title={
        action === 'create'
          ? 'Create new master payout'
          : 'Edit data master payout'
      }
      open={isShow}
      onCancel={handleHide}
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
          label="Percentage"
          name="percentage"
          rules={[{ required: true, message: 'Please input percentage!' }]}
        >
          <Input placeholder="Enter percentage" />
        </Form.Item>

        <Form.Item
          label="Project Return"
          name="return"
          rules={[{ required: true, message: 'Please input project return!' }]}
        >
          <Input placeholder="Enter return" />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="due_date"
          getValueProps={(i: string) => ({ value: moment(i) })}
        >
          <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select status" allowClear>
            <Select.Option value="on going">on going</Select.Option>
            <Select.Option value="delay">delay</Select.Option>
            <Select.Option value="paid">paid</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormMasterPayout
