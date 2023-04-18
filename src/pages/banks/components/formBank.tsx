import { Button, Form, Input, Modal, Select, Space } from 'antd'

import { useEffect, useState } from 'react'

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  bank?: any
}

const FormBank = ({ isShow, handleHide, action, bank }: Props) => {
  const [form] = Form.useForm()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!isShow) {
      setData({})
      form.resetFields()
    } else {
      form.setFieldsValue(bank)
    }
  }, [form, isShow, bank])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title={action === 'create' ? 'Create new bank' : 'Edit data bank'}
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
          label="Bank Code"
          name="bank_code"
          rules={[{ required: true, message: 'Please input bank code!' }]}
        >
          <Input placeholder="Enter the bank code" />
        </Form.Item>

        <Form.Item
          label="BIC code"
          name="bic_code"
          rules={[
            { required: true, message: 'Please input project bic code!' },
          ]}
        >
          <Input placeholder="Enter the bic code" />
        </Form.Item>

        <Form.Item
          label="IBAN code"
          name="iban_code"
          rules={[{ required: true, message: 'Please input iban_code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: 'Please input currency!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Select placeholder="Select country" showSearch allowClear>
            <Select.Option value="Indonesia">Indonesia</Select.Option>
            <Select.Option value="Sinagpore">Sinagpore</Select.Option>
            <Select.Option value="Malaysia">Malaysia</Select.Option>
            <Select.Option value="United Kingdom">United Kingdom</Select.Option>
          </Select>
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
  )
}

export default FormBank
