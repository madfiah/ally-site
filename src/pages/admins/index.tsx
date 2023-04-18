import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import FormAdmin from './components/formAdmin'

const Admins = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [admin, setAdmin] = useState({})

  const dataSource = [
    {
      key: '1',
      name: 'Assegaf',
      email: 'assegaf@kapitalboost.co.id',
      role: 'Super Admin',
      created_at: '1/25/2023, 10:13:01',
    },
    {
      key: '2',
      name: 'Ahmad',
      email: 'ahmad@kapitalboost.co.id',
      role: 'Super Admin',
      created_at: '1/25/2023, 10:13:01',
    },
    {
      key: '3',
      name: 'Erly',
      email: 'erly@kapitalboost.co.id',
      role: 'Super Admin',
      created_at: '1/25/2023, 10:13:01',
    },
    {
      key: '4',
      name: 'Naseha',
      email: 'naseha@kapitalboost.co.id',
      role: 'Admin',
      created_at: '1/25/2023, 10:13:01',
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
          <Tooltip title="Edit data admin">
            <Button size="small" onClick={() => onOpenForm('edit', data)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete data admin">
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
    setAdmin(data)
    setIsFormOpen(true)
  }

  return (
    <Card>
      <Space className="space-between mb-1">
        <h3 className="m-0 fw-300">List of Admins</h3>

        <Tooltip title="Add new admin">
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onOpenForm('create', {})}
          ></Button>
        </Tooltip>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />

      <FormAdmin
        isShow={isFormOpen}
        admin={admin}
        action={formAction}
        handleHide={() => setIsFormOpen(false)}
      />
    </Card>
  )
}

export default Admins
