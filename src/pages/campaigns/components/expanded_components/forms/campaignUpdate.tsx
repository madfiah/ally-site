import { Button, Form, Input, Modal, Space, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  campaign_update?: any
}

const { TextArea } = Input

const fileList: UploadFile[] = []

const FormCampaignUpdate = ({
  isShow,
  handleHide,
  action,
  campaign_update,
}: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!isShow) {
      form.resetFields()
    } else {
      form.setFieldsValue(campaign_update)
    }
  }, [form, isShow, campaign_update])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      style={{ top: '20px' }}
      title={
        action === 'create' ? 'Create campaign news' : 'Edit campaign news'
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
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter the percentage" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          {/* <Input placeholder="Enter the percentage" /> */}
          <TextArea rows={12} />
        </Form.Item>

        <Form.Item
          label="Files"
          // name="content"
          // rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            defaultFileList={[...fileList]}
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
  )
}

export default FormCampaignUpdate
