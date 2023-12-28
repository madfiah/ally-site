import { Api } from '@/api/api'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Card,
  message,
  Modal,
  notification,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IProps {
  user: any
}

const Banks = ({ user }: IProps) => {
  const [modal, contextHolder] = Modal.useModal()
  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState<any>(null)

  const init = () => {
    setLoading(true)

    Api.get(`blogs`, user?.token)
      .then((res: any) => {
        setBlogs(res.data)
      })
      .catch((err) => {
        message.error({ content: err.data.message })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    init()
  }, [])

  const confirmDeleteBlog = (data: any) => {
    modal.confirm({
      title: 'Delete Action',
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography.Text>
          {`Are you sure want to delete blog `} <b>{data.title}</b>
        </Typography.Text>
      ),
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        setLoading(true)

        Api.post(`blogs/${data?.id}?_method=delete`, user?.token)
          .then((res: any) => {
            notification.success({ message: res.message })

            setTimeout(() => {
              init()
            }, 500)
          })
          .catch((err) => {
            message.error({ content: err.data.message })
          })
          .finally(() => setLoading(false))
      },
    })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: any) =>
        tags ? (
          <Space size={[0, 8]} wrap>
            {tags.map((item: string, idx: number) => (
              <Tag color={`silver`} key={idx}>
                {item}
              </Tag>
            ))}
          </Space>
        ) : (
          '-'
        ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) =>
        image ? <img alt={`image`} src={image} height={65} /> : '-',
    },
    {
      title: 'Visibility',
      dataIndex: 'is_enable',
      key: 'is_enable',
      render: (is_enable: boolean) => (
        <>{is_enable ? <Tag color={'blue'}>Enable</Tag> : <Tag>Disable</Tag>}</>
      ),
    },
    {
      title: 'Latest update',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Edit data blog">
            <Link href={`/blogs/${data.id}`}>
              <Button size="small">
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Delete data blog">
            <Button size="small" danger onClick={() => confirmDeleteBlog(data)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Blogs</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Space className="space-between mb-1">
          <h3 className="m-0 fw-300">List of Blogs</h3>

          <Tooltip title="Add new blog">
            <Link href={`/blogs/add`}>
              <Button size="small" icon={<PlusOutlined />}>
                Add a New Blog
              </Button>
            </Link>
          </Tooltip>
        </Space>

        <Table
          dataSource={blogs}
          columns={columns}
          className={'mt-1'}
          loading={loading}
        />
      </Card>

      {contextHolder}
    </>
  )
}

export default Banks

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  const user = session?.user

  return {
    props: {
      user: user,
    },
  }
}
