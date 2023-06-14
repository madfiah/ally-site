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
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

// dayjs.extend(customParseFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  master_payout?: any
  token: string
  reloadData: any
}

const FormMasterPayout = ({
  isShow,
  handleHide,
  action,
  master_payout,
  token,
  reloadData,
}: Props) => {
  const [form] = Form.useForm()
  const [data, setData] = useState<any>()
  const [errors, setErrors] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isShow) {
      setData({})
      form.resetFields()
    } else {
      const mast = {
        ...master_payout,
        due_date: master_payout.date ? dayjs(master_payout.date) : null,
      }
      setData(mast)
      form.setFieldsValue(mast)
    }
  }, [form, isShow, master_payout])

  const onFinish = (values: any) => {
    setLoading(true)
    const apiAction =
      action === 'create'
        ? `master-payouts/create/campaign/${master_payout.campaign_id}`
        : `master-payouts/update/${master_payout.id}`

    const params = {
      ...values,
      date: dayjs(values.due_date).format('YYYY-MM-DD'),
    }

    Api.post(apiAction, token, null, params)
      .then((res: any) => {
        handleHide()
        setTimeout(() => {
          reloadData()
        }, 300)
        notification.success({
          message: res.message,
        })
      })
      .catch((err) => {
        console.log(err)
        notification.error({
          message: err.data.message,
        })
        setErrors(err.data.data)
      })
      .finally(() => {
        setLoading(false)
      })
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
        autoComplete="off"
        className="mt-2"
      >
        <Form.Item
          label="Percentage"
          name="percentage"
          rules={[{ required: true, message: 'Please input percentage!' }]}
          validateStatus={errors?.percentage.length > 0 ? 'error' : ''}
          help={errors?.percentage[0]}
        >
          <Input placeholder="Enter percentage" />
        </Form.Item>

        <Form.Item
          label="Project Return"
          name="return"
          rules={[{ required: true, message: 'Please input project return!' }]}
          validateStatus={errors?.return.length > 0 ? 'error' : ''}
          help={errors?.return[0]}
        >
          <Input placeholder="Enter return" disabled />
        </Form.Item>

        <Form.Item
          required
          label="Due Date"
          name={'due_date'}
          validateStatus={errors?.date.length > 0 ? 'error' : ''}
          help={errors?.due_date[0]}
        >
          <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true }]}
          validateStatus={errors?.status.length > 0 ? 'error' : ''}
          help={errors?.status[0]}
        >
          <Select placeholder="Select status" allowClear>
            <Select.Option value="on-going">On-going</Select.Option>
            <Select.Option value="delay">Delay</Select.Option>
            <Select.Option value="paid">Paid</Select.Option>
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
