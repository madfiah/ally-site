import { Api } from '@/api/api'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from 'antd'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadProps } from 'antd'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

interface IProps {
  user: any
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const EditBlog = ({ user }: IProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm()
  const [banner, setBanner] = useState<UploadFile[]>([])
  const [blogContent, setBlogContent] = useState('')

  const blog_id = router.query.id

  const init = () => {
    Api.get(`blogs/${blog_id}`, user?.token).then((res: any) => {
      form.setFieldsValue({
        ...res.data,
        tags: res.data.tags ? res.data.tags.toString() : '',
        is_enable: res.data.is_enable ? 1 : 0,
      })

      setBanner([
        {
          uid: '1',
          name: 'banner image',
          status: 'done',
          url: res.data?.image,
        },
      ])

      setBlogContent(res.data.content)
    })
  }

  useEffect(() => {
    init()
  }, [])

  const onFinish = (values: any) => {
    setLoading(true)

    Api.post(`blogs/${blog_id}?_method=put`, user?.token, null, {
      ...values,
    })
      .then((res: any) => {
        notification.success({ message: res.message })

        Router.push(`/blogs`)
      })
      .catch((err) => {
        message.error({ content: err.data.message })
      })
      .finally(() => setLoading(false))
  }

  const handleUpload: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        const { data } = file.response

        file.uid = Math.random().toString()
        file.name = Math.random().toString()
        file.url = data.file_path

        form.setFieldValue('image', data.file_path)
      }
      return file
    })

    setBanner(newFileList)
  }

  const handleEditorChange = (content: any, editor: any) => {
    // setBlogContent(content)
    form.setFieldValue('blog_body', content)
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Blogs</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/blogs`}>List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Blog</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Space className="space-between mb-1">
          <Typography.Title level={3} className={`m-0 p-0`}>
            Edit Blog
          </Typography.Title>
        </Space>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={15}>
            <Col span={24}>
              <Form.Item label="Title" name={`title`}>
                <Input placeholder="Enter the title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="Status" name={`is_enable`}>
                {/* <Input placeholder="set status" /> */}
                <Select placeholder={`Select status`}>
                  <Select.Option value={1}>Enable</Select.Option>
                  <Select.Option value={0}>Disable</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Language" name={`language`}>
                <Select placeholder={`Select language`}>
                  <Select.Option value={`bahasa`}>Bahasa</Select.Option>
                  <Select.Option value={`english`}>English</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Tags"
            name={`tags`}
            extra="Separated by comma, Example: investment,tech,modern"
          >
            <Input placeholder="Enter tags" />
          </Form.Item>

          <Form.Item label="Image Banner" name={`image`}>
            <Upload
              action={`${API_URL}/blogs/upload`}
              headers={{
                Authorization: `Bearer ${user?.token}`,
              }}
              listType="picture-card"
              onChange={handleUpload}
              fileList={[...banner]}
              maxCount={1}
            >
              {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item name={`blog_body`} style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item label="Content">
            <Editor
              onChange={(e, d) => console.log(e.target.value, d)}
              initialValue={blogContent}
              init={{
                height: 500,
                width: '100%',
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                ],
                toolbar:
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>

          <Form.Item>
            <Space size={15}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={loading}
                htmlType={`submit`}
              >
                Submit
              </Button>
              <Button icon={<ReloadOutlined />} onClick={init}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default EditBlog

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
