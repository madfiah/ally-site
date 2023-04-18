import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Table, Tag, Tooltip } from 'antd'
import { useState } from 'react'

const Banks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [bank, setBank] = useState({})

  const dataSource = [
    {
      key: '1',
      title: 'Which risk profile are you?',
      visibility: 1,
      image:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/blog/aQWDYM8riHtEAII9E8ObAmFiKsoiCvJ3l6qtP2Hj.jpg',
      tags: ['risk', 'murabahah financing'],
      updated_at: '2023-03-01 10:45:18',
      created_at: '2023-03-01 10:45:18',
    },
    {
      key: '2',
      title: 'Which risk profile are you?',
      visibility: 0,
      image:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/blog/aQWDYM8riHtEAII9E8ObAmFiKsoiCvJ3l6qtP2Hj.jpg',
      tags: ['risk', 'murabahah financing'],
      updated_at: '2023-03-01 10:45:18',
      created_at: '2023-03-01 10:45:18',
    },
    {
      key: '3',
      title: 'Which risk profile are you?',
      visibility: 0,
      image:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/blog/aQWDYM8riHtEAII9E8ObAmFiKsoiCvJ3l6qtP2Hj.jpg',
      tags: ['risk', 'murabahah financing'],
      updated_at: '2023-03-01 10:45:18',
      created_at: '2023-03-01 10:45:18',
    },
    {
      key: '4',
      title: 'Which risk profile are you?',
      visibility: 1,
      image:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/blog/aQWDYM8riHtEAII9E8ObAmFiKsoiCvJ3l6qtP2Hj.jpg',
      tags: ['risk', 'murabahah financing'],
      updated_at: '2023-03-01 10:45:18',
      created_at: '2023-03-01 10:45:18',
    },
    {
      key: '2',
      title: 'Which risk profile are you?',
      visibility: 0,
      image:
        'https://kapitalboost.sgp1.cdn.digitaloceanspaces.com/blog/aQWDYM8riHtEAII9E8ObAmFiKsoiCvJ3l6qtP2Hj.jpg',
      tags: ['risk', 'murabahah financing'],
      updated_at: '2023-03-01 10:45:18',
      created_at: '2023-03-01 10:45:18',
    },
  ]

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
      render: (tags: any) => (
        <Space size={[0, 8]} wrap>
          {tags.map((item: string, idx: number) => (
            <Tag color={`cyan`} key={idx}>
              {item}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img alt={`image`} src={image} height={65} />,
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
      render: (visibility: boolean) => (
        <>
          {visibility ? <Tag color={'green'}>Visible</Tag> : <Tag>Disable</Tag>}
        </>
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
            <Button size="small" onClick={() => onOpenForm('edit', data)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete data blog">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const onOpenForm = (action: string, data: any) => {
    setFormAction(action)
    setBank(data)
    setIsFormOpen(true)
  }

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">List of Blogs</h3>

        <Tooltip title="Add new blog">
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onOpenForm('create', {})}
          ></Button>
        </Tooltip>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />
    </Card>
  )
}

export default Banks
