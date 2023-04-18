import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import FormBank from './components/formBank'

const Banks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formAction, setFormAction] = useState('')
  const [bank, setBank] = useState({})

  const dataSource = [
    {
      key: '1',
      bank_code: '',
      bic_code: 'NWBKGB2L',
      iban_code: 'GB25NWBK60062733624135',
      name: 'Natwest',
      currency: 'GBP',
      country: 'United Kingdom',
      status: 0,
    },
    {
      key: '1',
      bank_code: '',
      bic_code: 'NWBKGB2L',
      iban_code: 'GB25NWBK60062733624135',
      name: 'Natwest',
      currency: 'GBP',
      country: 'United Kingdom',
      status: 0,
    },
  ]

  const columns = [
    {
      title: 'Bank Code',
      dataIndex: 'bank_code',
      key: 'bank_code',
    },
    {
      title: 'BIC Code',
      dataIndex: 'bic_code',
      key: 'bic_code',
    },
    {
      title: 'IBAN Code',
      dataIndex: 'iban_code',
      key: 'iban_code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '150px',
      render: (data: any) => (
        <Space size={`small`} className="space-end">
          <Tooltip title="Edit master payout">
            <Button size="small" onClick={() => onOpenForm('edit', data)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete master payout">
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
        <h3 className="m-0 fw-300">List of Banks</h3>

        <Tooltip title="Add withdrawal request">
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onOpenForm('create', {})}
          ></Button>
        </Tooltip>
      </Space>

      <Table dataSource={dataSource} columns={columns} className={'mt-1'} />

      <FormBank
        isShow={isFormOpen}
        bank={bank}
        action={formAction}
        handleHide={() => setIsFormOpen(false)}
      />
    </Card>
  )
}

export default Banks
