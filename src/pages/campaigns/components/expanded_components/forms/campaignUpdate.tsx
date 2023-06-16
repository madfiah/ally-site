import { Button, Form, Input, Modal, Space, Upload, notification } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'
import { Api } from '@/api/api'

import type { UploadProps } from 'antd'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Props {
  isShow: boolean
  handleHide: any
  action: string
  campaign: any
  campaign_update?: any
  user: any
  reloadData: any
}

const { TextArea } = Input

const FormCampaignUpdate = ({
  isShow,
  handleHide,
  action,
  campaign,
  campaign_update,
  user,
  reloadData,
}: Props) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<any>([])
  const [errors, setErrors] = useState<any>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const initFileList = () => {
    if (campaign_update.images) {
      let files: any = []

      console.log(campaign_update.images)
      if (typeof campaign_update.images === 'object') {
        campaign_update.images.map((image: string, idx: number) => {
          let item = {
            uid: Math.floor(1000 + Math.random() * 9000),
            name: `file-${idx}`,
            status: 'done',
            url: image,
          }

          files.push(item)
        })
      }

      setFileList(files)
    }
  }

  useEffect(() => {
    if (!isShow) {
      form.resetFields()
    } else {
      form.setFieldsValue(campaign_update)
      setImages(campaign_update.images)
      initFileList()
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
        ? `campaign-updates/create/${campaign?.id}`
        : `campaign-updates/update/${campaign_update?.id}`

    Api.post(apiUrl, user?.token, user?.id, params)
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
      .finally(() => setLoading(false))
  }

  const onChange = (info: any) => {
    if (info.file.status === 'done') {
      // let newFileList = [...info.fileList]

      // // 1. Limit the number of uploaded files
      // // Only to show two recent uploaded files, and old ones will be replaced by the new
      // // newFileList = newFileList.slice(-2)

      // // 2. Read from response and show file link
      // newFileList = newFileList.map((file) => {
      //   if (file.response) {
      //     // Component will show file.url as link
      //     file.url = file.response.url
      //   }
      //   return file
      // })

      // console.log(newFileList)

      // setFileList(newFileList)
      setImages([...images, info.file.response.data.file_path])
    } else if (info.file.status === 'error') {
      notification.error({ message: `file upload failed.` })
    }
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList]
    console.log('File Lists :', newFileList)

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // newFileList = newFileList.slice(-2)

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data.file_path

        setImages([...images, info.file.response.data.file_path])
      }
      return file
    })

    setFileList(newFileList)
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
          validateStatus={errors?.title.length > 0 ? 'error' : ''}
          help={errors?.title[0]}
        >
          <Input placeholder="Enter the percentage" />
        </Form.Item>

        <Form.Item
          required
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the content!' }]}
          validateStatus={errors?.description.length > 0 ? 'error' : ''}
          help={errors?.description[0]}
        >
          <TextArea rows={12} />
        </Form.Item>

        {campaign_update && (
          <Form.Item
            label="Files"
            // name="images"
            // rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Upload
              multiple={true}
              action={`${API_URL}/campaign-updates/upload/${campaign?.id}`}
              onChange={handleChange}
              listType="picture-card"
              fileList={fileList}
            >
              {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button onClick={handleHide}>Close</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormCampaignUpdate
