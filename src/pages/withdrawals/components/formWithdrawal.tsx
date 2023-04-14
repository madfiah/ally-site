import { Button, Form, Input, Modal, Select, Space, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'

const fileList: UploadFile[] = []

interface Props {
  isShow: boolean
  handleHide: any
}

const FormWithdrawal = ({ isShow, handleHide }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!isShow) {
      form.resetFields()
    }
  }, [form, isShow])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Modal
        title="Add withdrawal"
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
          <Form.Item name="user" label="User" rules={[{ required: true }]}>
            <Select
              placeholder="Select user"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="bank_account"
            label="Bank Account"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select user bank account"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: '11782',
                  label: 'HSBC Bank Ltd - 12772716872',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status" allowClear>
              <Select.Option value={1}>Paid</Select.Option>
              <Select.Option value={0}>Pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Proof"
            name="proof"
            rules={[{ required: true, message: 'Please upload the proof!' }]}
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
    </>
  )
}

export default FormWithdrawal
