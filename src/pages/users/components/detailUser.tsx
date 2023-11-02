import { Button, Divider, Modal, Space, Tabs, Tooltip } from 'antd'
import type { TabsProps } from 'antd'
import UserInformation from './userInformation'
import ResultVeriff from './resultVeriff'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface IProps {
  isModalOpen: boolean
  handleCancel: any
  userSession: any
  userId: number
}

const ModalDetailUser = ({
  isModalOpen,
  handleCancel,
  userSession,
  userId,
}: IProps) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `User Information`,
      children: <UserInformation />,
    },
    {
      key: '2',
      label: `Verif Information`,
      children: <ResultVeriff />,
    },
  ]

  const onChangeTab = (key: string) => {
    console.log(key)
  }

  return (
    <Modal
      title="Detail User : Ahmad Ramli"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <div className="mt-2">
        <Tabs
          tabPosition="right"
          defaultActiveKey="1"
          items={items}
          onChange={onChangeTab}
        />

        <Divider orientation="left" dashed />

        <Space size={10} className="space-between">
          <Space size={10}>
            <Button danger icon={<CloseOutlined />}>
              REJECT
            </Button>
            <Button type="primary" danger icon={<CloseOutlined />}>
              BLACKLIST
            </Button>
          </Space>
          <Tooltip title="Veriff has not been approved">
            <Button
              disabled
              type="primary"
              icon={<CheckOutlined />}
              style={{ width: '200px' }}
            >
              APPROVE
            </Button>
          </Tooltip>
        </Space>
      </div>
    </Modal>
  )
}

export default ModalDetailUser
