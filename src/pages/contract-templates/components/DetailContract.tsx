import { Api } from '@/api/api'
import { Button, Form, Input, notification, Select, Space, Switch } from 'antd'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Option = Select.Option

interface IProps {
  user: any
  contract: any
  onChangeContract: any
}

const DetailContract = ({ user, contract, onChangeContract }: IProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(contract)
  }, [contract])

  const onFinish = (values: any) => {
    setLoading(true)
    Api.post(`contract-templates/edit/${contract?.id}`, user.token, user.id, {
      ...values,
      main_content: contract.content,
    })
      .then((res: any) => {
        notification.success({ message: 'Success to update contract detail' })

        onChangeContract(res.data)
      })
      .catch((err: any) => {
        notification.error({ message: err.message })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600, marginTop: 0 }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          showSearch
        >
          <Option value={'all'}>All</Option>
          <Option value={'murabaha'}>Murabaha</Option>
          <Option value={'invoice-financing'}>Invoice Financing</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="user_for"
        label="Contract For"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a user type" allowClear>
          <Option value="Investor">Investor</Option>
          <Option value="UKM">UKM</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item label="Active?" name={`is_show`} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
        <Space>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => form.setFieldsValue(contract)}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default DetailContract
