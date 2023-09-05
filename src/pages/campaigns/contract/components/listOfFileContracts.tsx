import { Button, Modal, Space, Table } from 'antd'

interface Props {
  fileContracts: any
  isOpen: boolean
  closeModal: any
  selectContract: any
}

const ListOfFileContracts = ({
  fileContracts,
  isOpen,
  closeModal,
  selectContract,
}: Props) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Last update',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Generated at',
      dataIndex: 'generate_at',
      key: 'generate_at',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'action',
      width: '100px',
      render: (id: any) => (
        <Button onClick={() => selectContract(id)}>Select</Button>
      ),
    },
  ]

  return (
    <Modal
      title="Select File Contracts"
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      centered
      width={650}
    >
      <Table
        dataSource={fileContracts}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </Modal>
  )
}

export default ListOfFileContracts
