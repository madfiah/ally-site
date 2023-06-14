import { Button, Form, Input, Modal, Space, Upload, notification } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'
import { Api } from '@/api/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  campaign: any
  campaign_update?: any
  user: any
}

const { TextArea } = Input

const fileList: UploadFile[] = []

interface req {
  file: any
  onSuccess: any
}
const customRequest = ({ file, onSuccess }: req) => {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

const FormCampaignUpdate = ({
  isShow,
  handleHide,
  action,
  campaign,
  campaign_update,
  user,
}: Props) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<any>([])

  useEffect(() => {
    if (!isShow) {
      form.resetFields()
    } else {
      form.setFieldsValue(campaign_update)
    }
  }, [form, isShow, campaign_update])

  const onFinish = (values: any) => {
    setLoading(true)

    const params = {
      ...values,
      description: values.content,
      images: images,
    }

    const apiUrl =
      action === 'create'
        ? `campaign-updates/create/${campaign.id}`
        : `campaign-updates/update/${campaign_update.id}`

    Api.post(apiUrl, user.token, user.id, params)
      .then((res: any) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  const onChange = (info: any) => {
    if (info.file.status === 'done') {
      console.log(info.file)
      setImages([...images, info.file.response.data.file_path])
    } else if (info.file.status === 'error') {
      notification.error({ message: `file upload failed.` })
    }
  }

  return (
    <Modal
      style={{ top: '20px' }}
      title={
        action === 'create' ? 'Create campaign news' : 'Edit campaign news'
      }
      centered
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
          required
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter the percentage" />
        </Form.Item>

        <Form.Item
          required
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <TextArea rows={12} />
        </Form.Item>

        <Form.Item
          label="Files"
          // name="images"
          // rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Upload
            action={`${API_URL}/campaign-updates/upload/${campaign.id}`}
            onChange={onChange}
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

export default FormCampaignUpdate
